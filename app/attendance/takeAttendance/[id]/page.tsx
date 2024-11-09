import TakeAttendance from "@/components/attendance/TakeAttendance";
import { getAllClassStudent } from "@/services/attendance/class";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <TakeAttendance id={params.id} />;
};

export default Page;
