import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { getVilleById } from "../../api/ville";

export default function useGetVilleById(id: any) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERYCACHEKEY.VILLES, id],
    queryFn: () => getVilleById(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation de la ville !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
}
