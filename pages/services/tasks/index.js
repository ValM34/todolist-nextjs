import { getJwt } from "../../../utils/jwt";

export async function fetchTasksByProjectId(projectId) {
  try {
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/tasks/tasks-by-project-id/" + projectId, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
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

export async function createTask(task) {
  try {
    const token = getJwt();
    if(!token) return;
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
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/tasks/" + taskId, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
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

export async function updateTask(task) {
  try {
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/tasks/" + task._id, {
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

export async function deleteTask(taskId) {
  try {
    const token = getJwt();
    if(!token) return;
    const response = await fetch("/api/tasks/" + taskId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while deleting task:', error);
    throw error;
  }
}
