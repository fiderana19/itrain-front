import * as yup from 'yup'

export const SearchTrajetValidation = yup.object({
    depart: yup.string().required("Gare de depart requis !"),
    arrive: yup.string().required("Gare d'arrivé requis !"),
    date: yup.string().required("Date requis !"),
})