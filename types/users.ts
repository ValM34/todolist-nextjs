

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  projects: string[];
  tasks: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface NewUserValidation {
  firstName?: string ;
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
