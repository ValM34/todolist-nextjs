export async function getTokenPayload(token) {
  try {
    const response = await fetch("/api/get-token-payload", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
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
