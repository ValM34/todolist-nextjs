import { ChangeEvent } from "react";

interface Project {
  _id: string,
  title: string,
  description: string,
  user: string,
  updatedAt: string,
  createdAt: string,
}

interface Task {
  _id: string;
  title: string;
  completed: string;
  emergency: string;
  importance: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

interface TasksList {
  tasks: Task[];
}

interface HandleEmergencyFilterProps {
  handleEmergencyFilter: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleCompletedFilter: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleImportanceFilter: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleTasksFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  projects: Project[];
}

export default function Filters(props: HandleEmergencyFilterProps) {
  const { handleEmergencyFilter, handleCompletedFilter, handleImportanceFilter, handleTasksFilter, projects } = props;
  return (
    <div className="border border-gray-200 my-10 p-6">
      <h2 className="mb-4 font-bold text-2xl">Filtres</h2>
      <div className="flex">

        <div className="mr-20 sm:w-40 w-full">
          <b className="mb-4 block">Urgence</b>
          <fieldset>
            <div className="space-y-5">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleEmergencyFilter(e)}
                    value="forte"
                    id="forte"
                    name="forte"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="forte" className="font-medium text-gray-900">
                    Forte
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleEmergencyFilter(e)}
                    value="moyenne"
                    id="moyenne"
                    name="moyenne"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="moyenne" className="font-medium text-gray-900">
                    Moyenne
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleEmergencyFilter(e)}
                    value="faible"
                    id="faible"
                    name="faible"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="faible"
                    className="font-medium text-gray-900"
                  >
                    Faible
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="mr-20 sm:w-40 w-full">
          <b className="mb-4 block">Importance</b>
          <fieldset>
            <div className="space-y-5">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleImportanceFilter(e)}
                    value="forte"
                    id="forte"
                    name="forte"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="forte" className="font-medium text-gray-900">
                    Forte
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleImportanceFilter(e)}
                    value="moyenne"
                    id="moyenne"
                    name="moyenne"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="moyenne" className="font-medium text-gray-900">
                    Moyenne
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleImportanceFilter(e)}
                    value="faible"
                    id="faible"
                    name="faible"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="faible"
                    className="font-medium text-gray-900"
                  >
                    Faible
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="mr-20 sm:w-40 w-full">
          <b className="mb-4 block">Statut</b>
          <fieldset>
            <div className="space-y-5">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleCompletedFilter(e)}
                    value="aFaire"
                    id="aFaire"
                    name="aFaire"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="aFaire" className="font-medium text-gray-900">
                    A faire
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleCompletedFilter(e)}
                    value="enCours"
                    id="enCours"
                    name="enCours"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="enCours" className="font-medium text-gray-900">
                    En cours
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleCompletedFilter(e)}
                    value="terminee"
                    id="terminee"
                    name="terminee"
                    type="checkbox"
                    defaultChecked={false}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="terminee"
                    className="font-medium text-gray-900"
                  >
                    Terminée
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="sm:w-60 w-full">
          <label htmlFor="project" className="block font-medium leading-6 text-gray-900">
            <b className="mb-4 block">Projet</b>
          </label>
          <select
            id="project"
            name="project"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => handleTasksFilter(e)}
          >
            {
              Array.isArray(projects) && projects.map((project) => {
                return <option key={project._id} value={project._id}>{project.title}</option>
              })
            }
          </select>
        </div>

      </div>
    </div>
  );
}
