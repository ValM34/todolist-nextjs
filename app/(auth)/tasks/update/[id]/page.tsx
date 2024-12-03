"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import LoadingSpinner from '@/components/animations/loading-spinner';
import { findProjectsBy } from '@/infrastructure/repositories/project-repository';
import { findOneTaskById, updateTask, deleteTask } from '@/infrastructure/repositories/task-repository';
import { getUser } from '@/utils/auth';
import { useFormik } from 'formik'
import { updateTaskSchema } from "@/validators";

enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

enum Emergency {
  HIGHT = "HIGHT",
  AVERAGE = "AVERAGE",
  LOW = "LOW",
}

enum Importance {
  HIGHT = "HIGHT",
  AVERAGE = "AVERAGE",
  LOW = "LOW",
}

export default function TaskFormUpdate() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Projects | null>(null);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      id,
      title: '',
      description: '',
      status: Status.OPEN,
      emergency: Emergency.HIGHT,
      importance: Importance.HIGHT,
      projectId: '',
    },
    onSubmit: async (values: Pick<Task, 'id' | 'title' | 'description' | 'status' | 'emergency' | 'importance' | 'projectId'>) =>
    handleUpdateTask(values),
    validationSchema: updateTaskSchema,
  });
 
  const handleUpdateTask = async (values: Pick<Task, 'id' | 'title' | 'description' | 'status' | 'emergency' | 'importance' | 'projectId'>) => {
    if(!id || Array.isArray(id)) return;

    try {
      await updateTask(values);
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
        const email = (await getUser())!.email;
        const projectsList = await findProjectsBy([{ userFk: email }]);
        if(!projectsList || projectsList.length === 0 || projects) return;
        setProjects(projectsList);
      } catch(e) {
        console.error(e);
      }
    })();
    
    (async () => {
      if (!id || Array.isArray(id)) return;
      try {
        const data = await findOneTaskById(id);
        if(!data) throw new Error('Task not found');
        await formik.setValues({
          title: data.title,
          description: data.description,
          status: data.status,
          emergency: data.emergency,
          importance: data.importance,
          projectId: data.projectId,
          id: data.id
        });
      } catch(e) {
        console.error(e);
        setError(true);
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
          {!error ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-center">Modifier une tâche</h1>
              <form onSubmit={formik.handleSubmit} className="w-80 mx-auto border border-gray-300 p-4 rounded-xl">
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Titre
                  </label>
                  <input
                    className={`${formik.errors.title ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="title"
                    name="title"
                    required={true}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.errors.title ? (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.title}
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
                    className={`${formik.errors.description ? "ring-red-300 focus:ring-red-500" : "ring-gray-300 focus:ring-indigo-600"} resize-none h-32 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    id="description"
                    name="description"
                    required={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description ? formik.values.description : ""}
                  ></textarea>
                  {formik.errors.description ? (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.description}
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
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="status"
                    name="status"
                    required={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
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
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="emergency"
                    name="emergency"
                    required={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emergency}
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
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="importance"
                    name="importance"
                    required={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.importance}
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
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="projectId"
                    name="projectId"
                    required={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectId}
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
