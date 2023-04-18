import { Box, Button, Input } from '@chakra-ui/react'
import { useFormik } from "formik";
import './register.scss'
import React from 'react'
import { useAppStore } from '../../zustand/store';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const registerUser = useAppStore((state:any) => state.registerUser)
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      registerUser({user: values})
      .then(() => {
        console.log("inside main then")
      })
      .catch((error:any) => {
        console.log("inside main catch:", error)
      });
    },
  })

  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
          <form onSubmit={formik.handleSubmit}>
            <div>Username</div>
            <Input
              id='username'
              name='username'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.username} />
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
            <Button type='submit'>Submit</Button>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Register