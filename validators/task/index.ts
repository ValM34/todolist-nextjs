import { z } from 'zod';
import * as Yup from 'yup';

export const createTaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne doit pas contenir plus de 100 caractères')
    .required('Champ requis'),
  description: Yup.string().max(
    500,
    'La description ne doit pas contenir plus de 500 caractères'
  ),
  status: Yup.mixed()
    .oneOf(['OPEN', 'IN_PROGRESS', 'DONE'])
    .required('Champ requis'),
  emergency: Yup.mixed()
    .oneOf(['LOW', 'AVERAGE', 'HIGHT'])
    .required('Champ requis'),
  importance: Yup.mixed()
    .oneOf(['LOW', 'AVERAGE', 'HIGHT'])
    .required('Champ requis'),
  projectId: Yup.string().required('Champ requis'),
});

export const updateTaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne doit pas contenir plus de 100 caractères')
    .required('Champ requis'),
  description: Yup.string().max(
    500,
    'La description ne doit pas contenir plus de 500 caractères'
  ),
  status: Yup.mixed()
    .oneOf(['OPEN', 'IN_PROGRESS', 'DONE'])
    .required('Champ requis'),
  emergency: Yup.mixed()
    .oneOf(['LOW', 'AVERAGE', 'HIGHT'])
    .required('Champ requis'),
  importance: Yup.mixed()
    .oneOf(['LOW', 'AVERAGE', 'HIGHT'])
    .required('Champ requis'),
  projectId: Yup.string().required('Champ requis'),
});
