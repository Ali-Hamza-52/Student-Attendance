import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type AttendanceStatus = "P" | "A" | "L" | "WK" | "HL" | "CL" | "PL";

const AttendanceDashboard = ({ attendance }: any) => {
  const statusColors: Record<AttendanceStatus, string> = {
    P: "bg-green-100 text-green-800",
    A: "bg-red-100 text-red-800",
    L: "bg-purple-100 text-purple-800",
    WK: "bg-blue-100 text-blue-800",
    HL: "bg-cyan-100 text-cyan-800",
    CL: "bg-orange-100 text-orange-800",
    PL: "bg-yellow-100 text-yellow-800",
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Function to add or update attendance for a specific date
  const addOrUpdateAttendance = (date: string, rollNumber: string, status: AttendanceStatus) => {
    // Loop through attendance records to find the matching date
    for (const record of attendance) {
      if (new Date(record.date).toLocaleDateString() === new Date(date).toLocaleDateString()) {
        // If record exists for the same date, update the attendance of the student
        const student = record.students.find((student: any) => student.rollNumber === rollNumber);
        if (student) {
          student.attendance = status; // Update attendance
        } else {
          // If student not found, add a new student record for that date
          record.students.push({
            rollNumber,
            attendance: status,
            _id: { $oid: new Date().toISOString() }, // Generate a unique ID (can be adjusted as per your needs)
          });
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold p-3">Student Attendance</h1>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{attendance.length} records</span>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b bg-gray-50">
                <th className="px-4 py-2 text-left">Student Name</th>
                {daysInMonth.map((day) => (
                  <th key={day} className="px-2 py-2 text-center min-w-[40px]">
                    <div className="text-sm font-medium">{day}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(2021, 0, day).toLocaleString("en-US", { weekday: "short" })}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendance.map((record: any) => (
                <tr key={record._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                  </td>

                  {daysInMonth.map((day) => (
                    <td key={day} className="px-2 py-2 text-center">
                      {record.students.map((student: any) => {
                        const status = student.attendance;
                        return (
                          status && (
                            <span
                              key={student._id}
                              className={`inline-block px-2 py-1 text-xs rounded-md `}
                            >
                              {status}
                            </span>
                          )
                        );  
                      })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
