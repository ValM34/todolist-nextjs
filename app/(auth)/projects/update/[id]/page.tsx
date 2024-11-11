'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getOneProjectById, updateProject } from '@/infrastructure/repositories/project-repository'
import Link from 'next/link'
import LoadingSpinner from '@/components/animations/loading-spinner'
import { useFormik } from 'formik'
import { updateProjectSchema } from '@/validators'

export default function Projects() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const { id } = params as { id: string }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values: Pick<Project, 'title' | 'description'>) => handleUpdateProject(values),
    validationSchema: updateProjectSchema,
  })

  const handleUpdateProject = async (values: Pick<Project, 'title' | 'description'>) => {
    try {
      await updateProject({ ...values, id });
      router.push('/projects');
    } catch (e) {
      console.error(e);
    }
    // await updateProject(verifyForm.projectVerified);
  }

  const fetchProject = async () => {
    try {
      const targetProject = await getOneProjectById(id);
      if (!targetProject) throw new Error('An error occurred while finding project...');
      await formik.setValues({
        title: targetProject.title,
        description: targetProject.description,
      });
    } catch (e) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProject();
  }, []);

  const formIsValid = useMemo(() => {
    return formik.isValid && !formik.isSubmitting;
  }, [formik.isSubmitting, formik.isValid]);

  // const formIsValid = formik.isValid && !formik.isSubmitting; @TODO Question : est ce que cela fait la même chose que le useMemo ?


  if (isError) {
    return (
      <div>
        Il semble qu&apos;aucun projet ne corresponde à votre recherche.
        <Link
          href="/projects"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Cliquez ici pour retourner sur la liste des projets.
        </Link>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Modifier le projet
          </h1>
          <form className="w-80 mx-auto border border-gray-300 p-4 rounded-xl" onSubmit={formik.handleSubmit}>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.errors.title ? (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.title}
                </p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
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
                disabled={!formIsValid}
              >
                Ajouter
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}
