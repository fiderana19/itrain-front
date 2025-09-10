import { useQuery } from "@tanstack/react-query";
import { QUERYCACHEKEY } from "./QueryCacheKey";
import { getReservationById } from "@/api/reservation";
import { useEffect } from "react";
import showToast from "@/utils/toast";
import { TOAST_TYPE } from "@/constants/Toast_type";

export default function useGetReservationById (id: any) {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: [QUERYCACHEKEY.RESERVATIONS, id],
        queryFn: () => getReservationById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                title: "Erreur",
                message: "Erreur lors de la recuperation de la reservation !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}