"use client";
import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Attendance = ({ teacherClass }: any) => {
  const [teacherData, setTeacherData] = useState<{ teacherName?: string }>({});
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("teacher") || "{}");
    setTeacherData(storedData);
  }, []);

  return (
    <SectionWrapper>
      <Typography variant="h3">
        Hi, <span className="text-blue-500">{teacherData?.teacherName || "Teacher"}</span>
      </Typography>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 py-3 md:py-6">
        {teacherClass?.data?.map((classItem: any) => (
          <div
            key={classItem._id}
            className="bg-white px-4 py-2 rounded-2xl shadow-2xl flex flex-col items-center gap-4"
          >
            <Typography className="text-purple-600" weight="semiBold">
              {classItem.className}
            </Typography>
            <Typography className="text-gray-700" variant="t3" weight="semiBold">
              {classItem.courseName}
            </Typography>
            <Typography className="text-gray-700" variant="t3" weight="semiBold">
              {classItem.startTime}
            </Typography>
            <Typography className="text-gray-700" variant="t3" weight="semiBold">
              {classItem.days.join(", ")}
            </Typography>

            <Link
              href={`/attendance/takeAttendance/${classItem.classId}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-full text-white bg-blue-600 text-center hover:bg-blue-500"
            >
              Take Attendance
            </Link>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Attendance;
