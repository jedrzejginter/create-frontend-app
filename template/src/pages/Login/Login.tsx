import { useFormik } from 'formik';

export default function Login() {
  const { handleChange, handleSubmit, values } = useFormik({
    onSubmit: () => {},
    initialValues: {
      email: '',
      password: '',
    }
  });

  return <form onSubmit={handleSubmit}>
    <input type="text" name="email" onChange={handleChange} value={values.email} />
    <input type="password" name="password" onChange={handleChange} value={values.password} />
    <button type="submit">Log in</button>
  </form>;
}
