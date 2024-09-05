const people = [
  {
    _id: '1',
    title: 'Lindsay Walton',
    completed: 'En cours',
    description: 'Front-end Developer',
    emergency: 'Member',
  },
  // More people...
]

interface Task {
  _id: string;
  title: string;
  completed: string;
  emergency: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

interface TasksList {
  tasks: Task[];
}

interface TasksListProps {
  tasks: Task[];
  emergencyFilter: {
    urgent: boolean,
    normal: boolean,
    pasUrgent: boolean,
  }
  completedFilter: {
    aFaire: boolean,
    enCours: boolean,
    terminee: boolean,
  }
}

export default function TasksTable(props: TasksListProps) {
  const { tasks, emergencyFilter, completedFilter } = props;
  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Titre
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Urgence
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Statut
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    emergencyFilter={emergencyFilter}
                    completedFilter={completedFilter}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TaskProps {
  task: Task;
  emergencyFilter: {
    urgent: boolean,
    normal: boolean,
    pasUrgent: boolean,
  }
  completedFilter: {
    aFaire: boolean,
    enCours: boolean,
    terminee: boolean,
  }
}

function Task(props: TaskProps) {
  const { task, emergencyFilter, completedFilter } = props;

  let display = true;
  if(task.emergency === "Urgent" && emergencyFilter.urgent === false) return display = false;
  if(task.emergency === "Normal" && emergencyFilter.normal === false) return display = false;
  if(task.emergency === "Pas urgent" && emergencyFilter.pasUrgent === false) return display = false;

  if(task.completed === "A faire" && completedFilter.aFaire === false) return display = false;
  if(task.completed === "En cours" && completedFilter.enCours === false) return display = false;
  if(task.completed === "Terminée" && completedFilter.terminee === false) return display = false;

  return (
    <tr 
      className={`${ display === true ? "" : "hidden" }`}
      key={task._id}>
    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
      <div className="flex items-center">
        <div>
          <div className="font-medium text-gray-900">{task.title}</div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
      <div className="text-gray-900">{task.description}</div>
    </td>
    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
      <span 
        className={`
          inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
          ${
            task.emergency === "Urgent" ? "bg-red-50 text-red-700 ring-red-600/20" : ""
          } ${
            task.emergency === "Normal" ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20" : ""
          } ${
            task.emergency === "Pas urgent" ? "bg-green-50 text-green-700 ring-green-600/20" : ""
          }
        `}>
        {task.emergency}
      </span>
    </td>
    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{task.completed}</td>
    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">
        Edit<span className="sr-only">, {task.title}</span>
      </a>
    </td>
  </tr>
  )
}
