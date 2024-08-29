import React from "react";
import { useEffect, useState } from "react";
import "../../app/globals.css";

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
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: "A faire",
    emergency: "Normal",
    description: "",
  });

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data.data));
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!newTodo.title || !newTodo.emergency || !newTodo.description || !newTodo.completed) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodo.title,
        completed: newTodo.completed,
        emergency: newTodo.emergency,
        description: newTodo.description,
      }),
    });

    const data = await res.json();
    setTasks([...tasks, data.data]);
    setNewTodo({
      title: "",
      completed: "A faire",
      emergency: "Urgent",
      description: "",
    });
  };

  return (
    <div>
      <h1>Ma Todolist</h1>
      <ul className="flex flex-wrap justify-evenly">
        {tasks.map((task) => (
          <li className="bg-yellow-200 rounded-xl w-60 min-h-40 m-4 text-center" key={task._id}>
            <b>
              {task.title} - {task.completed} - {task.emergency}
            </b>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <form>
        <input
          required={true}
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          required={true}
          type="text"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <select
          required={true}
          onChange={(e) =>
            setNewTodo({ ...newTodo, completed: e.target.value })
          }
        >
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
        <select
          required={true}
          onChange={(e) =>
            setNewTodo({ ...newTodo, emergency: e.target.value })
          }
        >
          <option value="Urgent">Urgent</option>
          <option value="Normal">Normal</option>
          <option value="Pas urgent">Pas urgent</option>
        </select>
        <button type="submit" onClick={handleAddTodo}>Ajouter</button>
      </form>
    </div>
  );
}
