import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { getAllTrajet } from "@/api/trajet";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useGetAllTrajet() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERYCACHEKEY.TRAJETS],
    queryFn: () => getAllTrajet(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation des trajets !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
}
