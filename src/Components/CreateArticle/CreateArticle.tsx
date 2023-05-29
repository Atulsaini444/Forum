import { Box, Button, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from "formik";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArticleSchema } from '../../utils/ArticleSchema';

const CreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      body:'',
      tagList: ['hello'],
    },
    validationSchema: ArticleSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      createNewArticle({ article: values }).then(() => {
        setIsLoading(false)
        toast({
          title: 'Article created successfully',
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

  const createNewArticle = async (data:any) => {
      const res = await axios.get(`https://api.realworld.io/api/articles`,data)
      console.log(res)
  }




  return (
    <div>
      <Box>
        <Box className='registerFormWrapper'>
          <Text fontSize="2xl" fontWeight="700" color='blue.600' textAlign="center">Create Article</Text>
          <form onSubmit={formik.handleSubmit}>
            <Text marginTop="2">Article Title</Text>
            <Input
              id='title'
              name='title'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.title} />
            {formik?.errors?.title && <Text color="red">{formik.errors.title}</Text>}
            <Text marginTop="2">Description</Text>
            <Input
              id='description'
              name='description'
              placeholder= "what's this article about"
              type='text'
              onChange={formik.handleChange}
              value={formik.values.description} />
            {formik?.errors?.description && <Text color="red">{formik?.errors?.description}</Text>}
            <Text marginTop="2">Body</Text>
            <Textarea 
            placeholder='Here is a sample placeholder' 
            name="body" 
            onChange={formik.handleChange} 
            value={formik.values.body}
            />
            {formik?.errors?.body && <Text color="red">{formik?.errors?.body}</Text>}
            <Button isLoading={isLoading} loadingText="Loading" spinnerPlacement='end' colorScheme="messenger" type='submit' margin="20px 0">Create Article</Button>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default CreateArticle