import { useMutation } from "@tanstack/react-query";
import { editUser, userLogin } from "@/api/user";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useLogin() {
  const mutation = useMutation({
    mutationFn: (data: any) => userLogin(data),
    onSuccess: () => {},
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Connexion",
        message: "Erreur lors de la connexion de l'utilisateur !",
      });
    },
  });

  return mutation;
}
