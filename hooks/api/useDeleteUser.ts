import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/api/user";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useDeleteUser({ action }: { action: () => void }) {
  const mutation = useMutation({
    mutationFn: (id: any) => deleteUser(id),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        title: "Suppression",
        message: "Utilisateur supprimé !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Suppression",
        message: "Erreur lors de la suppression de l'utilisateur !",
      });
    },
  });

  return mutation;
}
