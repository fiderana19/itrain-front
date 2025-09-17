import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";
import { getAllVille } from "@/api/ville";

export default function useGetAllVille () {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: [QUERYCACHEKEY.VILLES],
        queryFn: () => getAllVille(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Erreur",
                message: "Erreur lors de la recuperation des villes !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}