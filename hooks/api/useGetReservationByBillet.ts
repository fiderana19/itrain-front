import { getReservationByBilletId } from "@/api/reservation";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useGetReservationByBillet () {
    const mutation = useMutation({
        mutationFn: (id: any) => getReservationByBilletId(id),
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Erreur",
                message: "Erreur lors de la recuperation de la reservation !"
            })
        }
    })

    return mutation;
}