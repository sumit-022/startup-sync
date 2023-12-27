import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import Loading from "../atoms/loading";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;
  return <>{children}</>;
}
