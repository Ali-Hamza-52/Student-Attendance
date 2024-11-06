import TakeAttendance from "@/components/attendance/TakeAttendance";
import { getAllClassStudent } from "@/services/attendance/class";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  console.log("id +++ params", params.id);
  const student = await getAllClassStudent(params.id);


  console.log("object found", student);
  return <TakeAttendance id={params.id} students={student.data}/>;
};

export default Page;
