import emailValidator from "email-validator";
import { FormikErrors, useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";

import FormError from "@/components/FormError";
import { logIn } from "@/services/auth";

import type { FormValues } from "./types";

function validate(values: FormValues): FormikErrors<FormValues> {
  const errors: FormikErrors<FormValues> = {};

  if (!emailValidator.validate(values.email)) {
    errors.email = "Invalid e-mail address.";
  }

  if (values.password.trim().length === 0) {
    errors.password = "Password is required.";
  }

  return errors;
}

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (values: FormValues) => {
    setError(null);

    try {
      await logIn(values);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = useFormik<FormValues>(
    {
      onSubmit,
      validate,
      validateOnMount: true,
      initialValues: {
        email: "",
        password: "",
      },
    },
  );

  return (
    <>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Link href="/" passHref>
        <a>&larr; Back to home page</a>
      </Link>
      <h1>Log in</h1>
      {error && <FormError>{error}</FormError>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail address</label>
          <input
            type="text"
            id="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          {touched.email && errors.email && <FormError>{errors.email}</FormError>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
          {touched.password && errors.password && <FormError>{errors.password}</FormError>}
        </div>
        <button type="submit">Log in</button>
      </form>
      <Link href="/forgot-password" passHref>
        <a>Forgot password?</a>
      </Link>
    </>
  );
}
