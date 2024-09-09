import { useState, useRef, useEffect } from "react";
import MainLayout from "../../../components/layouts/mainLayout";
import { useRouter } from 'next/router';
import { fetchTaskById, updateTask } from "../../services/tasks";
import Link from 'next/link';
import { fetchProjectsByUser } from "../../services/projects";


interface Task {
  title: string | null;
  description: string | null;
  completed: string | null;
  emergency: string | null;
  importance: string | null;
  project: string | null;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  user: string;
  updatedAt: string;
  createdAt: string;
}

interface Projects extends Array<Project> {}

export default function TaskFormUpdate() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task>({
    title: null,
    description: null,
    completed: null,
    emergency: null,
    importance: null,
    project: null,
  });
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLInputElement>(null);
  const selectCompletedRef = useRef<HTMLSelectElement>(null);
  const selectEmergencyRef = useRef<HTMLSelectElement>(null);
  const selectImportanceRef = useRef<HTMLSelectElement>(null);
  const selectProjectRef = useRef<HTMLSelectElement>(null);
  const [projects, setProjects] = useState<Projects | null>(null);
 
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !inputTitleRef.current?.value ||
      !inputDescriptionRef.current?.value ||
      !selectCompletedRef.current?.value ||
      !selectEmergencyRef.current?.value ||
      !selectImportanceRef.current?.value ||
      !selectProjectRef.current?.value
    ) {
      return;
    }

    const taskUpdated = {
      _id: id,
      title: inputTitleRef.current?.value,
      description: inputDescriptionRef.current?.value,
      completed: selectCompletedRef.current?.value,
      emergency: selectEmergencyRef.current?.value,
      importance: selectImportanceRef.current?.value,
      project: selectProjectRef.current?.value,
    };

    console.log(taskUpdated)
    const storageUser = localStorage.getItem("user");
    if (!storageUser) return;
    const token = JSON.parse(storageUser).token;
    await updateTask(taskUpdated, token);
    router.push("/");
  };

  useEffect(() => {
    let storedUser: any | null = localStorage.getItem("user");
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      (async () => {
        const projectsList = await fetchProjectsByUser(storedUser.token);
        if (projectsList && projectsList.length > 0 && projects === null) {
          console.log(projectsList);
          setProjects(projectsList);
        }
      })();
    }
    (async () => {
      console.log(id)
      if (!id) return;
      let data = await fetchTaskById(id);
      setTask(data);
    })();
  }, [id, projects]);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4 text-center">Modifier une tâche</h1>
      {task?.title && task?.description && task?.completed && task?.emergency && task?.importance && task?.project && projects ? (
        <form className="w-60 mx-auto border-2 border-gray-300 p-4 rounded-xl">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Titre
            </label>
            <input
              ref={inputTitleRef}
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="title"
              name="title"
              required={true}
              type="text"
              defaultValue={task.title}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <input
              ref={inputDescriptionRef}
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="description"
              name="description"
              required={true}
              type="text"
              defaultValue={task.description}
            />
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
              defaultValue={task.completed}
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
              defaultValue={task.importance}
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
              defaultValue={task.project}
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
              onClick={handleUpdateTask}
            >
              Ajouter
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="">
            Il semble qu&apos;aucune tâche ne corresponde à votre recherche.
          </div>
          <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cliquez ici pour retourner sur la liste des tâches.</Link>
        </div>
      )}
    </MainLayout>
  );
}