import * as Yup from 'yup';

export const CommentSchema = Yup.object().shape({
  body: Yup.string().required('Comment should not be empty'),
});