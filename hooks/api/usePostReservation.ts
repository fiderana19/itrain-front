import { postReservation } from "@/api/reservation";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function usePostReservation({ action }: { action: () => void }) {
  const mutation = useMutation({
    mutationFn: (data: any) => postReservation(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        title: "Nouvelle reservation",
        message: "Reservation ajoutée !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Nouvelle reservation",
        message: "Erreur lors de l'ajout de la reservation !",
      });
    },
  });

  return mutation;
}
