"use client";

import { useState, useRef, useEffect } from "react";
import { createTask } from "@/services/tasks";
import { fetchProjectsByUser } from "@/services/projects";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getJwt } from "@/utils/jwt";
import { TaskValidationForm } from "@/utils/form-validation/task";
import LoadingSpinner from "@/components/animations/loading-spinner";

export default function TaskForm() {
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const textAreaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const selectCompletedRef = useRef<HTMLSelectElement>(null);
  const selectEmergencyRef = useRef<HTMLSelectElement>(null);
  const selectImportanceRef = useRef<HTMLSelectElement>(null);
  const selectProjectRef = useRef<HTMLSelectElement>(null);
  const [projects, setProjects] = useState<Projects | null>(null);
  const [formErrorsState, setFormErrorsState] = useState({
    title: null as string | null,
    description: null as string | null,
  });
  const [loading, setLoading] = useState(true);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    let token = getJwt();
    if (!token) return;

    const newTask = {
      title: inputTitleRef.current?.value,
      completed: selectCompletedRef.current?.value,
      emergency: selectEmergencyRef.current?.value,
      importance: selectImportanceRef.current?.value,
      description: textAreaDescriptionRef.current?.value,
      project: selectProjectRef.current?.value,
    };

    const validateForm = new TaskValidationForm();
    const verifyForm = validateForm.verifyCreateTaskForm(newTask);
    if (!verifyForm.success) {
      setFormErrorsState(verifyForm.errorList);
      return;
    }

    await createTask(verifyForm.taskVerified);
    router.push("/");
  };

  useEffect(() => {
    (async () => {
      const projectsList = await fetchProjectsByUser();
      if (projectsList && projectsList.length > 0 && projects === null) {
        setProjects(projectsList);
      }
      setLoading(false);
    })();
  });

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {projects ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-center">
                Ajouter une tâche
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
                    ref={inputTitleRef}
                    className={`${
                      formErrorsState.title
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-gray-300 focus:ring-indigo-600"
                    } mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="title"
                    name="title"
                    required={true}
                    type="text"
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
                    ref={textAreaDescriptionRef}
                    className={`${
                      formErrorsState.description
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-gray-300 focus:ring-indigo-600"
                    } resize-none h-32 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="description"
                    name="description"
                    required={true}
                  ></textarea>
                  {formErrorsState.description ? (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrorsState.description}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="completed"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Statut
                  </label>
                  <select
                    ref={selectCompletedRef}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="completed"
                    name="completed"
                    required={true}
                  >
                    <option value="A faire">A faire</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                  </select>
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="emergency"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Urgence
                  </label>
                  <select
                    ref={selectEmergencyRef}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="emergency"
                    name="emergency"
                    required={true}
                  >
                    <option value="Forte">Forte</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Faible">Faible</option>
                  </select>
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="importance"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Importance
                  </label>
                  <select
                    ref={selectImportanceRef}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="importance"
                    name="importance"
                    required={true}
                  >
                    <option value="Forte">Forte</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Faible">Faible</option>
                  </select>
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Projet
                  </label>
                  <select
                    ref={selectProjectRef}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="project"
                    name="project"
                    required={true}
                  >
                    {Array.isArray(projects) &&
                      projects.map((project: Project) => (
                        <option key={project._id} value={project._id}>
                          {project.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex justify-center">
                  <button
                    className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                    onClick={handleAddTodo}
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <div className="">
                Chaque tâche est liée à un projet. Vous n&apos;avez pas encore
                créé de projet. Il vous faut créer un projet pour pouvoir
                ajouter des tâches.
              </div>
              <Link
                href="/projects/new"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Cliquez ici pour ajouter un nouveau projet.
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}