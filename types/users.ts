interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  projects: string[];
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UpdateUser {
  firstName: string | null;
  lastName: string | null;
}

interface AuthUser {
  email: string;
  password: string;
}
