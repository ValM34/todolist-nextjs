'use client'

import { useRef, useState } from 'react'
import { createProject } from '@/infrastructure/repositories/project-repository'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { addProjectSchema } from '@/validators'

export default function Projects() {
  const inputTitleRef = useRef<HTMLInputElement>(null)
  const textAreaDescriptionRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values: Pick<Project, 'title' | 'description'>) =>
      handleAddProject(values),
    validationSchema: addProjectSchema,
  })

  const handleAddProject = async (
    values: Pick<Project, 'title' | 'description'>
  ) => {
    try {
      await createProject(values)
      router.push('/projects')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Ajouter un projet</h1>
      <form
        className="w-80 mx-auto border border-gray-300 p-4 rounded-xl"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-semibold text-xl mb-4">Ajouter un projet</h2>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Titre
          </label>
          <input
            className={`${
              formik.errors.title
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-gray-300 focus:ring-indigo-600'
            } mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            id="title"
            name="title"
            type="text"
            ref={inputTitleRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // value={formik.values.title}
          />
          {formik.errors.title ? (
            <p className="mt-2 text-sm text-red-600">{formik.errors.title}</p>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <textarea
            className={`${
              formik.errors.description
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-gray-300 focus:ring-indigo-600'
            } resize-none h-32 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            id="description"
            name="description"
            ref={textAreaDescriptionRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // value={formik.values.description}
          ></textarea>
          {formik.errors.description ? (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.description}
            </p>
          ) : (
            ''
          )}
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
  )
}
