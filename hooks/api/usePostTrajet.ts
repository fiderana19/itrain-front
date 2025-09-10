import { postTrajet } from "@/api/trajet";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function usePostTrajet ({action}: {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: any) => postTrajet(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Nouveau trajet",
                message: "Trajet ajouté !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Nouveau trajet",
                message: "Erreur lors de l'ajout du trajet !"
            })
        }
    })

    return mutation;
}