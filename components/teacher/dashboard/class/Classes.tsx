import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import {  UserRoundPen } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteClass from "./DeleteClass";

const Classes = () => {
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between py-4">
        <Typography weight="bold" className="text-white">
          Classes
        </Typography>
        <Link
          href={"/dashboard/class/add"}
          className="py-2 px-4 flex gap-2 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
        >
          <UserRoundPen size={20} /> Add New Class
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Class
              </th>
              <th scope="col" className="px-6 text-center py-3">
                Section
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
                Computer Science
              </th>
              <td className="px-6 py-4">
                BSIT-8
              </td>
              <td className="px-6 py-4 flex items-center justify-center gap-3 md:gap-10">
                <label> 2020-2024 </label>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={"/dashboard/class/update"}
                  className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-gray-500  hover:bg-gray-600 "
                >
                  <UserRoundPen size={15} />
                </Link>
              </td>
              <td className="px-6 py-4 text-right">
                <DeleteClass />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default Classes;
