import * as yup from 'yup'

export const LoginValidation = yup.object({
    email: yup.string().email("Email invalide !").required("Adresse mail requis !"),
    motdepasse: yup.string().required("Mot de passe requis !")
})