import { useState, useRef } from "react";
import { createTask } from "@/pages/services/tasks";

export default function TaskForm(props : TaskFormProps) {
  const { tasks, setTasks } = props;
  const selectCompletedRef = useRef<HTMLSelectElement>(null);
  const selectEmergencyRef = useRef<HTMLSelectElement>(null);
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: "A faire",
    emergency: "Urgent",
    description: "",
  });
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newTodo.title ||
      !newTodo.emergency ||
      !newTodo.description ||
      !newTodo.completed
    ) {
      return;
    }

    const data = await createTask({
      title: newTodo.title,
      completed: newTodo.completed,
      emergency: newTodo.emergency,
      description: newTodo.description,
    });

    setTasks([...tasks, data.data]);
    setNewTodo({
      title: "",
      completed: selectCompletedRef?.current?.value ?? "A faire",
      emergency: selectEmergencyRef?.current?.value ?? "Urgent",
      description: "",
    });
  };

  return (
    <form className="w-60 mx-auto border-2 border-gray-300 p-4 rounded-xl">
      <h2 className="font-semibold text-xl mb-4">Ajouter une tâche</h2>
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
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
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
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="completed"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Statut
        </label>
        <select
          ref={selectCompletedRef}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="completed"
          name="completed"
          required={true}
          onChange={(e) =>
            setNewTodo({ ...newTodo, completed: e.target.value })
          }
        >
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
      </div>

      <div className="flex flex-col mt-4">
        <label
          htmlFor="emergency"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Urgence
        </label>
        <select
          ref={selectEmergencyRef}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="emergency"
          name="emergency"
          required={true}
          onChange={(e) =>
            setNewTodo({ ...newTodo, emergency: e.target.value })
          }
        >
          <option value="Urgent">Urgent</option>
          <option value="Normal">Normal</option>
          <option value="Pas urgent">Pas urgent</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button
          className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
          onClick={handleAddTodo}
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
