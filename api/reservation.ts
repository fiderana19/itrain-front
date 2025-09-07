import { BASE_API_URL } from "@/env"
import axiosAuthInstance from "./Config"

const RESERVATION_API_URL = `${BASE_API_URL}/reservation`;

export const getAllReservation = async () => {
    return await axiosAuthInstance.get(`${RESERVATION_API_URL}/get`);
}