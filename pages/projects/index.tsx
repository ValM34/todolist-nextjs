import { fetchProjectsByUser, deleteProject } from "../services/projects";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import Modale from "../../components/modale";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Projects | null>(null);
  const [openModale, setOpenModale] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleOpenModale = (boolean: boolean) => {
    setOpenModale(boolean);
  }

  useEffect(() => {
    (async () => {
      const projectsList = await fetchProjectsByUser();
      if (projectsList && projects === null && projectsList.length > 0) {
        setProjects(projectsList);
      }
    })();
  });

  const displayModaleToDeleteProject = (projectId: string) => {
    // Active la modale

    // If oui alors handleDeleteProject(projectId)

    // If non alors on ferme la modale (rien)
  }

  const handleDeleteProject = async (projectId: string) => {
    (async () => {
      if(!projects) return;
      console.log(projectId)

      await deleteProject(projectId);
      let projectsFilteredAfterDeletion = projects.filter((project) => project._id !== projectId);
      setProjects(projectsFilteredAfterDeletion);
    })();
  };

  console.log(projectToDelete)

  return (
    <>
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
                    <Link
                      href={`/tasks-list/${project._id}`}
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      {project.title}
                    </Link>
                    <button
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      onClick={() => router.push(`/projects/update/${project._id}`)}
                    >
                      Modifier
                    </button>
                    <button
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      // onClick={() => handleDeleteProject(project._id)}
                      onClick={() => {
                        handleOpenModale(true)
                        setProjectToDelete(project)
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                  <p className="truncate text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="">
              Vous n&apos;avez pas encore créé de projet. Il vous faut créer un
              projet pour pouvoir ajouter des tâches.
            </div>
            <Link
              href="/projects/new"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Cliquez ici pour ajouter un nouveau projet.
            </Link>
          </div>
        )}
      </div>
      <Modale handleOpenModale={handleOpenModale} openModale={openModale} projectToDelete={projectToDelete} handleDeleteProject={handleDeleteProject} />
    </>
  );
}
