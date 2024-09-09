import { getJwt } from "../../../utils/jwt";

export async function createProject(project) {
  try {
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('An error occurred while creating project:', error);
    throw error;
  }
}

export async function fetchProjectsByUser() {
  try {
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('An error occurred while fetching projects:', error);
    throw error;
  }
}

export async function deleteProject(projectId) {
  try {
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(projectId),
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while deleting project:', error);
    throw error;
  }
}
