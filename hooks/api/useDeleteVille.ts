import { useMutation } from "@tanstack/react-query";
import { deleteVille } from "@/api/ville";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useDeleteVille ({action} : {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (id: any) => deleteVille(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Suppression d'une ville",
                message: "Ville supprimée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Suppression d'une ville",
                message: "Erreur lors de la suppression de la ville !"
            })
        }
    })

    return mutation;
}