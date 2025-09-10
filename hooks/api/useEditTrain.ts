import { useMutation } from "@tanstack/react-query";
import { editTrain } from "@/api/train";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useEditTrain ({action} : {action: () => void}) {
    const mutation = useMutation({
        mutationFn: (data: any) => editTrain(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                title: "Modification d'un train",
                message: "Train modifié !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Modification d'un train",
                message: "Erreur lors de la modification du train !"
            })
        }
    })

    return mutation;
}