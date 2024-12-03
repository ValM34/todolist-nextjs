import React from 'react'
import { TaskListContent } from '@/components/projects-table'
import { cookies } from 'next/headers';
import { getUser } from '@/utils/auth';


export default async function TasksList() {
  const email = (await getUser())!.email;
  const data = await fetch(`http://localhost:3000/api/projects`, {
    headers: {
      'x-email': email
    },
    cache: 'force-cache',
    next: {
      tags: ['projects']
    }
  }).then(res => res.json())

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Mes listes de tâches
      </h1>
      <TaskListContent projects={data} initTasks={[]} />
    </>
  )
}
