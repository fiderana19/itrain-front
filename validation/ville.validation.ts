import * as yup from 'yup'

export const VilleValidation = yup.object({
    code_ville: yup.string().required("Code de la ville requis !"),
    nom_ville: yup.string().required("Nom de la ville requis !"),
    photo_ville: yup.string().required("Photo de la ville requis !")
})