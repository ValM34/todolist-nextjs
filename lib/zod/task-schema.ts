import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne doit pas contenir plus de 100 caractères'),
  description: z.string().max(500, "La description ne doit pas contenir plus de 500 caractères"),
  completed: z.enum(['A faire', 'En cours', 'Terminée']),
  emergency: z.enum(['Faible', 'Moyenne', 'Forte']),
  importance: z.enum(['Faible', 'Moyenne', 'Forte']),
  project: z.string(),
  user: z.string(),
});


export const updateTaskSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne doit pas contenir plus de 100 caractères'),
  description: z.string().max(500, "La description ne doit pas contenir plus de 500 caractères"),
  completed: z.enum(['A faire', 'En cours', 'Terminée']),
  emergency: z.enum(['Faible', 'Moyenne', 'Forte']),
  importance: z.enum(['Faible', 'Moyenne', 'Forte']),
  project: z.string(),
  user: z.string(),
});
