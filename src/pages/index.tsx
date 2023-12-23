import Loading from "@/components/atoms/loading";
import DashboardLayout from "@/components/layout";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { authData, isLoading } = useAuth();
  return isLoading ? (
    <Loading />
  ) : (
    <DashboardLayout header sidebar user={authData}>
      <h1>Go to Purchase Dashboard</h1>
    </DashboardLayout>
  );
}
