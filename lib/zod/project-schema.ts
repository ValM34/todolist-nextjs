import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne doit pas contenir plus de 100 caractères'),
  description: z.string().max(500, "La description ne doit pas contenir plus de 500 caractères"),
});

export const updateProjectSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne doit pas contenir plus de 100 caractères'),
  description: z.string().max(500, "La description ne doit pas contenir plus de 500 caractères"),
});
