import DashboardLayout from "@/components/layout";
import { MdAdd } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { RiAlarmWarningFill } from "react-icons/ri";
import { BiHistory } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import Button from "@/components/atoms/button";
export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex gap-4">
        <Button icon={<MdAdd />}>Add</Button>
        <Button icon={<CgMediaLive />}>Live Jobs</Button>
        <Button icon={<RiAlarmWarningFill />} className="bg-yellow-500">
          Live Jobs
        </Button>
        <Button icon={<TiCancel />} className="bg-red-600">
          Cancelled Jobs
        </Button>
        <Button icon={<BiHistory />} className="bg-green-600">
          History
        </Button>
      </div>
    </DashboardLayout>
  );
}
