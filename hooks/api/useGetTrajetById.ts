import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { getAllTrajet, getTrajetById } from "@/api/trajet";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useGetTrajetById(id: any) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERYCACHEKEY.TRAJETS, id],
    queryFn: () => getTrajetById(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation du trajet !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
}
