export async function signOutUser() {
  try {
    const response = await fetch("/api/users/sign-out", {
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