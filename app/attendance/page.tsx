// import Attendance from "@/components/attendance/Attendance";
// import { teacherClasses } from "@/services/attendance/class";
// import { getCookies } from "@/services/token/tokenService";
// import React from "react";

// const Page = async () => {
//   const id = await getCookies("teacherId");
//   if (!id) {
//     return <p>Teacher ID not found.</p>;
//   }

//   try {
//     const teacherClass = await teacherClasses(id.value);

//     return <Attendance teacherClass={teacherClass} />;
//   } catch (error) {
//     console.error("Failed to fetch teacher classes:", error);
//     return <p>Error loading classes.</p>;
//   }
// };

// export default Page;

import React from 'react'

const Page = () => {
  return (
    <div>
      hi attendance
    </div>
  )
}

export default Page
