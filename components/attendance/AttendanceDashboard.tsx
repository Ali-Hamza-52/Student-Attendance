"use client"
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SectionWrapper from "../common/SectionWrapper";
import { Typography } from "../ui/typography";

// Interfaces for data structures
interface Class {
  _id: string;
  department: string;
  className: string;
  session: string;
  __v: number;
}

interface StudentAttendance {
  rollNumber: string;
  attendance: "P" | "A" | "L";
  _id: string;
}

interface Attendance {
  _id: string;
  date: string;
  classId: string;
  students: StudentAttendance[];
  __v: number;
}

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[] | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string>("");

  const getClassAttendance = async (classId?: string) => {
    if (classId === 'Choose a class') {
      setAttendanceData(null);
      return;
    }
    const response = await fetch(
      `https://ggcb-attendance.vercel.app/api/attendance/classAttendance/${classId}`
    );
    try {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAttendanceData(data.attendance);
      console.log("classAttendance", data.attendance);
    } catch (err) {
      console.error("Error fetching class attendance:", err);
      setError("Failed to load attendance data for this class");
    }
  }

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = event.target.value;
    getClassAttendance(selectedClassId);
  };

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch("https://ggcb-attendance.vercel.app/api/class/allClass");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setClasses(data.classes);
      console.log("allClass", data.classes);
    };
    const getData = async () => {
      // try {
      //   let response = await fetch(
      //     "https://ggcb-attendance.vercel.app/api/attendance/allAttendance"
      //   );
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }
      //   const data = await response.json();
      //   setAttendanceData(data.attendance);
      //   console.log("allAttendance", data.attendance);
      // } catch (err) {
      //   console.error("Error fetching attendance data:", err);
      //   setError("Failed to load attendance data");
      // }
    };
    getData();
    getClasses();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "P":
        return "bg-blue-500";
      case "A":
        return "bg-red-500";
      case "L":
        return "bg-yellow-500";
      default:
        return "bg-gray-200";
    }
  };

  const getDays = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  return (
    <SectionWrapper>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center space-x-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <CardTitle>All Student Attendance</CardTitle>
            </div>
            <select
              id="classes"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleClassChange}
            >
              <option selected>Choose a class</option>
              {classes &&
                classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.department} - {c.className} - {c.session}
                  </option>
                ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : attendanceData ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left border text-nowrap">Sr.</th>
                    <th className="p-3 text-left border text-nowrap">
                      Roll No.
                    </th>
                    {getDays().map((day) => (
                      <th key={day} className="p-3 text-center border w-8">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendanceData[0]?.students.map(
                    (student: StudentAttendance, index: number) => (
                      <tr key={student.rollNumber} className="hover:bg-gray-50">
                        <td className="p-3 border font-medium">{index + 1}</td>
                        <td className="p-3 border font-medium">
                          {student.rollNumber}
                        </td>
                        {getDays().map((day) => {
                          const record = attendanceData?.find(
                            (record: Attendance) =>
                              new Date(record.date).getDate() === day
                          );
                          const status =
                            record?.students.find(
                              (s) => s.rollNumber === student.rollNumber
                            )?.attendance || "";

                          return (
                            <td key={day} className="border p-1 text-center">
                              {status && (
                                <div
                                  className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-white text-xs ${getStatusColor(
                                    status
                                  )}`}
                                >
                                  {status}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center p-8">
              <Typography variant="h4" className="text-blue-500">Please Select Any Class</Typography>
            </div>
          )}

          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Late</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
};

export default AttendanceCalendar;
