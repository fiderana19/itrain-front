import { useMutation } from "@tanstack/react-query"
import { editUser } from "@/api/user"
import showToast from "@/utils/toast"
import { TOAST_TYPE } from "@/constants/Toast_type"

export default function useEditUser ({action} : {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: any) => editUser(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Modification",
                message: "Utilisateur modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Modification",
                message: "Erreur lors de la modification de l'utilisateur !"
            })
        }
    })

    return mutation;
}