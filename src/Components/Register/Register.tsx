import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useFormik } from "formik";
import './register.scss'
import React from 'react'
import { useAppStore } from '../../zustand/store';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth-service';
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
        register({user:values}).then(()=> {
            navigate('/login')
        })
        .catch((error)=> {
          console.log("inside main catch:", error)

      })
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
            <Button type='submit' marginTop="20px">Submit</Button>
            <Text >
              Already have any account? <Link to="/login">Log in</Link>
            </Text>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Register