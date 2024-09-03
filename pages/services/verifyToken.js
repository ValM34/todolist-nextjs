export async function verifyToken(token) {
  try {
    const response = await fetch("/api/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      throw new Error('Failed to verify token');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while verifying token:', error);
    throw error;
  }
}