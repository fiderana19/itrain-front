import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { getAllUser } from "@/api/user";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useGetAllUser() {
  const { data, isError, error, refetch, isLoading } = useQuery({
    queryKey: [QUERYCACHEKEY.USERS],
    queryFn: () => getAllUser(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation des utilisateurs !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
}
