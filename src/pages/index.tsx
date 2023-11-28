import DashboardLayout from "@/components/layout";
import { modalAtom } from "@/atoms/modal.atom";
import { useAtom } from "jotai";
export default function Home() {
  const [showModal, setShowModal] = useAtom(modalAtom);
  return (
    <DashboardLayout>
      <h1>Go to Purchase Dashboard</h1>
    </DashboardLayout>
  );
}
