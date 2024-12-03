'use client'
import Link from "next/link";

export default function TasksTable(props: TasksListProps) {
  const { tasks, emergencyFilter, statusFilter, importanceFilter } = props;
  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Titre
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/2"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Urgence
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Importance
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Statut
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tasks &&
                  tasks.map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      importanceFilter={importanceFilter}
                      emergencyFilter={emergencyFilter}
                      statusFilter={statusFilter}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TaskProps {
  task: Task;
  emergencyFilter: {
    HIGHT: boolean;
    AVERAGE: boolean;
    LOW: boolean;
  };
  statusFilter: {
    OPEN: boolean;
    IN_PROGRESS: boolean;
    DONE: boolean;
  };
  importanceFilter: {
    HIGHT: boolean;
    AVERAGE: boolean;
    LOW: boolean;
  };
}

function Task(props: TaskProps) {
  const { task, emergencyFilter, statusFilter, importanceFilter } = props;

  let display = true;
  if (task.emergency === "HIGHT" && emergencyFilter.HIGHT === false)
    return (display = false);
  if (task.emergency === "AVERAGE" && emergencyFilter.AVERAGE === false)
    return (display = false);
  if (task.emergency === "LOW" && emergencyFilter.LOW === false)
    return (display = false);

  if (task.status === "OPEN" && statusFilter.OPEN === false)
    return (display = false);
  if (task.status === "IN_PROGRESS" && statusFilter.IN_PROGRESS === false)
    return (display = false);
  if (task.status === "DONE" && statusFilter.DONE === false)
    return (display = false);

  if (task.importance === "HIGHT" && importanceFilter.HIGHT === false)
    return (display = false);
  if (task.importance === "AVERAGE" && importanceFilter.AVERAGE === false)
    return (display = false);
  if (task.importance === "LOW" && importanceFilter.LOW === false)
    return (display = false);

  return (
    <tr className={`${display === true ? "" : "hidden"}`} key={task.id}>
      <td className="max-w-40 py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div>
            <div className="font-medium text-gray-900">{task.title}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-5 text-sm text-gray-500 w-3xl max-w-3xl">
        <div className="text-gray-900 text-ellipsis overflow-hidden">
          {task.description}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <span
          className={`
          inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
          ${
            task.emergency === "HIGHT"
              ? "bg-red-50 text-red-700 ring-red-600/20"
              : ""
          } ${
            task.emergency === "AVERAGE"
              ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
              : ""
          } ${
            task.emergency === "LOW"
              ? "bg-green-50 text-green-700 ring-green-600/20"
              : ""
          }
        `}
        >
          {task.emergency}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {task.importance}
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {task.status}
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Link
          href={`/tasks/update/${task.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
