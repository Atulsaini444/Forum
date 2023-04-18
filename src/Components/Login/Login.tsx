import React from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useFormik } from "formik";
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async(values) => {
      console.log("login==>",values)
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
            <Button type='submit'>Login</Button>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Login