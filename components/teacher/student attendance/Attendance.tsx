import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import React from "react";

const Attendance = () => {
  return (
    <SectionWrapper>
      <Typography variant="h3">
        Hi, <span className="text-blue-500">Prof. Ali Rehn</span>
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 py-3 md:py-6">
        <div className="bg-white px-4 py-2 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
          <Typography className="text-gray-700" weight="semiBold">BSIT-8</Typography>
          <Typography className="text-gray-700" variant="t3" weight="semiBold">Computer Science</Typography>
          <Typography className="text-gray-700" variant="t3" weight="semiBold">12:00 PM - 1:30 PM</Typography>
          <Typography className="text-gray-700" variant="t3" weight="semiBold">Monday</Typography>

          <Link href={'/attendance/takeAttendance'} className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-full text-white bg-blue-600 text-center hover:bg-blue-500">
            Take Attendance
          </Link>
          <Link href={''} className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-full text-white bg-blue-600 text-center hover:bg-blue-500">
            Edit Attendance
          </Link>
        </div>
        
      </div>
    </SectionWrapper>
  );
};

export default Attendance;
