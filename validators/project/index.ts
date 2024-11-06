import * as Yup from 'yup'

export const addProjectSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne doit pas contenir plus de 100 caractères')
    .required('Le titre est requis'),
  description: Yup.string()
    .min(3, 'La description doit contenir au moins 3 caractères')
    .max(500, 'La description ne doit pas contenir plus de 500 caractères')
})

export const updateProjectSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne doit pas contenir plus de 100 caractères')
    .required('Le titre est requis'),
  description: Yup.string()
    .min(3, 'La description doit contenir au moins 3 caractères')
    .max(500, 'La description ne doit pas contenir plus de 500 caractères')
})