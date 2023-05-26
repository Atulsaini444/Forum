import { Box, Button, FormErrorMessage, Input, Text, useToast } from '@chakra-ui/react'
import { useFormik } from "formik";
import './register.scss'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth-service';
import { SignupSchema } from '../../utils/SignUpSchema';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
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
          console.log("inside main catch:", error)

        })
    },
  })

  console.log(formik)

  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
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

export default Register