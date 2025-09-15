import * as yup from 'yup'

export const CreateTrainValidation = yup.object({
    numero_train: yup.string().required("Numero du train requis !"),
    capacite: yup.string().required("Capacite maximal requis !"),
    classe: yup.string().required("Classe du train requis !"),
})

export const EditTrainValidation = yup.object({
    train_id: yup.string().required("Id du train requis !"),
    numero_train: yup.string().required("Numero du train requis !"),
    capacite: yup.string().required("Capacite maximal requis !"),
    classe: yup.string().required("Classe du train requis !"),
})