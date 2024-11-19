'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import TasksTable from '@/app/(auth)/tasks-table'
import { findProjectsBy } from '@/infrastructure/repositories/project-repository'
import { findTasksBy } from '@/infrastructure/repositories/task-repository'
import Filters from '@/app/(auth)/filters'
import Link from 'next/link'
import LoadingSpinner from '@/components/animations/loading-spinner'
import { getUser } from '@/utils/auth'
import useProjectsStore from '@/stores/project-store'

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([])
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
  const { projects, setProjects } = useProjectsStore();
  const [loading, setLoading] = useState(true)

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
    (async () => {
      let projectsList: Project[] | undefined ;
      if(!projects) {
        try {
          const email = (await getUser())!.email
          projectsList = await findProjectsBy([{ userFk: email }])
        } catch (e) {
          console.error(e)
        }

        if (!projectsList || projectsList.length === 0) return setLoading(false)
        setProjects(projectsList);
      }

      const firstProjectId = projects?.[0].id

      try {
        const tasksList = await findTasksBy([{ projectId: firstProjectId }])
        if (!tasksList || tasksList.length === 0) throw new Error('Tasks not found')
        filterTasksByEmergencyAndImportance(tasksList)
      } catch (e) {
        console.error(e)
        setTasks([])
      }
      setLoading(false)
    })()
  }, [projects, setProjects])

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Mes listes de tâches
          </h1>
          {Array.isArray(projects) ? (
            <>
              <Filters
                handleEmergencyFilter={handleEmergencyFilter}
                handleStatusFilter={handleStatusFilter}
                handleImportanceFilter={handleImportanceFilter}
                handleTasksFilter={handleTasksFilter}
                projects={projects}
              />
              {Array.isArray(tasks) && tasks.length > 0 ? (
                <TasksTable
                  tasks={tasks}
                  emergencyFilter={emergencyFilter}
                  statusFilter={statusFilter}
                  importanceFilter={importanceFilter}
                />
              ) : (
                <div>
                  <div className="">
                    Vous n&apos;avez pas encore créé de tâche liée au projet
                    sélectionné. Il vous faut <b>créer une tâche</b>.
                  </div>
                  <Link
                    href="/tasks/new"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Cliquez ici pour ajouter une nouvelle tâche.
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="">
                Chaque tâche est liée à un projet. Vous n&apos;avez pas encore
                créé de projet. Il vous faut créer un projet pour pouvoir
                ajouter des tâches.
              </div>
              <Link
                href="/projects/new"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Cliquez ici pour ajouter un nouveau projet.
              </Link>
            </div>
          )}
        </>
      )}
    </>
  )
}
