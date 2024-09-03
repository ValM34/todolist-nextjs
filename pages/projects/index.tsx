import { useState, useEffect } from 'react';
import '../../app/globals.css';
import { createProject } from '../services/projects';
import { verifyToken } from "../services/verifyToken";

export default function Projects() {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });
  const [userId, setUserId] = useState(null);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      return;
    }
    console.log(userId)
    const data = await createProject({
      title: newProject.title,
      description: newProject.description,
      user: userId,
    });
    console.log(data);
  };

  useEffect(() => {
    let storedUser : any | null = localStorage.getItem('user');
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      const getUserByToken = async () => {
        const userDecoded = await verifyToken(storedUser.token);
        console.log(userDecoded.user.userId);
        setUserId(userDecoded.user.userId);
      }
      getUserByToken();
    }
  })


  return (
    <form className="w-60 mx-auto border-2 border-gray-300 p-4 rounded-xl">
      <h2 className="font-semibold text-xl mb-4">Ajouter une tâche</h2>
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Titre
        </label>
        <input
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="title"
          name="title"
          required={true}
          type="text"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
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
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="description"
          name="description"
          required={true}
          type="text"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
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
  );
}
