import * as yup from 'yup'

export const SearchTrajetValidation = yup.object({
    depart: yup.string().required("Gare de depart requis !"),
    arrive: yup.string().required("Gare d'arrivé requis !"),
    date: yup.string().required("Date requis !"),
})

export const CreateTrajetValidation = yup.object({
    date_trajet: yup.string().required("Date du trajet requis !"),
    gare_depart: yup.string().required("Gare de depart requis !"),
    gare_arrive: yup.string().required("Gare d'arrivé requis !"),
    duree_trajet: yup.string().required("Durée du trajet requis !"),
    heure_depart: yup.string().required("Heure de depart requis !"),
    heure_arrive: yup.string().required("Heure de depart requis !"),
    billet: yup.string().required("Prix du billet requis !"),
    train_id: yup.string().required("Train requis !"),
})

export const EditTrajetValidation = yup.object({
    trajet_id: yup.string().required("Trajet requis !"),
    date_trajet: yup.string().required("Date du trajet requis !"),
    gare_depart: yup.string().required("Gare de depart requis !"),
    gare_arrive: yup.string().required("Gare d'arrivé requis !"),
    duree_trajet: yup.string().required("Durée du trajet requis !"),
    heure_depart: yup.string().required("Heure de depart requis !"),
    heure_arrive: yup.string().required("Heure de depart requis !"),
    billet: yup.string().required("Prix du billet requis !"),
    train_id: yup.string().required("Train requis !"),
})