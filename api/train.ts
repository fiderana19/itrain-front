import { BASE_API_URL } from "@/env";
import axiosAuthInstance from "./Config";

const TRAIN_API_URL = `${BASE_API_URL}/train`;

export const getAllTrain = async () => {
    return await axiosAuthInstance.get(`${TRAIN_API_URL}/all`);
}

export const getTrainById = async (id: any) => {
    return await axiosAuthInstance.get(`${TRAIN_API_URL}/get/${id}`);
}

export const postTrain = async (data: any) => {
    return await axiosAuthInstance.post(`${TRAIN_API_URL}/create`, data);
}

export const deleteTrain = async (id: any) => {
    return await axiosAuthInstance.delete(`${TRAIN_API_URL}/delete/${id}`);
}

export const editTrain = async (id: any, data: any) => {
    return await axiosAuthInstance.patch(`${TRAIN_API_URL}/edit/${id}`, data);
}