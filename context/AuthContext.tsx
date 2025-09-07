import { userLogin } from "@/api/user";
import { HTTP_STATUS } from "@/constants/HttpStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextProps = {
    token?: string |null;
    isAuthenticated?: boolean;
    login: (email: any, motdepasse: any) => Promise<any>;
    logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [token, setToken] = useState<any>(
        AsyncStorage.getItem('token')
    )

    const router = useRouter();
    const isAuthenticated = !!token;
    
    const login = async (email: any, motdepasse: any) => {
        const response = await userLogin(email, motdepasse);
        if(response?.status === HTTP_STATUS.OK || response?.status === HTTP_STATUS.CREATED) {
            const data = response?.data.token;

            setToken(data);
            AsyncStorage.setItem('token', data);

            const decodedToken = JSON.parse(atob(data.split('.')[1]));
            if(decodedToken.role === "admin") {
                router.replace("/authhome")
            } else {
                router.replace('/signedhome')
            }
        } else {
            console.log("erreur")
        }
    }
    
    const logout = async () => {
        setToken(null);
        localStorage.removeItem('token');
        router.replace('/')
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be inside of a AuthProvider");
    }
    return context;
}