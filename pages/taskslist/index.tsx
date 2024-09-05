import React from "react";
import { useEffect, useState } from "react";
import "../../app/globals.css";
import TaskOld from "./TaskOld";
import TasksTable from "./TasksTable";
import MainLayout from "../../components/layouts/mainLayout";
import TaskForm from "./TaskForm";
import { fetchTasks } from "../services/tasks";
import { fetchProjectsByUser } from "../services/projects";
import Filters from "./Filters";

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

interface Project {
  _id: string,
  title: string,
  description: string,
  user: string,
  updatedAt: string,
  createdAt: string,
}

interface Projects {
  projects: Project[]
}

interface EmergencyFilter {
  [key: string]: boolean;
  urgent: boolean;
  normal: boolean;
  pasUrgent: boolean;
}

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [emergencyFilter, setEmergencyFilter] = useState<EmergencyFilter>({
    urgent: true,
    normal: true,
    pasUrgent: true,
  });
  const [completedFilter, setCompletedFilter] = useState({
    aFaire: true,
    enCours: true,
    terminee: false,
  });
  const [projects, setProjects] = useState<Projects | null>(null);

  const handleEmergencyFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setEmergencyFilter({ ...emergencyFilter, [e.currentTarget.value]: e.currentTarget.checked });
  };

  const handleCompletedFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setCompletedFilter({ ...completedFilter, [e.currentTarget.value]: e.currentTarget.checked });
  };

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

    let storedUser : any | null = localStorage.getItem('user');
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      (async () => {
        const projectsList = await fetchProjectsByUser(storedUser.token);
        if(projectsList && projects === null){
          setProjects(projectsList);
        }
      })();
    }
  }, [projects]);

  return (
    <MainLayout>
      <h1>Ma Todolist</h1>
      {
        Array.isArray(projects) ? (
          <Filters 
          handleEmergencyFilter={handleEmergencyFilter} 
          handleCompletedFilter={handleCompletedFilter} 
          projects={projects}
        />
        ) : (
          "Vous n'avez pas encore créé de projet"
        )
      }
      <TasksTable tasks={tasks} emergencyFilter={emergencyFilter} completedFilter={completedFilter} />
      {/* <ul className="flex flex-wrap justify-evenly">
        {tasks ? tasks.map((task) => (
          <TaskOld key={task._id} task={task} emergencyFilter={emergencyFilter} completedFilter={completedFilter} />
        )) : "Loading..."}
      </ul> */}
    </MainLayout>
  );
}
