"use client";
import SectionWrapper from "@/components/common/SectionWrapper";
import { UserRoundMinus, UserRoundPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import TeacherForm from "./TeacherDetail";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import DeleteTeacher from "./DeleteTeacher";
import { getTeachers } from "@/services/teacher/user";

interface Teacher {
  email: string;
  teacherName: string;
  address: string;
  contactNumber: string;
  department: string;
  id: string;
}

const Teacher = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();

        const teacherData: Teacher[] =
          response && response.teachers
            ? response.teachers.map((teacher) => ({
                id: teacher.id.toString(), // Ensure `id` is converted to a string if needed
                email: teacher.email,
                teacherName: teacher.teacherName,
                address: teacher.address,
                contactNumber: teacher.contactNumber,
                department: teacher.department,
              }))
            : [];

        setTeachers(teacherData); // TypeScript now understands the type of `teachers`
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <SectionWrapper>
      <div className="flex items-center justify-between py-4">
        <Typography weight="bold" className="text-white">
          Teachers
        </Typography>
        <Link
          href={"/dashboard/teacher/add"}
          className="py-2 px-4 flex gap-2 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
        >
          <UserRoundPen size={20} /> Add Teacher
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap dark:text-white"
                  >
                    {teacher.teacherName}
                  </th>
                  <td className="px-6 py-4">{teacher.department}</td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/teacher/update/${teacher.id}`}
                      className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
                    >
                      <UserRoundPen size={15} />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DeleteTeacher teacherId={teacher.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Teacher Cannot be Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default Teacher;
