import * as Yup from 'yup';

export const ArticleSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  body: Yup.string().required('Body is required')
});