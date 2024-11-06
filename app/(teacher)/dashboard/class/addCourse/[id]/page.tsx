import AddCourse from "@/components/teacher/dashboard/class/course/AddCourse";
import { getTeachersNameAndId } from "@/services/teacher/user";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  // Fetch the teachers' names and IDs
  const teachers = await getTeachersNameAndId();

  // Check if the teachers data is available and properly formatted
  const teachersData = teachers?.data || []; // Fallback to an empty array if data is not available

  return (
    <AddCourse id={params.id} teachers={teachersData} />
  );
};

export default Page;
