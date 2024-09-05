import React from "react";
import { useEffect, useState } from "react";
import "../app/globals.css";
import Task from "./taskslist/TaskOld";
import MainLayout from "../components/layouts/mainLayout";
import TaskForm from "./taskslist/TaskForm";
import { fetchTasks } from "./services/tasks";
import { fetchProjectsByUser } from "./services/projects";
import TasksList from "./taskslist";

export default function Home() {
  return (
    <TasksList />
  );
}
