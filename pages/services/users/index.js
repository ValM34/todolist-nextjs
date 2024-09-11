import { getJwt } from "../../../utils/jwt";

export async function getUser() {
  const token = getJwt();
  if(!token) return;
  try {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('An error occurred while getting user:', error);
    throw error;
  }
}

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

export async function updateUser(user) {
  const token = getJwt();
  if(!token) return;

  const filteredUser = Object.fromEntries(
    Object.entries(user).filter(([key, value]) => value !== null)
  );
  
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(filteredUser),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('An error occurred while updating user:', error);
    throw error;
  }
}