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
    <div>
      <label htmlFor="email">E-mail address</label>
      <input type="text" id="email" name="email" onChange={handleChange} value={values.email} />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" onChange={handleChange} value={values.password} />
    </div>
    <button type="submit">Log in</button>
  </form>;
}
