import DashboardLayout from "@/components/layout";
import { MdAdd } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { RiAlarmWarningFill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { authData } = useAuth();
  return (
    <DashboardLayout user={authData} header sidebar>
      <h1>Purchase Dashboard</h1>
    </DashboardLayout>
  );
}
