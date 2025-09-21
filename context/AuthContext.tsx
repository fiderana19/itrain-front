import { userLogin } from "@/api/user";
import { HTTP_STATUS } from "@/constants/HttpStatus";
import { TOAST_TYPE } from "@/constants/Toast_type";
import showToast from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  token?: string | null;
  isAuthenticated?: boolean;
  login: (data: any) => Promise<any>;
  logout: () => Promise<any>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getToken() {
      const t = await AsyncStorage.getItem("token");
      setToken(t);
      const is = !!t;
      setIsAuthenticated(is);
    }
    getToken();
  }, []);

  const login = async (data: any) => {
    const response = await userLogin(data);
    if (
      response?.status === HTTP_STATUS.OK ||
      response?.status === HTTP_STATUS.CREATED
    ) {
      const data = response?.data.token;

      setToken(data);
      AsyncStorage.setItem("token", data);

      const decodedToken = JSON.parse(atob(data.split(".")[1]));
      if (decodedToken.role === "admin") {
        router.replace("/adminhome");
      } else {
        router.replace("/clienthome");
      }
    } else {
      showToast({
        type: TOAST_TYPE.ERROR,
        title: "Erreur",
        message: "Erreur de la connexion !",
      });
    }
  };

  const logout = async () => {
    setToken(null);
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of a AuthProvider");
  }
  return context;
}
