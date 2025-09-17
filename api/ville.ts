import { BASE_API_URL } from "@/env";
import axiosAuthInstance from "./Config";
import { CreateVilleType, EditVilleType } from "@/types/ville.type";

const VILLE_API_URL = `${BASE_API_URL}/ville`;

export const getAllVille = async () => {
    return await axiosAuthInstance.get(`${VILLE_API_URL}/all`);
}

export const getVilleById = async (id: string) => {
    return await axiosAuthInstance.get(`${VILLE_API_URL}/get/${id}`);
}

export const postVille = async (data: CreateVilleType) => {
    return await axiosAuthInstance.post(`${VILLE_API_URL}/create`, data);
}

export const deleteVille = async (id: string) => {
    return await axiosAuthInstance.delete(`${VILLE_API_URL}/delete/${id}`);
}

export const editVille = async (data: EditVilleType) => {
    return await axiosAuthInstance.patch(`${VILLE_API_URL}/edit/${data?.code_ville}`, data);
}