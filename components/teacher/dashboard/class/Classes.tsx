import SectionWrapper from "@/components/common/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import {
  BadgeMinus,
  BadgePlus,
  UserMinus,
  UserPlus,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteClass from "./DeleteClass";
import { getAllClasses } from "@/services/class/class";

const Classes = async () => {
  const allClass = await getAllClasses();

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
              <th scope="col" className="px-6 text-center py-3">
                Students
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-4  py-3">
                Delete
              </th>
              <th scope="col" className="px-6 py-3 text-center">Course</th>
            </tr>
          </thead>
          <tbody>
            {allClass.status === 200 &&
              allClass.classes?.map(
                (classData: {
                  _id: string;
                  department: string;
                  className: string;
                  session: string;
                  __v: number;
                }) => (
                  <tr
                    key={classData._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap dark:text-white"
                    >
                      {classData.department}
                    </th>
                    <td className="px-6 py-4">{classData.className}</td>
                    <td className="px-6 py-4">{classData.session}</td>

                    <td className="px-6 py-4 flex items-center justify-center gap-3 md:gap-10">
                      <Link href={`/dashboard/class/${classData._id}`} className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
                        <UserPlus size={15}/>
                      </Link>
                      <Link href={`/dashboard/class/${classData._id}`} className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-red-500 hover:bg-red-600">
                        <UserMinus size={15}/>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/class/update/${classData._id}`}
                        className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                      >
                        <UserRoundPen size={15} />
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteClass id={classData._id} />
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-center gap-3 md:gap-10 ">
                      <Link
                        href={`/dashboard/class/addCourse/${classData._id}`}
                        className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                      >
                        <BadgePlus size={15} id={classData._id} />
                      </Link>
                      <Link
                        href={`/dashboard/class/updateCourse/${classData._id}`}
                        className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                      >
                        <BadgeMinus size={15} />
                      </Link>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default Classes;
