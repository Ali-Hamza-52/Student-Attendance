import SectionWrapper from "@/components/common/SectionWrapper";
import { UserRoundMinus, UserRoundPen } from "lucide-react";
import React from "react";
import TeacherForm from "./TeacherDetail";
import { Typography } from "@/components/ui/typography";

const Teacher = () => {
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between py-4">
        <Typography weight="bold" className="text-white">Teachers</Typography>
          <button className="py-2 px-4 flex gap-2 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
            <UserRoundPen size={20} /> Add Teacher
          </button>
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
              <th scope="col" className="px-6 text-center py-3">
                Lectures
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap dark:text-white"
              >
                Prof. Ali Rehn
              </th>
              <td className="px-6 py-4">Computer</td>
              <td className="px-6 py-4 flex items-center justify-center gap-3 md:gap-10">
                <label> 4 </label>
                <TeacherForm />
              </td>
              <td className="px-6 py-4">
                <button className="p-2 rounded-full flex justify-center items-center text-sm font-medium text-white bg-gray-500  hover:bg-gray-600 ">
                  <UserRoundPen size={15} />
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 rounded-full flex justify-center items-center text-sm font-medium text-white bg-red-500  hover:bg-red-600 ">
                  <UserRoundMinus size={15} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default Teacher;
