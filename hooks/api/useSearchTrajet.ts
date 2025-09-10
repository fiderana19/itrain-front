import { searchTrajet } from "@/api/trajet";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useSearchTrajet () {
    const mutation = useMutation({
        mutationFn: (data: any) => searchTrajet(data),
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Recherche de trajet",
                message: "Erreur lors de la recherche de trajet !"
            })
        }
    })

    return mutation;
}