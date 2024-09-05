import MainLayout from "../../components/layouts/mainLayout";
import { fetchProjectsByUser } from "../services/projects";
import { useEffect, useState } from "react";

interface Project {
  _id: string,
  title: string,
  description: string,
  user: string,
  updatedAt: string,
  createdAt: string,
}

interface Projects {
  projects: Project[]
}

export default function Projects() {
  const [projects, setProjects] = useState<Project | null>(null);
  useEffect(() => {
    let storedUser : any | null = localStorage.getItem('user');
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      (async () => {
        const projectsList = await fetchProjectsByUser(storedUser.token);
        if(projectsList && projects === null){
          setProjects(projectsList);
        }
      })();
    }
  })

  return (
    <MainLayout>
      {
        Array.isArray(projects) ? (
          projects.map((project: Project) => (
            <div key={project._id}>
              <h1>{project.title}</h1>
            </div>
          ))
        ) : (
          <div>No projects found</div>
        )
      }
    </MainLayout>
  )
}