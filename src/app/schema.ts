import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(20).required("First Name is required"),
  lastName: Yup.string().max(20),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  comment: Yup.string().max(150).required("Comment is required"),
});