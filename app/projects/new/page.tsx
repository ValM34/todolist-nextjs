"use client"
;
import { useRef, useState } from 'react';
import { createProject } from '@/services/projects';
import { useRouter } from 'next/navigation';
import { ProjectValidationForm } from "@/utils/form-validation/project";

export default function Projects() {
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const textAreaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [formErrorsState, setFormErrorsState] = useState({
    title: null as string | null,
    description: null as string | null,
  })

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectToUpdate = {
      title: inputTitleRef.current?.value,
      description: textAreaDescriptionRef.current?.value
    }

    const validateForm = new ProjectValidationForm();
    const verifyForm = validateForm.verifyCreateProjectForm(projectToUpdate);
    if(!verifyForm.success) {
      setFormErrorsState(verifyForm.errorList);
      return;
    }

    await createProject(verifyForm.projectVerified);
    router.push('/projects');
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Ajouter un projet</h1>
      <form className="w-80 mx-auto border border-gray-300 p-4 rounded-xl">
        <h2 className="font-semibold text-xl mb-4">Ajouter un projet</h2>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Titre
          </label>
          <input
            className={`${formErrorsState.title ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            id="title"
            name="title"
            required={true}
            type="text"
            ref={inputTitleRef}
          />
          {formErrorsState.title ? (
            <p className="mt-2 text-sm text-red-600">
              {formErrorsState.title}
            </p>
          ) : ""}
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <textarea
            className={`${formErrorsState.description ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} resize-none h-32 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            id="description"
            name="description"
            required={true}
            ref={textAreaDescriptionRef}
          ></textarea>
          {formErrorsState.description ? (
            <p className="mt-2 text-sm text-red-600">
              {formErrorsState.description}
            </p>
          ) : ""}
        </div>

        <div className="flex justify-center">
          <button
            className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            onClick={handleAddProject}
          >
            Ajouter
          </button>
        </div>
      </form>
    </>
  );
}
