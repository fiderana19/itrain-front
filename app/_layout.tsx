import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "../context/AuthContext";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StackLayout />
        <ReactQueryDevtools />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const StackLayout = () => {
  const { isAuthenticated, token } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAdminGroup = segments[0] === "(admin)";
    const inClientGroup = segments[1] === "(client)";

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.role === "admin" && isAuthenticated && inAdminGroup) {
        router.replace("/adminhome");
      } else if (
        decodedToken.role === "client" &&
        isAuthenticated &&
        inClientGroup
      ) {
        router.replace("/clienthome");
      }
    } else {
      router.replace("/home");
    }
  }, [token, isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(visitor)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(client)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
};
