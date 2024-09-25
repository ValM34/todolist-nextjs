"use client";

import { useState, useEffect, useRef } from "react";
import { updateProject } from "@/services/projects";
import { useRouter, useParams } from "next/navigation";
import { fetchProjectById } from "@/services/projects";
import Link from "next/link";
import { ProjectValidationForm } from "@/utils/form-validation/project";
import LoadingSpinner from "@/components/animations/loading-spinner";

export default function Projects() {
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const textAreaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [formErrorsState, setFormErrorsState] = useState({
    title: null as string | null,
    description: null as string | null,
  });
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    user: "",
  });
  const [loading, setLoading] = useState(true);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || Array.isArray(id)) return;
    const projectToUpdate = {
      _id: id,
      title: inputTitleRef.current?.value,
      description: textAreaDescriptionRef.current?.value,
    };

    const validateForm = new ProjectValidationForm();
    const verifyForm = validateForm.verifyUpdateProjectForm(projectToUpdate);
    if (!verifyForm.success) {
      setFormErrorsState(verifyForm.errorList);
      return;
    }

    await updateProject(verifyForm.projectVerified);
    router.push("/projects");
  };

  useEffect(() => {
    (async () => {
      if (!id || Array.isArray(id)) return;
      let data = await fetchProjectById(id);
      setProject(data[0]);
      setLoading(false);
    })();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {project?.title ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-center">
                Modifier le projet
              </h1>
              <form className="w-80 mx-auto border border-gray-300 p-4 rounded-xl">
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Titre
                  </label>
                  <input
                    className={`${
                      formErrorsState.title
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-gray-300 focus:ring-indigo-600"
                    } mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="title"
                    name="title"
                    required={true}
                    type="text"
                    ref={inputTitleRef}
                    defaultValue={project.title}
                  />
                  {formErrorsState.title ? (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrorsState.title}
                    </p>
                  ) : (
                    ""
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
                      formErrorsState.description
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-gray-300 focus:ring-indigo-600"
                    } resize-none h-32 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="description"
                    name="description"
                    required={true}
                    ref={textAreaDescriptionRef}
                    defaultValue={project.description}
                  ></textarea>
                  {formErrorsState.description ? (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrorsState.description}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                    onClick={handleUpdateProject}
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <div className="">
                Il semble qu&apos;aucun projet ne corresponde à votre recherche.
              </div>
              <Link
                href="/projects"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Cliquez ici pour retourner sur la liste des projets.
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
