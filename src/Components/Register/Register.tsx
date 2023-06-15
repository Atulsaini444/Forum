import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useFormik } from "formik";
import './register.scss'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth-service';
import { SignupSchema } from '../../utils/SignUpSchema';
import { createStandaloneToast } from '@chakra-ui/react'
import { getToast } from '../../utils/getToast';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = createStandaloneToast()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      register({ user: values }).then(() => {
        setIsLoading(false)
        toast(getToast("Account created successfully","success"))
        navigate('/login')
      })
        .catch((error) => {
          setIsLoading(false)
          toast(getToast(error,"error"))
        })
    },
  })


  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
        <Text fontSize="2xl" fontWeight="700" color='purple.400' textAlign="center">Register</Text>
          <form onSubmit={formik.handleSubmit}>
            <Text marginTop="2">Username</Text>
            <Input
              id='username'
              name='username'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.username} />
            {formik?.errors?.username && <Text color="red">{formik.errors.username}</Text>}
            <Text marginTop="2">Email</Text>
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
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' backgroundColor="purple.600" color="white" type='submit' margin="20px 0">Submit</Button>
            <Text>
              Already have any account? <Link to="/login">Log in</Link>
            </Text>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Register