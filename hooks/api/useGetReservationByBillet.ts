import { getReservationByBilletId } from "@/api/reservation";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERYCACHEKEY } from "./QueryCacheKey";

export default function useGetReservationByBillet (id: any) {
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: [QUERYCACHEKEY.RESERVATIONS, id],
        queryFn: () => getReservationByBilletId(id),
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
    };
}