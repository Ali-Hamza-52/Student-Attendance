import SectionWrapper from "@/components/common/SectionWrapper";
import { getCourses } from "@/services/course/courses";
import React from "react";
import DeleteCourse from "./DeleteCourse";
import Link from "next/link";
import { SquarePen } from "lucide-react";

const DetailedCourse = async ({ id }: { id: string }) => {
  const response = await getCourses(id);
  console.log("response: " + JSON.stringify(response));
  return (
    <SectionWrapper>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3">
                Days
              </th>
              <th scope="col" className="px-6 py-3">
                Teacher
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {response.status === 200 &&
              response.courses?.map((course) => (
                <tr
                  key={course.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap dark:text-white">
                    {course.courseName}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {course.startTime}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {course.days.map((day) => (
                      <span
                        key={day}
                        className="inline-block mr-2 text-gray-600"
                      >
                        {day}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {course.teacherName}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    <Link
                      href={`/dashboard/class/updateCourse/${course._id}`}
                      className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                    >
                      <SquarePen size={15} />
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    <DeleteCourse id={course.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {response.status === 404 && (
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-center py-3 md:py-6 text-3xl text-white">
              No Course Added
            </h1>
            <Link
              href={`/dashboard/class/addCourse/${id}`}
              className="p-2 px-6 mb-4 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
            >
              Add Course
            </Link>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default DetailedCourse;
