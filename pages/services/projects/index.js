export async function createProject(project) {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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