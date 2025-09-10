import { editReservation } from "@/api/reservation";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useEditReservation ({action}: {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: any) => editReservation(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Modification d'une reservation",
                message: "Reservation modifiée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Modification d'une reservation",
                message: "Erreur lors de la modification de la reservation !"
            })
        }
    })

    return mutation;
}