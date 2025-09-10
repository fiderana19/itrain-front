import { deleteTrajet, postTrajet } from "@/api/trajet";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteTrajet ({action}: {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (id: any) => deleteTrajet(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Suppression",
                message: "Trajet supprimé !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Suppression",
                message: "Erreur lors de la suppression du trajet !"
            })
        }
    })

    return mutation;
}