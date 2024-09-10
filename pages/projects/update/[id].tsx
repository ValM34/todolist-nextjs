import { useState, useEffect, useRef } from 'react';
import { updateProject } from '../../services/projects';
import { useRouter } from 'next/router';
import { fetchProjectById } from "../../services/projects";
import Link from 'next/link';

export default function Projects() {
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    user: "",
  });

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if(
      !inputTitleRef.current?.value ||
      !inputDescriptionRef.current?.value
    ) {
      return;
    }

    await updateProject({
      _id: id,
      title: inputTitleRef.current?.value,
      description: inputDescriptionRef.current?.value
    });
    router.push('/projects');
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      let data = await fetchProjectById(id);
      setProject(data);
    })();
  }, [id]);

  return (
    <>
      {project?.title && project?.description ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">Ajouter un projet</h1>
          <form className="w-60 mx-auto border-2 border-gray-300 p-4 rounded-xl">
            <h2 className="font-semibold text-xl mb-4">Ajouter un projet</h2>
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
                ref={inputTitleRef}
                defaultValue={project.title}
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
                ref={inputDescriptionRef}
                defaultValue={project.description}
              />
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
        <Link href="/projects" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cliquez ici pour retourner sur la liste des projets.</Link>
      </div>
      )}
    </>
  );
}
