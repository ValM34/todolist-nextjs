import { create } from 'zustand'
import { deleteProject, updateProject } from '@/infrastructure/repositories/project-repository'

type State = {
  projects: Project[] | undefined;
}

type Action = {
  setProjects: (projects: Project[]) => void;
  deleteProject: (projectId: string) => void;
  updateProject: (project: Project) => void;
  // fetchProjects: (email: string) => void;
}


const initialState: State = {
  projects: undefined,
}


const useProjectsStore = create<State & Action>((set) => ({
  ...initialState,
  setProjects: (projects) => set(() => ({ projects })),
  deleteProject: async (projectId) => {
    await deleteProject(projectId);
    set((state) => ({ projects: state.projects?.filter((project) => project.id !== projectId) }));
  },
  updateProject: async (project) => {
    await updateProject(project);
    set((state) => ({ projects: state.projects?.map((p) => p.id === project.id ? project : p) }))
  },
}))

export default useProjectsStore;