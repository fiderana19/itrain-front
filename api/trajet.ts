import { BASE_API_URL } from "@/env";
import axiosAuthInstance from "./Config";

const TRAJET_API_URL = `${BASE_API_URL}/trajet`;

export const getAllTrajet = async () => {
    return await axiosAuthInstance.get(`${TRAJET_API_URL}/trajet`);
}