import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { getAllReservation } from "@/api/reservation";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useGetAllReservation () {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: [QUERYCACHEKEY.RESERVATIONS],
        queryFn: () => getAllReservation(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Erreur",
                message: "Erreur lors de la recuperation des reservations !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}