import { BASE_API_URL } from "@/env";
import axiosAuthInstance from "./Config";

const TRAIN_API_URL = `${BASE_API_URL}/train`;

export const getAllTrain = async () => {
    return await axiosAuthInstance.get(`${TRAIN_API_URL}/get`);
}