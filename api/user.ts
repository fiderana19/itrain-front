import { BASE_API_URL } from "@/env";
import axiosAuthInstance, { axiosInstance } from "./Config";

const USER_API_URL = `${BASE_API_URL}/user`;

export const userLogin = async (email: any, motdepasse: any) => {
    return await axiosInstance.post(`${USER_API_URL}/login`, {email, motdepasse});
}

export const userSignup = async (data: any) => {
    return await axiosInstance.post(`${USER_API_URL}/signup`, data);
}

export const getAllUser = async () => {
    return await axiosAuthInstance.get(`${USER_API_URL}/all`);
}

export const getUserById = async (id: any) => {
    return await axiosAuthInstance.get(`${USER_API_URL}/get/${id}`);
}

export const deleteUser = async (id: any) => {
    return await axiosAuthInstance.delete(`${USER_API_URL}/delete/${id}`);
}

export const editUser = async (id: any, data: any) => {
    return await axiosAuthInstance.patch(`${USER_API_URL}/edit/${id}`, data);
}