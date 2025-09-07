import { BASE_API_URL } from "@/env";
import axiosAuthInstance from "./Config";

const USER_API_URL = `${BASE_API_URL}/user`;

export const getAllUser = async () => {
    return await axiosAuthInstance.get(`${USER_API_URL}/user`)
}