import { Box, Button, Input, Text, Textarea } from '@chakra-ui/react'
import { useFormik } from "formik";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { editProfile, getCurrentUser } from '../../services/auth-service';
import { SignupSchema } from '../../utils/SignUpSchema';
import { useAppStore } from '../../zustand/store';
import { createStandaloneToast } from '@chakra-ui/react'
import { getToast } from '../../utils/getToast';
import { AppState, FormikType, UserData } from '../../utils/Interfaces';

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<UserData>()
  const token = useAppStore((state: AppState) => state.token)
  const { toast } = createStandaloneToast()
  const navigate = useNavigate();

  const formik = useFormik<any>({
    initialValues: {
      username: '',
      email: '',
      bio: '',
      password: '',
      image: ''
    }
    ,
    enableReinitialize: true,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      editProfile({ user: values }).then(() => {
        setIsLoading(false)
        toast(getToast("user updated successfully","success"))
        navigate('/')
      })
        .catch((error) => {
          setIsLoading(false)
          toast(getToast(error,"error"))

        })
    },
  })

  useEffect(() => {
    if (currentUser) {
      formik.setValues({
        username: currentUser.username,
        email: currentUser.email,
        bio: currentUser.bio,
        password: '',
        image: currentUser?.image
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (token) getCurrentUser().then((res: UserData)=> {
      setCurrentUser(res)
    })
  }, [token])

  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
          <Text fontSize="2xl" fontWeight="700" color='purple.400' textAlign="center">Edit Profile</Text>
          <form onSubmit={formik.handleSubmit}>
            <Text marginTop="2">Username</Text>
            <Input
              id='username'
              name='username'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.username} />
            {/* {formik?.errors?.username && <Text color="red">{formik?.errors?.username}</Text>} */}
            <Text marginTop="2">Email</Text>
            <Input
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email} />
            {/* {formik?.errors?.email && <Text color="red">{formik?.errors?.email}</Text>} */}
            <Text marginTop="2">Bio</Text>
            <Textarea
              placeholder='Here is a sample placeholder'
              name="bio"
              onChange={formik.handleChange}
              value={formik.values.bio}
            />
            <Text marginTop="2">Password</Text>
            <Input
              id='password'
              name='password'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password} />
            {/* {formik?.errors?.password && <Text color="red">{formik.errors.password}</Text>} */}
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' backgroundColor="purple.600" color="white" type='submit' margin="20px 0">Submit</Button>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default EditProfile