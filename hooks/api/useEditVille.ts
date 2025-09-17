import { useMutation } from "@tanstack/react-query";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { editVille } from "@/api/ville";
import { EditVilleType } from "@/types/ville.type";

export default function useEditVile ({action} : {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: EditVilleType) => editVille(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Modification d'une ville",
                message: "Ville modifiée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Modification d'une ville",
                message: "Erreur lors de la modification de la ville !"
            })
        }
    })

    return mutation;
}