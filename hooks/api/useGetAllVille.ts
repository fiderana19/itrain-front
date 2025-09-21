import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { useEffect, useState } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { getAllVille } from "@/api/ville";

export default function useGetAllVille() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERYCACHEKEY.VILLES],
    queryFn: () => getAllVille(),
    staleTime: Infinity,
  });
  const [data2search, setData2Search] = useState<any>([]);

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur lors de la recuperation des villes !",
      });
    }
  }, [error]);

  useEffect(() => {
    if (data2search?.length === 0) {
      data &&
        data?.data.map((ville: any) =>
          setData2Search((prev: any) => [
            ...prev,
            {
              key: ville?.code_ville,
              value: `${ville?.code_ville} ${ville?.nom_ville}`,
            },
          ]),
        );
    }
  }, [data?.data]);

  return {
    data: data?.data,
    data2search,
    isLoading,
    refetch,
  };
}
