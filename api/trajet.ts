import { BASE_API_URL } from "@/env";
import axiosAuthInstance, { axiosInstance } from "./Config";
import { EditTrajetType } from "@/types/trajet.type";

const TRAJET_API_URL = `${BASE_API_URL}/trajet`;

export const getAllTrajet = async () => {
    return await axiosAuthInstance.get(`${TRAJET_API_URL}/all`);
}

export const getTrajetById = async (id: any) => {
    return await axiosAuthInstance.get(`${TRAJET_API_URL}/get/${id}`);
}

export const searchTrajet = async (data: any) => {
    return await axiosInstance.post(`${TRAJET_API_URL}/search`, data);
}

export const postTrajet = async (data: any) => {
    return await axiosAuthInstance.post(`${TRAJET_API_URL}/create`, data);
}

export const deleteTrajet = async (id: any) => {
    return await axiosAuthInstance.delete(`${TRAJET_API_URL}/delete/${id}`);
}

export const editTrajet = async (data: EditTrajetType) => {
    return await axiosAuthInstance.patch(`${TRAJET_API_URL}/edit/${data?.trajet_id}`, data);
}