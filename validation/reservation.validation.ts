import * as yup from 'yup'

export const ReservationPlacingValidation = yup.object({
    date_reservation: yup.string().required("Date de reservation requis !"),
    nbr_place: yup.string().required("Nombre de place requis !"),
    utilisateur_id: yup.string().required("Utilisateur requis !"),
    trajet_id: yup.string().required("Trajet requis !"),
})