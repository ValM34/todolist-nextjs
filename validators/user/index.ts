import * as Yup from 'yup';

export const updateUserSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne doit pas contenir plus de 50 caractères'),
  lastName: Yup.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, 'Le nom ne doit pas contenir plus de 100 caractères'),
});
