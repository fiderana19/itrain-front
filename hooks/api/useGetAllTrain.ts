import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { useEffect, useState } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { getAllTrain } from "@/api/train";

export default function useGetAllTrain() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERYCACHEKEY.TRAINS],
    queryFn: () => getAllTrain(),
    staleTime: Infinity,
  });

  const [data2search, setData2Search] = useState<any>([]);

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation des trains !",
      });
    }
  }, [error]);

  useEffect(() => {
    if (data2search?.length === 0) {
      data &&
        data?.data.map((train: any) =>
          setData2Search((prev: any) => [
            ...prev,
            {
              key: train?.train_id,
              value: `${train?.numero_train} - ${train?.capacite} places - ${train?.classe}`,
            },
          ]),
        );
    }
  }, [data?.data]);

  return {
    data: data?.data,
    train4select: data2search,
    isLoading,
    refetch,
  };
}
