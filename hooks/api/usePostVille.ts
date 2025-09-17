import { useMutation } from "@tanstack/react-query";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { postVille } from "@/api/ville";
import { CreateVilleType } from "@/types/ville.type";

export default function usePostVille ({action} : {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: CreateVilleType) => postVille(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Nouvelle ville",
                message: "Nouvelle ville ajoutée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Nouvelle ville",
                message: "Erreur lors de l'ajout de la nouvelle ville !"
            })
        }
    })

    return mutation;
}