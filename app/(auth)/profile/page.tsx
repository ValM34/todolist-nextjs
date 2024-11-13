"use client";

import { useState, useMemo, useEffect } from "react";
import { update } from "@/infrastructure/repositories/user-repository";
import { getUserByEmail } from "@/infrastructure/repositories/user-repository";
import { useFormik } from "formik";
import { updateUserSchema } from "@/validators";

export default function Profil() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async (values : Pick<User, 'firstName' | 'lastName'>) =>
      handleUpdateUser(values),
    validationSchema: updateUserSchema,
  })
  
  const handleUpdateUser = async (values : Pick<User, 'firstName' | 'lastName'>) => {
    try {
      await update(values);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserByEmail();
        if(!data || !data.firstName || !data.lastName) throw new Error('An error occurred while finding user...');
        await formik.setValues({
          firstName: data.firstName,
          lastName: data.lastName,
        });
      } catch(e) {
        console.error(e);
      }
    }
    loadUser();
  }, []);

  const formIsValid = useMemo(() => {
    return formik.isValid && !formik.isSubmitting;
  }, [formik.isSubmitting, formik.isValid]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Modifier le profil</h1>
      <form onSubmit={formik.handleSubmit} className="w-60 mx-auto border-2 border-gray-300 p-4 rounded-xl">
        <h2 className="font-semibold text-xl mb-4">Profil</h2>
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Prénom
          </label>
          <input
            className={`${formik.errors.firstName ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.errors.firstName ? (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.firstName}
            </p>
          ) : ""}
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nom
          </label>
          <input
            className={`${formik.errors.lastName ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.lastName}
            </p>
          ) : ""}
        </div>

        <div className="flex justify-center">
          <button
            className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Ajouter
          </button>
        </div>
      </form>
    </>
  );
}