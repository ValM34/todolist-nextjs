"use client";

import Link from "next/link";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from "@/validators";
import {createUser} from "@/infrastructure/repositories";

export default function SignUp() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [formErrorsState, setFormErrorsState] = useState({
    firstName: null as string | null,
    lastName: null as string | null,
    email: null as string | null,
    password: null as string | null,
    confirmPassword: null as string | null,
  });

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
    }
    const {confirmPassword, ...user} = registerSchema.parse(data);
    try {
      await createUser(user);
      console.log('User created successfully');
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
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  ref={firstNameRef}
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="firstName"
                  className={`${formErrorsState.firstName ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {formErrorsState.firstName ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formErrorsState.firstName}
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
                  ref={lastNameRef}
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="lastName"
                  className={`${formErrorsState.lastName ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {formErrorsState.lastName ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formErrorsState.lastName}
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
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${formErrorsState.email ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {formErrorsState.email ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formErrorsState.email}
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
                  className={`${formErrorsState.password ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {formErrorsState.password ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formErrorsState.password}
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
                  ref={confirmPasswordRef}
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  required
                  className={`${formErrorsState.confirmPassword ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {formErrorsState.confirmPassword ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formErrorsState.confirmPassword}
                  </p>
                ) : ""}
              </div>
            </div>

            <div>
              <button
                onClick={handleCreateUser}
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