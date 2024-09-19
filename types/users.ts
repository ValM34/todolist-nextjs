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

interface NewUserValidation {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface UpdateUser {
  firstName: string;
  lastName: string;
}

interface UpdateUserValidation {
  firstName: string | undefined;
  lastName: string | undefined;
}

interface AuthUser {
  email: string;
  password: string;
}

interface AuthUserValidation {
  email: string | undefined;
  password: string | undefined;
}
