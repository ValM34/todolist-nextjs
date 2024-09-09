import MainLayout from "../../components/layouts/main-layout";
import { fetchProjectsByUser, deleteProject } from "../services/projects";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description: string;
  user: string;
  updatedAt: string;
  createdAt: string;
}

interface Projects {
  projects: Project[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project | null>(null);
  useEffect(() => {
    let storedUser: any | null = localStorage.getItem("user");
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      (async () => {
        const projectsList = await fetchProjectsByUser(storedUser.token);
        if (projectsList && projects === null && projectsList.length > 0) {
          setProjects(projectsList);
        }
      })();
    }
  });

  const handleDeleteProject = async (projectId: string) => {
    let storedUser: any | null = localStorage.getItem("user");
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      (async () => {
        const projectDeleted = await deleteProject(storedUser.token, projectId);
      })();
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4 text-center">Mes projets</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.isArray(projects) ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 flex-1">
                <div>
                  <div className="flex justify-between">
                    <Link href={`/tasks-list/${project._id}`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      {project.title}
                    </Link>
                    <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => handleDeleteProject(project._id)}>Supprimer</button>
                  </div>
                  <p className="truncate text-sm text-gray-500">{project.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="">
              Vous n&apos;avez pas encore créé de projet. Il vous faut 
              créer un projet pour pouvoir ajouter des tâches.
            </div>
            <Link href="/projects/new" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cliquez ici pour ajouter un nouveau projet.</Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
