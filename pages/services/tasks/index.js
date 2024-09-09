export async function fetchTasksByProjectId(projectId) {
  try {
    const response = await fetch("/api/tasks/" + projectId); // Attend la réponse de l'API
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json(); // Convertit la réponse en JSON
    return data.data; // Retourne les données sous la clé `data`
  } catch (error) {
    console.error('An error occurred while fetching tasks:', error);
    throw error; // Propager l'erreur pour que l'appelant puisse la gérer
  }
}

export async function createTask(task, token) {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while creating task:', error);
    throw error;
  }
}