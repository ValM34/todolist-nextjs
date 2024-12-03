'use client';
import { useEffect } from "react"


import { useState } from "react";
import EmptyTaskState from "./EmptyTaskState"
import Filters from "./Filters"
import TasksTable from "./TasksTable"
import { findTasksBy } from "@/infrastructure/repositories/task-repository";
import useProjectsStore from "@/stores/project-store";
import { revalidateTag } from "next/cache";

interface TaskListContentProps {
  initTasks: Task[]
  projects: Project[]
}

export default function TaskListContent({
  initTasks = [],
  projects = []
}: TaskListContentProps) {
  const [tasks, setTasks] = useState<Task[]>(initTasks)
  const { setProjects } = useProjectsStore();
  const [emergencyFilter, setEmergencyFilter] = useState<EmergencyFilter>({
    HIGHT: true,
    AVERAGE: true,
    LOW: true,
  })
  const [statusFilter, setStatusFilter] = useState<StatusFilter>({
    OPEN: true,
    IN_PROGRESS: true,
    DONE: false,
  })

  const [importanceFilter, setImportanceFilter] = useState<ImportanceFilter>({
    HIGHT: true,
    AVERAGE: true,
    LOW: true,
  })
  const handleEmergencyFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setEmergencyFilter({
      ...emergencyFilter,
      [e.currentTarget.value]: e.currentTarget.checked,
    })
  }

  const handleStatusFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setStatusFilter({
      ...statusFilter,
      [e.currentTarget.value]: e.currentTarget.checked,
    })
  }

  const handleImportanceFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setImportanceFilter({
      ...importanceFilter,
      [e.currentTarget.value]: e.currentTarget.checked,
    })
  }

  const handleTasksFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const tasksList = await findTasksBy([{ projectId: e.target.value }])
      if (!tasksList || tasksList.length === 0) throw new Error('Tasks not found')
      filterTasksByEmergencyAndImportance(tasksList)
    } catch (e) {
      console.error(e)
      setTasks([])
    }
  }

  const filterTasksByEmergencyAndImportance = (tasks: Task[]) => {
    let tasksListOrdered: Task[] = []
    tasks.forEach((task: Task) => {
      task.score = 0
      if (task.emergency === 'HIGHT') {
        if (task.importance === 'HIGHT') {
          task.score = 9
        } else if (task.importance === 'AVERAGE') {
          task.score = 8
        } else if (task.importance === 'LOW') {
          task.score = 7
        }
      } else if (task.emergency === 'AVERAGE') {
        if (task.importance === 'HIGHT') {
          task.score = 6
        } else if (task.importance === 'AVERAGE') {
          task.score = 5
        } else if (task.importance === 'LOW') {
          task.score = 4
        }
      } else if (task.emergency === 'LOW') {
        if (task.importance === 'HIGHT') {
          task.score = 3
        } else if (task.importance === 'AVERAGE') {
          task.score = 2
        } else if (task.importance === 'LOW') {
          task.score = 1
        }
      }
      tasksListOrdered.push(task)
    })
    tasksListOrdered.sort((a, b) => b.score ?? 0 - (a.score ?? 0))

    setTasks(tasksListOrdered)
  }

  useEffect(() => {
    if (projects) {
      setProjects(projects);
      filterTasksByEmergencyAndImportance(projects[0].tasks ?? []);
    }
  }, [projects])



  return (
    <>
      <Filters
        handleEmergencyFilter={handleEmergencyFilter}
        handleStatusFilter={handleStatusFilter}
        handleImportanceFilter={handleImportanceFilter}
        handleTasksFilter={handleTasksFilter}
        projects={projects}
      />
      {tasks.length > 0 ? (
        <TasksTable
          tasks={tasks}
          emergencyFilter={emergencyFilter}
          statusFilter={statusFilter}
          importanceFilter={importanceFilter}
        />
      ) : (
        <EmptyTaskState />
      )}
    </>
  )
}
