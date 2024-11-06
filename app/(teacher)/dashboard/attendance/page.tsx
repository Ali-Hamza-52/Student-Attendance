// import React from 'react'
// import AttendanceDashboard from '@/components/attendance/AttendanceDashboard'
// import { getAllCollegeAttendance } from '@/services/attendance/attendance'

// const Page = async () => {
//   try {
//     const attendance = await getAllCollegeAttendance();

//     if (attendance.status === 200) {
//       return <AttendanceDashboard attendance={attendance.attendance} />;
//     } else {
//       return <h1>Server Error</h1>;
//     }
//   } catch (error) {
//     // Handle any errors that might occur during data fetching
//     console.error("Error fetching attendance data:", error);
//     return <h1>Error occurred while fetching data</h1>;
//   }
// }

// export default Page;

import React from 'react'

const Page = () => {
  return (
    <div>
      dashboard
    </div>
  )
}

export default Page

