import { z } from 'zod'
import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("L'email doit être valide")
    .required('L\'email est requis'),
  password: Yup
    .string()
    .min(10, 'Le mot de passe doit contenir au moins 10 caractères')
    .max(100, 'Le mot de passe ne doit pas contenir plus de 100 caractères'),
});
