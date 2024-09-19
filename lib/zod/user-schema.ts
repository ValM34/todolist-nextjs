import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne doit pas contenir plus de 50 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, 'Le nom ne doit pas contenir plus de 100 caractères'),
  email: z.string().email('L\'email doit être valide'),
  password: z.string().min(10, 'Le mot de passe doit contenir au moins 10 caractères').max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères'),
  confirmPassword: z.string().min(10, 'Le mot de passe doit contenir au moins 10 caractères').max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères'),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne doit pas contenir plus de 50 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, 'Le nom ne doit pas contenir plus de 100 caractères'),
});

export const loginSchema = z.object({
  email: z.string().email('L\'email doit être valide'),
  password: z.string().min(10, 'Le mot de passe doit contenir au moins 10 caractères').max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères'),
});
