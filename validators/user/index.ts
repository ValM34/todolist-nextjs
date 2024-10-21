import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne doit pas contenir plus de 50 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, 'Le nom ne doit pas contenir plus de 100 caractères'),
});
