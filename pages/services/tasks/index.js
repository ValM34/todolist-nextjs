export async function fetchTasksByProjectId(projectId) {
  try {
    const response = await fetch("/api/tasks/" + projectId);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('An error occurred while fetching tasks:', error);
    throw error;
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

export async function fetchTaskById(taskId) {
  try {
    const response = await fetch("/api/tasks/one/" + taskId);
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('An error occurred while fetching task:', error);
    throw error;
  }
}

export async function updateTask(task, token) {
  try {
    const response = await fetch("/api/tasks/one/" + task._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while updating task:', error);
    throw error;
  }
}