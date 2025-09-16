import * as yup from 'yup'

export const LoginValidation = yup.object({
    email: yup.string().email("Email invalide !").required("Adresse mail requis !"),
    motdepasse: yup.string().required("Mot de passe requis !")
})

export const SignupValidation = yup.object({
    nom: yup.string().required("Nom requis !"),
    email: yup.string().email("Email invalide !").required("Adresse mail requis !"),
    telephone: yup.string().required("Telephone requis !"),
    motdepasse: yup.string().required("Mot de passe requis !")
})