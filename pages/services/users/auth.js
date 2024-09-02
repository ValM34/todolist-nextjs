export async function authUser(data) {
  try {
    const response = await fetch("/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to authenticate user');
    }
    const res = await response.json();

    return res;
  } catch (error) {
    console.error('An error occurred while authenticating user:', error);
    throw error;
  }
}