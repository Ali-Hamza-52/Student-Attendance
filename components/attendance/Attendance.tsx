"use client";
import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import { teacherClasses } from "@/services/attendance/class";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Attendance = () => {
  const cookie = new Cookies();
  const [teacherData, setTeacherData] = useState<{ teacherName?: string }>({});
  const [classes, setClasses] = useState<any[]>([]);
  const [noClasses, setNoClasses] = useState(false);

  const getTeacherClass = async () => {
    try {
      const id = await cookie.get("teacherId");
      if (!id) {
        return;
      }

      const response = await teacherClasses(id);
      if (response.status === 404) {
        setNoClasses(true);
        setClasses([]);
        return;
      }

      setClasses(response?.data || []);
      setNoClasses(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setNoClasses(true);
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("teacher") || "{}");
    setTeacherData(storedData);
    getTeacherClass();
  }, []);

  return (
    <SectionWrapper>
      <Typography variant="h3">
        Hi, <span className="text-blue-500">{teacherData?.teacherName || "Teacher"}</span>
      </Typography>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 py-3 md:py-8">
        {noClasses ? (
          <Typography variant="h4" className="text-red-500 col-span-4">
            There is no course assigned to you.
          </Typography>
        ) : (
          classes.map((classItem: any) => (
            <div
              key={classItem._id}
              className="bg-white px-4 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-5"
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
              <Typography className="text-gray-700 text-center" variant="t3" weight="semiBold">
                {classItem.days.join(", ")}
              </Typography>

              <Link
                href={`/attendance/takeAttendance/${classItem.classId}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-full text-white bg-blue-600 text-center hover:bg-blue-500"
              >
                Take Attendance
              </Link>
            </div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
};

export default Attendance;
