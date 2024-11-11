"use client";

import Link from "next/link";
import { useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { authUser } from "@/infrastructure/repositories";
import { loginSchema } from "@/validators";
import { useFormik } from 'formik';

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [formErrorsState, setFormErrorsState] = useState({
    email: null as string | null,
    password: null as string | null,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: Pick<User, 'email' | 'password'>) => handleSignIn(values),
    validationSchema: loginSchema,
  })

  async function handleSignIn(values: Pick<User, 'email' | 'password'>) {
    try {
      await authUser(values);
      return router.push('/');
    } catch (e) {
        console.error('An error occurred while authenticating user:', e);
        setFormErrorsState({email: 'Invalid credentials', password: 'Invalid credentials'});
    }
  }

  const formIsValid = useMemo(() => {
    return formik.isValid && !formik.isSubmitting;
  }, [formik.isSubmitting, formik.isValid]);
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connexion
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse Email
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`${formik.errors.email ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              ) : ""}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={`${formik.errors.password ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              ) : ""}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connexion
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Pas de compte?{' '}
          <Link href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  )
}
