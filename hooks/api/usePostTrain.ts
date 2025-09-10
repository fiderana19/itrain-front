import { useMutation } from "@tanstack/react-query";
import { postTrain } from "@/api/train";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function usePostTrain ({action} : {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: any) => postTrain(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Nouveau train",
                message: "Nouveau train ajouté !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Nouveau train",
                message: "Erreur lors de l'ajout du nouveau train !"
            })
        }
    })

    return mutation;
}