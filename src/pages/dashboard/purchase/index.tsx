import DashboardLayout from "@/components/layout";
import { MdAdd } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { RiAlarmWarningFill } from "react-icons/ri";
import { BiHistory } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import Button from "@/components/atoms/button";
import { tableData } from "@/data/dashboard";
import Table from "@/components/atoms/table";
import Modal from "@/components/atoms/modal";
import { modalAtom } from "@/atoms/modal.atom";
import { useAtom } from "jotai";
import JobOrderForm from "../../../components/common/joborder-form";
export default function Home() {
  const [showModal, setShowModal] = useAtom(modalAtom);
  return (
    <DashboardLayout>
      <h1>Purchase Dashboard</h1>
    </DashboardLayout>
  );
}
