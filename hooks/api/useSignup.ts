import { userSignup } from "@/api/user";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { SignupUserType } from "@/types/user.type";
import showToast from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useSignup({ action }: { action: () => void }) {
  const mutation = useMutation({
    mutationFn: (data: SignupUserType) => userSignup(data),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        title: "Inscription",
        message: "Inscription réussie !",
      });
    },
    onError: () => {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Inscription",
        message: "Erreur lors de l'inscription !",
      });
    },
  });

  return mutation;
}
