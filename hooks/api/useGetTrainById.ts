import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { getTrainById } from "@/api/train";

export default function useGetTrainById(id: any) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERYCACHEKEY.TRAINS, id],
    queryFn: () => getTrainById(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation du train !",
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
}
