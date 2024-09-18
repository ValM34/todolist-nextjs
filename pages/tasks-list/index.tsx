import React from "react";
import { useEffect, useState } from "react";
import TasksTable from "@/components/pages/tasks-list/tasks-table";
import { fetchTasksByProjectId } from "@/pages/services/tasks";
import { fetchProjectsByUser } from "@/pages/services/projects";
import Filters from "@/components/pages/tasks-list/filters";
import Link from 'next/link';

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [emergencyFilter, setEmergencyFilter] = useState<EmergencyFilter>({
    forte: true,
    moyenne: true,
    faible: true,
  });
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>({
    aFaire: true,
    enCours: true,
    terminee: false,
  });
  const [importanceFilter, setImportanceFilter] = useState<ImportanceFilter>({
    forte: true,
    moyenne: true,
    faible: true,
  });
  const [projects, setProjects] = useState<Projects | null>(null);

  const handleEmergencyFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setEmergencyFilter({
      ...emergencyFilter,
      [e.currentTarget.value]: e.currentTarget.checked,
    });
  };

  const handleCompletedFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setCompletedFilter({
      ...completedFilter,
      [e.currentTarget.value]: e.currentTarget.checked,
    });
  };

  const handleImportanceFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setImportanceFilter({
      ...importanceFilter,
      [e.currentTarget.value]: e.currentTarget.checked,
    });
  };

  const handleTasksFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTasksList = await fetchTasksByProjectId(e.target.value);
    filterTasksByEmergencyAndImportance(newTasksList);
  };

  const filterTasksByEmergencyAndImportance = (tasks: Task[]) => {
    let tasksListOrdered: Task[] = [];
    tasks.forEach((task: Task) => {
      task.score = 0;
      if (task.emergency === 'Forte') {
        if (task.importance === 'Forte') {
          task.score = 9;
        } else if (task.importance === 'Moyenne') {
          task.score = 8;
        } else if (task.importance === 'Faible') {
          task.score = 7;
        }
      } else if (task.emergency === 'Moyenne') {
        if (task.importance === 'Forte') {
          task.score = 6;
        } else if (task.importance === 'Moyenne') {
          task.score = 5;
        } else if (task.importance === 'Faible') {
          task.score = 4;
        }
      } else if (task.emergency === 'Faible') {
        if (task.importance === 'Forte') {
          task.score = 3;
        } else if (task.importance === 'Moyenne') {
          task.score = 2;
        } else if (task.importance === 'Faible') {
          task.score = 1;
        }
      }
      tasksListOrdered.push(task);
    });
    tasksListOrdered.sort((a, b) => b.score - a.score);

    setTasks(tasksListOrdered);
  };

  useEffect(() => {
    (async () => {
      const projectsList = await fetchProjectsByUser();
      if (projectsList && projectsList.length > 0 && projects === null) {
        setProjects(projectsList);
        const firstProjectId = projectsList[0]._id;
        const data = await fetchTasksByProjectId(firstProjectId);
        filterTasksByEmergencyAndImportance(data);
      }
    })();
  }, [projects]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Mes listes de tâches</h1>
      {Array.isArray(projects) ? (
        <>
          <Filters
            handleEmergencyFilter={handleEmergencyFilter}
            handleCompletedFilter={handleCompletedFilter}
            handleImportanceFilter={handleImportanceFilter}
            handleTasksFilter={handleTasksFilter}
            projects={projects}
          />
          {Array.isArray(tasks) && tasks.length > 0 ? (
            <TasksTable
              tasks={tasks}
              emergencyFilter={emergencyFilter}
              completedFilter={completedFilter}
              importanceFilter={importanceFilter}
            />
          ) : (
            <div>
              <div className="">
                Vous n&apos;avez pas encore créé de
                tâche liée au projet sélectionné. Il vous faut <b>créer une tâche</b>.
              </div>
              <Link href="/tasks-list/new" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cliquez ici pour ajouter une nouvelle tâche.</Link>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="">
            Chaque tâche est liée à un projet. Vous n&apos;avez pas encore créé de
            projet. Il vous faut créer un projet pour pouvoir ajouter des
            tâches.
          </div>
          <Link href="/projects/new" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cliquez ici pour ajouter un nouveau projet.</Link>
        </div>
      )}
    </>
  );
}
