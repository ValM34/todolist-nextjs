import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import TaskForm from "../pages/tasks/new";
import { createTask } from "@/services/tasks";
import { useRouter } from "next/router";
import { fetchProjectsByUser } from "@/services/projects";

jest.mock("../services/projects", () => ({
  fetchProjectsByUser: jest.fn(() => Promise.resolve(projectsList)),
}));

jest.mock("../services/tasks", () => ({
  createTask: jest.fn(() => Promise.resolve(newTask)),
}));

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
    query: {},
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

const projectsList = [
  {
    createdAt: "2024-09-10T20:22:16.346Z",
    description: "Application post-formation de liste de tâches en Next.js.",
    tasks: [],
    title: "Application To do list",
    updatedAt: "2024-09-14T20:20:48.601Z",
    user: "66de43d9297d7fb64246ef18",
    __v: 0,
    _id: "66e0aa7890f10c1fc2519dcd",
  },
  {
    createdAt: "2024-09-10T21:16:15.856Z",
    description: "Tâches hebdomadaires + Tâches de la vie quotidienne à faire",
    tasks: [],
    title: "Général",
    updatedAt: "2024-09-10T21:43:13.606Z",
    user: "66de43d9297d7fb64246ef18",
    __v: 0,
    _id: "66e0b71f1e7a9eea70c3ef3e",
  },
];

const newTask = {
  completed: "A faire",
  createdAt: "2024-09-23T22:42:16.196Z",
  description: "fdgfdg",
  emergency: "Forte",
  importance: "Forte",
  project: "66e0aa7890f10c1fc2519dcd",
  title: "Nouvelle tâche",
  updatedAt: "2024-09-23T22:42:16.196Z",
  user: "66de43d9297d7fb64246ef18",
  __v: 0,
  _id: "66f1eec8363c20f1337f6ef6",
};

describe("TaskForm", () => {
  it("render a new task form", async () => {
    await act(async () => {
      const { container } = render(<TaskForm />);
    });

    const heading = screen.getByRole("heading", { level: 1 });
    const labelTitle = screen.getByText("Titre");
    const labelDescription = screen.getByText("Description");
    const labelCompleted = screen.getByText("Statut");
    const labelEmergency = screen.getByText("Urgence");
    const labelImportance = screen.getByText("Importance");
    const labelProject = screen.getByText("Projet");
    const button = screen.getByText("Ajouter");

    expect(heading).toBeInTheDocument();
    expect(labelTitle).toBeInTheDocument();
    expect(labelDescription).toBeInTheDocument();
    expect(labelCompleted).toBeInTheDocument();
    expect(labelEmergency).toBeInTheDocument();
    expect(labelImportance).toBeInTheDocument();
    expect(labelProject).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  // it("add a new task", async () => {
  //   const task = await createTask({ title: "Nouvelle tâche" });
  //   expect(task).toEqual(newTask);
  // });
});

// describe("When the user add a new task", () => {
//   it("should redirect to the tasks list page", async () => {
//     const router = useRouter();
//     await act(async () => {
//       render(<TaskForm />);
//     });
//     const button = screen.getByText("Ajouter");
//     await act(async () => {
//       button.click();
//     });


//     expect(createTask).toHaveBeenCalled();

//     expect(router.push).toHaveBeenCalledWith("/tasks");
//   });
// });
