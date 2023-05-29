import { Box, Button, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from "formik";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { editProfile } from '../../services/auth-service';
import { SignupSchema } from '../../utils/SignUpSchema';
import { useAppStore, userData } from '../../zustand/store';

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const token = useAppStore((state: any) => state.token)
  const [user, setUser] = useState<userData>();
  const toast = useToast()
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      username: user? user?.username : '',
      email: user? user?.email : '',
      bio:user? user?.bio : '',
      password: '',
      image:user? user?.image : ''
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      editProfile({ user: values }).then(() => {
        setIsLoading(false)
        toast({
          title: 'Account created successfully',
          status: 'success',
          position: 'top-right',
          duration: 6000,
          isClosable: true,
        })
        navigate('/login')
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

  const getCurrentUser = async () => {
    console.log(token)

      const res = await axios.get(`https://api.realworld.io/api/user`)
      console.log(res)

  }

  useEffect(()=>{
    getCurrentUser()
  },[])



  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
        <Text fontSize="2xl" fontWeight="700" color='blue.600' textAlign="center">Edit Profile</Text>
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
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' colorScheme="messenger" type='submit' margin="20px 0">Submit</Button>
            <Text>
              Already have any account? <Link to="/login">Log in</Link>
            </Text>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default EditProfile