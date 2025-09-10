import { BASE_API_URL } from "@/env"
import axiosAuthInstance from "./Config"

const RESERVATION_API_URL = `${BASE_API_URL}/reservation`;

export const getAllReservation = async () => {
    return await axiosAuthInstance.get(`${RESERVATION_API_URL}/all`);
}

export const getReservationById = async (id: any) => {
    return await axiosAuthInstance.get(`${RESERVATION_API_URL}/get/${id}`);
}

export const getReservationByBilletId = async (id: any) => {
    return await axiosAuthInstance.get(`${RESERVATION_API_URL}/billet/${id}`);
}

export const postReservation = async (data: any) => {
    return await axiosAuthInstance.post(`${RESERVATION_API_URL}/create`, data);
}

export const deleteReservation = async (id: any) => {
    return await axiosAuthInstance.delete(`${RESERVATION_API_URL}/delete/${id}`);
}

export const editReservation = async (data: any) => {
    return await axiosAuthInstance.patch(`${RESERVATION_API_URL}/edit/${data.id}`, data);
}