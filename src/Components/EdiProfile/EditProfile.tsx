import { Box, Button, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from "formik";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../services/auth-service';
import { SignupSchema } from '../../utils/SignUpSchema';
import { useAppStore, userData } from '../../zustand/store';

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<userData>()
  const token = useAppStore((state: any) => state.token)
  const toast = useToast()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      bio: currentUser?.bio || '',
      password: '',
      image: currentUser ? currentUser?.image : ''
    }
    ,
    enableReinitialize: true,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      editProfile({ user: values }).then(() => {
        setIsLoading(false)
        toast({
          title: 'user updated successfully',
          status: 'success',
          position: 'top-right',
          duration: 6000,
          isClosable: true,
        })
        navigate('/')
      })
        .catch((error) => {
          setIsLoading(false)
          toast({
            title: `${error}`,
            position: 'top-right',
            status: 'error',
            duration: 6000,
            isClosable: true,
          })

        })
    },
  })

  useEffect(() => {
    if (currentUser) {
      formik.setValues({
        username: currentUser?.username,
        email: currentUser?.email,
        bio: currentUser.bio!,
        password: '',
        image: currentUser?.image
      });
    }
  }, [currentUser]);

  const getCurrentUser = async () => {
    const res = await axios.get(`https://api.realworld.io/api/user`)
    setCurrentUser(res.data.user)
  }

  useEffect(() => {
    if (token) getCurrentUser()
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
            {/* {formik?.errors?.username && <Text color="red">{formik.errors.username}</Text>} */}
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
            {formik?.errors?.password && <Text color="red">{formik.errors.password}</Text>}
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' backgroundColor="purple.600" color="white" type='submit' margin="20px 0">Submit</Button>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default EditProfile