import * as React from "react";
import instance from "@/config/axios.config";
import { useRouter } from "next/router";

export type AuthData = {
  id: string;
  role: "admin" | "SC";
  email: string;
  name: string;
};

const AuthContext = React.createContext<{
  user: AuthData | null;
  isLoading: boolean;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>;
}>({
  user: null,
  isLoading: true,
  setAuthData: () => {},
});

export function useAuth() {
  const router = useRouter();
  const [authData, setAuthData] = React.useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeAuth = async () => {
      instance
        .get("/users/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          if (res.data) {
            setAuthData(res.data);
          } else {
            router.push("/auth/login");
          }
          setIsLoading(false);
        });
    };
    initializeAuth();
  }, []);

  return { authData, isLoading, setAuthData };
}
