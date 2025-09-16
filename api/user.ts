import { BASE_API_URL } from "@/env";
import axiosAuthInstance, { axiosInstance } from "./Config";
import { LoginUserType, SignupUserType } from "@/types/user.type";

const USER_API_URL = `${BASE_API_URL}/user`;

export const userLogin = async (data: LoginUserType) => {
    return await axiosInstance.post(`${USER_API_URL}/login`, data);
}

export const userSignup = async (data: SignupUserType) => {
    return await axiosInstance.post(`${USER_API_URL}/signup`, data);
}

export const getAllUser = async () => {
    return await axiosAuthInstance.get(`${USER_API_URL}/all`);
}

export const getUserById = async (id: string) => {
    return await axiosAuthInstance.get(`${USER_API_URL}/get/${id}`);
}

export const deleteUser = async (id: string) => {
    return await axiosAuthInstance.delete(`${USER_API_URL}/delete/${id}`);
}

export const editUser = async (data: any) => {
    return await axiosAuthInstance.patch(`${USER_API_URL}/edit/${data?.id}`, data);
}