export async function signOutUser() {
  try {
    const response = await fetch("/api/users/signout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error('Failed to sign out user');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while signing out user:', error);
    throw error;
  }
}