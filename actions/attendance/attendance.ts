"use server"

import { getAllAttendance } from "@/services/attendance/attendance"

export const allAttendance =async () =>{
    let attendance = await getAllAttendance();
    return await attendance;
}