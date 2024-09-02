export async function createUser(user) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('An error occurred while creating user:', error);
    throw error;
  }
}