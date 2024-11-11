'use client'


import useProjectsStore from '@/stores/project-store'
import { useEffect } from 'react'
import { getUser } from '@/utils/auth'
import { findProjectsBy } from '@/infrastructure/repositories/project-repository'

export default function Layout({ children }: { children: React.ReactNode }) {

  const { projects, setProjects } = useProjectsStore()

  const initProjects = async () => {
    try {
      const email = (await getUser())!.email;
      const projects = await findProjectsBy([{ userFk: email }]);
      if (!projects) throw new Error('Projects not found');
      console.log(projects);
      setProjects(projects);
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log('layout');
    if (projects) return;
    console.log('refetch layout');
    initProjects();
  }, [projects]);

  return children;
}