import * as Yup from 'yup';


export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'minimum 3 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});