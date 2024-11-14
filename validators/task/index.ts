import { z } from 'zod';
import * as Yup from 'yup';

export const createTaskSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne doit pas contenir plus de 100 caractères'),
  description: Yup.string().max(500, "La description ne doit pas contenir plus de 500 caractères"),
  status: Yup.mixed().oneOf(['OPEN', 'IN_PROGRESS', 'DONE']),
  emergency: Yup.mixed().oneOf(['LOW', 'AVERAGE', 'HIGHT']),
  importance: Yup.mixed().oneOf(['LOW', 'AVERAGE', 'HIGHT']),
  projectId: Yup.string(),
});

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre ne doit pas contenir plus de 100 caractères'),
  description: z.string().max(500, "La description ne doit pas contenir plus de 500 caractères"),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']),
  emergency: z.enum(['LOW', 'AVERAGE', 'HIGHT']),
  importance: z.enum(['LOW', 'AVERAGE', 'HIGHT']),
  projectId: z.string(),
});
