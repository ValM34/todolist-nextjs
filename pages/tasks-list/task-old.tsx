interface Task {
  _id: string;
  title: string;
  completed: string;
  emergency: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

interface Taskprops {
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

export default function Task(props : Taskprops) {
  const { task, emergencyFilter, completedFilter } = props;

  let display = true;
  if(task.emergency === "Urgent" && emergencyFilter.urgent === false) return display = false;
  if(task.emergency === "Normal" && emergencyFilter.normal === false) return display = false;
  if(task.emergency === "Pas urgent" && emergencyFilter.pasUrgent === false) return display = false;

  if(task.completed === "A faire" && completedFilter.aFaire === false) return display = false;
  if(task.completed === "En cours" && completedFilter.enCours === false) return display = false;
  if(task.completed === "Terminée" && completedFilter.terminee === false) return display = false;
  
  return (
    <li
      className={`shadow-lg rounded-xl w-60 min-h-40 m-4 text-center ${
        task.emergency === "Urgent" ? "bg-red-200" : ""
      } ${
        task.emergency === "Normal" ? "bg-yellow-200" : ""
      } ${
        task.emergency === "Pas urgent" ? "bg-green-200" : ""
      } ${
        display === true ? "" : "hidden"
      }
      `}
      key={task._id}
    >
      <b
        className={`block p-2 shadow-md rounded-t-xl ${
          task.emergency === "Urgent" ? "bg-red-300" : ""
        } ${task.emergency === "Normal" ? "bg-yellow-300" : ""} ${
          task.emergency === "Pas urgent" ? "bg-green-300" : ""
        }`}
      >
        {task.title} - {task.completed} - {task.emergency}
      </b>
      <p className="p-2">{task.description}</p>
    </li>
  );
}
