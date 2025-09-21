import { useMutation } from "@tanstack/react-query";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { deleteTrain } from "@/api/train";

export default function useDeleteTrain({ action }: { action: () => void }) {
  const mutation = useMutation({
    mutationFn: (id: any) => deleteTrain(id),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        title: "Suppression d'un train",
        message: "Train supprimé !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Suppression d'un train",
        message: "Erreur lors de la suppression du train !",
      });
    },
  });

  return mutation;
}
