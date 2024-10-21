import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('L\'email doit être valide'),
    password: z.string().min(10, 'Le mot de passe doit contenir au moins 10 caractères').max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères'),
});
