import TakeAttendance from "@/components/attendance/TakeAttendance";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <TakeAttendance id={params.id} />;
};

export default Page;
