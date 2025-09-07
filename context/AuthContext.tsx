import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextProps = {
    token?: string |null;
    isAuthenticated?: boolean;
    login: (data: any) => Promise<any>;
    logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps |undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    )
    const router = useRouter();
    const isAuthenticated = !!token;
    
    const login = async (data: any) => {
        const response = null;
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
    return useAuth;
}