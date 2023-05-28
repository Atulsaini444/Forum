import React, {useState} from 'react'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useFormik } from "formik";
import { login } from '../../services/auth-service';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../zustand/store';
import { useToast } from '@chakra-ui/react'
import { LoginSchema } from '../../utils/LoginSchema';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const toast = useToast();
  const setUser = useAppStore((state: any) => state.setUser)
  const setToken = useAppStore((state: any) => state.setToken)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      login({ user: values }).then((response) => {
        setIsLoading(false)
        setUser(response?.data?.user)
        setToken(response?.data?.user?.token)
        localStorage.setItem("token", response?.data?.user?.token)
        toast({
          title: 'Logged in successfully',
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
  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
          <form onSubmit={formik.handleSubmit}>
          <Text>Email</Text>
            <Input
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email} />
               {formik?.errors?.email && <Text color="red">{formik.errors.email}</Text>}
               <Text marginTop="2">Password</Text>
            <Input
              id='password'
              name='password'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password} />
               {formik?.errors?.password && <Text color="red">{formik.errors.password}</Text>}
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' colorScheme="messenger" type='submit' margin="20px 0">Login</Button>
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