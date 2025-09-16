import { editTrajet, postTrajet } from "@/api/trajet";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { EditTrajetType } from "@/types/trajet.type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useEditTrajet ({action}: {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: EditTrajetType) => editTrajet(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Modification d'un trajet",
                message: "Trajet modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Modification d'un trajet",
                message: "Erreur lors de la modification du trajet !"
            })
        }
    })

    return mutation;
}