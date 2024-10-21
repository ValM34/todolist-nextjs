"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/animations/loading-spinner';
import { getAllProjectsByOwnerId } from '@/infrastructure/repositories/project-repository';
import { getOneTaskById, update, deleteTask } from '@/infrastructure/repositories/task-repository';

export default function TaskFormUpdate() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const textAreaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const selectStatusRef = useRef<HTMLSelectElement>(null);
  const selectEmergencyRef = useRef<HTMLSelectElement>(null);
  const selectImportanceRef = useRef<HTMLSelectElement>(null);
  const selectProjectIdRef = useRef<HTMLSelectElement>(null);
  const [projects, setProjects] = useState<Projects | null>(null);
  const [formErrorsState, setFormErrorsState] = useState({
    title: null as string | null,
    description: null as string | null,
  })
 
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!id || Array.isArray(id)) return;
    const taskUpdated = {
      id: id,
      title: inputTitleRef.current?.value as string,
      status: selectStatusRef.current?.value as string,
      emergency: selectEmergencyRef.current?.value as Emergency,
      importance: selectImportanceRef.current?.value as Importance,
      description: textAreaDescriptionRef.current?.value as string | null,
      projectId: selectProjectIdRef.current?.value as string,
    }

    // const validateForm = new TaskValidationForm();
    // const verifyForm = validateForm.verifyUpdateTaskForm(taskUpdated);
    // if(!verifyForm.success) {
    //   setFormErrorsState(verifyForm.errorList);
    //   return;
    // }

    try {
      await update(taskUpdated);
    } catch(e) {
      console.error(e);
    }
    router.push("/");
  };

  const handleDeleteTask = async () => {
    if (!id || Array.isArray(id)) return;
    try {
      await deleteTask(id);
    } catch(e) {
      console.error(e);
    }
    router.push("/");
  }

  useEffect(() => {
    (async () => {
      try {
        const projectsList = await getAllProjectsByOwnerId();
        if(!projectsList || projectsList.length === 0 || projects) return;
        setProjects(projectsList);
      } catch(e) {
        console.error(e);
      }
    })();
    
    (async () => {
      if (!id || Array.isArray(id)) return;
      try {
        const data = await getOneTaskById(id);
        if(!data) throw new Error('Task not found');
        setTask(data);
      } catch(e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, [id, projects]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {task?.title && task?.status && task?.emergency && task?.importance && task?.projectId && projects ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-center">Modifier une tâche</h1>
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
                    className={`${formErrorsState.title ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="title"
                    name="title"
                    required={true}
                    type="text"
                    defaultValue={task.title}
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
                    ref={textAreaDescriptionRef}
                    className={`${formErrorsState.description ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} resize-none h-32 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="description"
                    name="description"
                    required={true}
                    defaultValue={task.description ? task.description : ""}
                  ></textarea>
                  {formErrorsState.description ? (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrorsState.description}
                    </p>
                  ) : ""}
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Statut
                  </label>
                  <select
                    ref={selectStatusRef}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="status"
                    name="status"
                    required={true}
                    defaultValue={task.status}
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
                    defaultValue={task.emergency}
                  >
                    <option value="HIGHT">HIGHT</option>
                    <option value="AVERAGE">AVERAGE</option>
                    <option value="LOW">LOW</option>
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
                    defaultValue={task.importance}
                  >
                    <option value="HIGHT">HIGHT</option>
                    <option value="AVERAGE">AVERAGE</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="projectId"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Projet
                  </label>
                  <select
                    ref={selectProjectIdRef}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="projectId"
                    name="projectId"
                    required={true}
                    defaultValue={task.projectId}
                  >
                    {Array.isArray(projects) &&
                      projects.map((project: Project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                  </select>
                </div>
    
                <div className="flex justify-center">
                  <button
                    className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                    onClick={handleUpdateTask}
                  >
                    Modifier
                  </button>
                </div>
              </form>
              <div className="flex justify-center">
                <button 
                  className="mt-4 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={handleDeleteTask}
                >
                  Supprimer la tâche
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="">
                Il semble qu&apos;aucune tâche ne corresponde à votre recherche.
              </div>
              <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cliquez ici pour retourner sur la liste des tâches.</Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
