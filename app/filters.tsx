import { ChangeEvent } from "react";

interface HandleEmergencyFilterProps {
  handleEmergencyFilter: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleStatusFilter: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleImportanceFilter: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleTasksFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  projects: Project[];
}

export default function Filters(props: HandleEmergencyFilterProps) {
  const { handleEmergencyFilter, handleStatusFilter, handleImportanceFilter, handleTasksFilter, projects } = props;
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
                    value="HIGHT"
                    id="HIGHT"
                    name="HIGHT"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="HIGHT" className="font-medium text-gray-900">
                    HIGHT
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleEmergencyFilter(e)}
                    value="AVERAGE"
                    id="AVERAGE"
                    name="AVERAGE"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="AVERAGE" className="font-medium text-gray-900">
                    AVERAGE
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleEmergencyFilter(e)}
                    value="LOW"
                    id="LOW"
                    name="LOW"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="LOW"
                    className="font-medium text-gray-900"
                  >
                    LOW
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
                    value="HIGHT"
                    id="HIGHT"
                    name="HIGHT"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="HIGHT" className="font-medium text-gray-900">
                    HIGHT
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleImportanceFilter(e)}
                    value="AVERAGE"
                    id="AVERAGE"
                    name="AVERAGE"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="AVERAGE" className="font-medium text-gray-900">
                    AVERAGE
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleImportanceFilter(e)}
                    value="LOW"
                    id="LOW"
                    name="LOW"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="LOW"
                    className="font-medium text-gray-900"
                  >
                    LOW
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
                    onClick={(e) => handleStatusFilter(e)}
                    value="OPEN"
                    id="OPEN"
                    name="OPEN"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="OPEN" className="font-medium text-gray-900">
                    OPEN
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleStatusFilter(e)}
                    value="IN_PROGRESS"
                    id="IN_PROGRESS"
                    name="IN_PROGRESS"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="IN_PROGRESS" className="font-medium text-gray-900">
                    IN_PROGRESS
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) => handleStatusFilter(e)}
                    value="DONE"
                    id="DONE"
                    name="DONE"
                    type="checkbox"
                    defaultChecked={false}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="DONE"
                    className="font-medium text-gray-900"
                  >
                    DONE
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
                return <option key={project.id} value={project.id}>{project.title}</option>
              })
            }
          </select>
        </div>

      </div>
    </div>
  );
}
