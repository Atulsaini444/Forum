import React from 'react'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useFormik } from "formik";
import { login } from '../../services/auth-service';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../zustand/store';
const Login = () => {
  const navigate = useNavigate();
  const userData = useAppStore((state: any) => state.userData)
  const setUser = useAppStore((state: any) => state.setUser)
  const setToken = useAppStore((state: any) => state.setToken)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      login({ user: values }).then((response) => {
        setUser(response?.data?.user)
        setToken(response?.data?.user?.token)
        localStorage.setItem("token", response?.data?.user?.token)
        navigate('/dashboard')
      })
        .catch((error) => {
          console.log("inside main catch:", error)

        })
    },
  })
  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
          <form onSubmit={formik.handleSubmit}>
            <div>Email</div>
            <Input
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email} />
            <div>Password</div>
            <Input
              id='password'
              name='password'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password} />
            <Button type='submit' marginTop="20px">Login</Button>
            <Text >
              Don&apos;t have any account? <Link to="/signup">Sign Up</Link>
            </Text>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Login