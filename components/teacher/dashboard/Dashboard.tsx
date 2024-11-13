import HeroBanner from "@/components/common/HeroBanner";
import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import {
  BookOpen,
  ChartNoAxesCombined,
  FileStack,
  School,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <SectionWrapper>
      <HeroBanner />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href={"/attendance/dashboardAttendance"}>
          <div className="bg-[#ff742e] text-white flex flex-col gap-14 rounded-2xl p-5">
            <div className="p-2 rounded-xl bg-[#ffa77b] w-fit">
              <FileStack size={25} />
            </div>
            <div>
              <Typography variant="h5" weight="semiBold" className="text-white">
                Attendance
              </Typography>
            </div>
          </div>
        </Link>
        <Link href={"/dashboard/teacher"}>
          <div className="bg-[#0e78f9] flex flex-col gap-14 text-white rounded-2xl p-5">
            <div className="p-2 rounded-xl bg-[#67aafb] w-fit">
              <UserRound size={25} />
            </div>
            <div>
              <Typography variant="h5" weight="semiBold" className="text-white">
                Teacher
              </Typography>
            </div>
          </div>
        </Link>
        <Link href={"/dashboard/class"}>
          <div className="bg-[#830ef9] flex flex-col gap-14 text-white rounded-2xl p-5">
            <div className="p-2 rounded-xl bg-[#b167fb] w-fit">
              <School size={25} />
            </div>

            <div>
              <Typography variant="h5" weight="semiBold" className="text-white">
                Class
              </Typography>
            </div>
          </div>
        </Link> 
        <Link href={"/dashboard/report"}>
          <div className="bg-[#f9a90e] flex flex-col gap-14 text-white rounded-2xl p-5">
            <div className="p-2 rounded-xl bg-[#fbc967] w-fit">
              <ChartNoAxesCombined size={25} />
            </div>
            <div>
              <Typography variant="h5" weight="semiBold" className="text-white">
                Report
              </Typography>
            </div>
          </div>
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default Dashboard;
