import React from "react";
import { useEffect, useState } from "react";
import "../../app/globals.css";
import Task from "./Task";
import MainLayout from "../../components/layouts/mainLayout";
import TaskForm from "./taskForm";
import { fetchTasks } from "../services/tasks";

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

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [emergencyFilter, setEmergencyFilter] = useState({
    urgent: true,
    normal: true,
    pasUrgent: true,
  });
  const [completedFilter, setCompletedFilter] = useState({
    aFaire: true,
    enCours: true,
    terminée: false,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch(error) {
        console.log(error)
        // @TODO handle error
      }
    }
    loadData();
  }, []);

  return (
    <>
      <h1>Ma Todolist</h1>

      <div>
        <h2>Filtres</h2>
        <div>
          <b>Urgence</b>
          <div>
            <input onChange={(e) => setEmergencyFilter({ ...emergencyFilter, urgent : Boolean(e.target.checked) })} type="checkbox" defaultChecked={true} name="urgent" value="urgent" />
            <input onChange={(e) => setEmergencyFilter({ ...emergencyFilter, normal : Boolean(e.target.checked) })} type="checkbox" defaultChecked={true} name="normal" value="normal" />
            <input onChange={(e) => setEmergencyFilter({ ...emergencyFilter, pasUrgent : Boolean(e.target.checked) })} type="checkbox" defaultChecked={true} name="pas urgent" value="pas urgent" />
          </div>
        </div>
        <div>
          <b>Statut</b>
          <div>
            <input onChange={(e) => setCompletedFilter({ ...completedFilter, aFaire : Boolean(e.target.checked) })} type="checkbox" defaultChecked={true} name="a faire" value="a faire" />
            <input onChange={(e) => setCompletedFilter({ ...completedFilter, enCours : Boolean(e.target.checked) })} type="checkbox" defaultChecked={true} name="en cours" value="en cours" />
            <input onChange={(e) => setCompletedFilter({ ...completedFilter, terminée : Boolean(e.target.checked) })} type="checkbox" defaultChecked={false} name="terminée" value="terminée" />
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap justify-evenly">
        {tasks ? tasks.map((task) => (
          <Task key={task._id} task={task} emergencyFilter={emergencyFilter} completedFilter={completedFilter} />
        )) : "Loading..."}
      </ul>
      <TaskForm tasks={tasks} setTasks={setTasks} />
    </>
  );
}
