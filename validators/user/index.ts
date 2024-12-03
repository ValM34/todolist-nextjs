import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne doit pas contenir plus de 50 caractères')
    .required('Champ requis'),
  lastName: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne doit pas contenir plus de 100 caractères')
    .required('Champ requis'),
});

export const loginSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("L'email doit être valide")
    .required('Champ requis'),
  password: Yup
    .string()
    .min(10, 'Le mot de passe doit contenir au moins 10 caractères')
    .max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères')
    .required('Champ requis'),
});

export const registerSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("L'email doit être valide")
    .required('Champ requis'),
  password: Yup
    .string()
    .min(10, 'Le mot de passe doit contenir au moins 10 caractères')
    .max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères')
    .required('Champ requis'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
  firstName: Yup
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne doit pas contenir plus de 50 caractères')
    .required('Champ requis'),
  lastName: Yup
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne doit pas contenir plus de 100 caractères')
    .required('Champ requis'),
});
