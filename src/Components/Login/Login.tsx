import React, {useState} from 'react'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useFormik } from "formik";
import { login } from '../../services/auth-service';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../zustand/store';
import { LoginSchema } from '../../utils/LoginSchema';
import { createStandaloneToast } from '@chakra-ui/react'
import { getToast } from '../../utils/getToast';
import { AppState } from '../../utils/Interfaces';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const { toast } = createStandaloneToast()
  const [setUser, setToken] = useAppStore((state: AppState) => [state.setUser,state.setToken])

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
        toast(getToast("Logged in successfully","success"))
        navigate('/')
      })
        .catch((error) => {
          setIsLoading(false)
          toast(getToast("email or password is incorrect","error"))
        })
    },
  })
  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
        <Text fontSize="2xl" fontWeight="700" color='purple.400' textAlign="center">Login</Text>
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
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' backgroundColor="purple.600" color="white" type='submit' margin="20px 0">Login</Button>
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