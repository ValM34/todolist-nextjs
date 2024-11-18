"use client";

import Link from "next/link";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {createUser} from "@/infrastructure/repositories";
import { registerSchema } from "@/validators";
import { useFormik } from 'formik';

export default function SignUp() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: async (values: Pick<User, 'email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName'>) => handleCreateUser(values),
    validationSchema: registerSchema,
  })

  async function handleCreateUser(values: Pick<User, 'email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName'>) {
    try {
      await createUser(values);
        return router.push('/sign-in');
    } catch (error) {
      console.error('An error occurred while creating user:', error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inscription
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="firstName"
                  className={`${formik.errors.firstName ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.firstName}
                  </p>
                ) : ""}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="lastName"
                  className={`${formik.errors.lastName ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastName ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.lastName}
                  </p>
                ) : ""}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${formik.errors.email ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={`${formik.errors.password ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.password}
                  </p>
                ) : ""}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="passwordConfirmation" className="block text-sm font-medium leading-6 text-gray-900">
                  Mot de passe (confirmation)
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  required
                  className={`${formik.errors.confirmPassword ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.confirmPassword}
                  </p>
                ) : ""}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Inscription
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Déjà inscrit?{' '}
            <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}