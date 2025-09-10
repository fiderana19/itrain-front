import { deleteReservation } from "@/api/reservation";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteReservation ({action}: {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (id: any) => deleteReservation(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Suppression d'une reservation",
                message: "Reservation supprimée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Suppression d'une reservation",
                message: "Erreur lors de la suppression de la reservation !"
            })
        }
    })

    return mutation;
}