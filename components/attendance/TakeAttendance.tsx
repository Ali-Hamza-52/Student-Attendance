"use client";
import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { attendanceSchema } from "@/schema/attendanceSchema";
import useToast from "@/hooks/useToast";
import { addAttendance } from "@/services/attendance/attendance";
import { getAllClassStudent } from "@/services/attendance/class";
import { useRouter } from "next/navigation";

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

const TakeAttendance = ({ id }: { id: string }) => {
  const router = useRouter();
  const toast = useToast();
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noStudents, setNoStudents] = useState(false);
  const [mode, setMode] = useState<"card" | "console">("card");


  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      date: new Date(),
      classId: id,
      students: [],
    },
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllClassStudent(id);
        if (response.status === 404 || response?.data?.length === 0) {
          setNoStudents(true);
          setStudents([]);
        } else {
          const data = response.data;
          setStudents(data ? data : []);
          setValue(
            "students",
            data ? data.map((student: any) => ({
              rollNumber: student.rollNumber,
              attendance: "A",
            })) : []
          );
          setNoStudents(false);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setNoStudents(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [id, setValue]);

  const watchedStudents = watch("students");

  const markedStudents = watchedStudents?.filter(
    (student) => student.attendance !== "A"
  );

  const onSubmit = async (data: AttendanceFormValues) => {
    console.log("Attendance Data:", data);
    try {
      const res = await addAttendance(data);
      if (res.status === 200) {
        toast.showSuccess(res.message);
        router.push('/attendance')
      } else if (res.status === 409) {
        toast.showError(res.message);
        router.push('/attendance')
      }
    } catch {
      toast.showError("Failed to add attendance");
    }
  };

  const handleCancel = (rollNumber: string) => {
    const studentIndex = students.findIndex(
      (student: any) => student.rollNumber === rollNumber
    );
    if (studentIndex !== -1) {
      setValue(`students.${studentIndex}.attendance`, "A");
    }
  };

  return (
    <SectionWrapper>
      {isLoading ? (
        <Typography variant="h5" className="text-gray-500">
          Loading students...
        </Typography>
      ) : noStudents ? (
        <Typography variant="h5" className="text-red-500">
          There is no student in this class.
        </Typography>
      ) : (
        <SectionWrapper>
          <div className="flex justify-between items-center mb-1 md:mb-6">
            <Typography variant="h4">Take Attendance</Typography>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as "card" | "console")}
              className="border p-2 rounded"
            >
              <option value="card">Card Mode</option>
              <option value="console">Console Mode</option>
            </select>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 md:py-6 max-h-72 sm:max-h-96 md overflow-y-auto">
              {mode === "card" ? (
                students.map((student, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 bg-gray-900/90 px-4 py-3 md:px-8 md:py-6 rounded-2xl"
                  >
                    <div className="flex justify-between">
                      <Typography variant="t2">{student.rollNumber}</Typography>
                      <Typography variant="t2">{student.studentName}</Typography>
                    </div>

                    <div className="flex justify-between items-center">
                      <Controller
                        control={control}
                        name={`students.${index}.attendance`}
                        render={({ field }) => (
                          <>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                {...field}
                                value="P"
                                className="radio radio-primary"
                              />
                              <span className="text-white font-bold">P</span>
                            </label>

                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                {...field}
                                value="A"
                                className="radio radio-error"
                                defaultChecked
                              />
                              <span className="text-white font-bold">A</span>
                            </label>

                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                {...field}
                                value="L"
                                className="radio radio-secondary"
                              />
                              <span className="text-white font-bold">L</span>
                            </label>
                          </>
                        )}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <h1>Console Mode</h1>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full"
            >
              Submit Attendance
            </button>
          </form>
          {markedStudents?.length > 0 && (
            // w-[89.5%] md:w-[90.5%] mx-auto fixed top-36
            <div className="mb-6 p-4 mt-3 sm:mt-6 rounded-2xl bg-blue-100 ">
              <Typography variant="h5" className="text-gray-900">
                Students Attendance:
              </Typography>
              <div className="max-h-40 overflow-y-auto grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 py-4 md:py-6">
                {markedStudents.map((student) => (
                  <div
                    key={student.rollNumber}
                    className="flex justify-between bg-slate-600 px-4 py-4 rounded-3xl"
                  >
                    <Typography weight="semiBold">
                      {student.rollNumber} | {student.attendance}
                    </Typography>
                    <button
                      onClick={() => handleCancel(student.rollNumber)}
                      className="text-red-500 hover:underline"
                    >
                      <Trash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionWrapper>
      )}
    </SectionWrapper>
  );
};

export default TakeAttendance;
