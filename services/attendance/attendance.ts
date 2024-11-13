"use server";

import databaseConnection from "@/database/connection";
import Attendance from "@/models/Attendance";
import { AttendanceType } from "@/types/attendance";

export const addAttendance = async (attendance: AttendanceType) => {
    try {
        await databaseConnection();

        // Convert date to ISO string to ignore time (keeping only the date part)
        const startOfDay = new Date(attendance.date);
        startOfDay.setHours(0, 0, 0, 0);

        // Check for an existing attendance record for this class and date
        const existingAttendance = await Attendance.findOne({
            classId: attendance.classId,
            date: startOfDay,
        });

        if (existingAttendance) {
            return {
                status: 409,  // Conflict status code
                message: "Attendance already recorded for this class today",
            };
        }

        // Add attendance if no duplicate is found
        await Attendance.create({ ...attendance, date: startOfDay });

        return {
            status: 200,
            message: "Attendance added successfully",
        };

    } catch (error) {
        console.error("Error adding attendance: ", error);
        return {
            status: 500,
            message: "Error adding attendance",
        };
    }
};

export const getAttendance = async (classId: string) => {
    try {
        await databaseConnection();
        const attendance = await Attendance.find({ classId: classId });
        if (attendance.length == 0) {
            return {
                status: 404,
                message: "No attendance records found for the given class"
            }
        }

        return {
            status: 200,
            attendance,
        };
    } catch (error) {
        console.error("Error fetching attendance: ", error);
        return {
            success: false,
            message: "Error fetching attendance",
        };
    }

}

export const getAllCollegeAttendance = async () => {
    try {
        await databaseConnection();
        const attendance = await Attendance.find({});
        return {
            status: 200,
            attendance,
        };

    } catch {
        return {
            status: 500,
            message: "Error fetching all college attendance",
        };

    }
}

export const getAllAttendance = async () => {
    try {

        await databaseConnection();
        const attendance = await Attendance.find({});
        return {
            status: 200,
            attendance,
        };

    } catch {
        return {
            status: 500,
            message: "Error fetching all attendance",
        }
    }
}

export const getSingleClassAttendance = async (classId: string) => {
    try {
        await databaseConnection();
        const attendance = await Attendance.find({ classId: classId });
        if (attendance.length == 0) {
            return {
                status: 404,
                message: "No attendance records found"
            }
        }
        return {
            status: 200,
            attendance,
        };

    } catch {
        console.error("Error fetching single class attendance: ");
        return {
            success: false,
            message: "Error fetching single class attendance",
        };
    }
}

export const getAttendanceByDate = async (classId: string, date: string) => {
    try {
        await databaseConnection();
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const attendance = await Attendance.find({ classId: classId, date: startOfDay });
        if (attendance.length == 0) {
            return {
                status: 404,
                message: "No attendance records found for the given date"
            }

        }
        return {
            status: 200,
            attendance,
        };

    } catch {
        console.error("Error fetching attendance by date: ");
        return {
            status: 500,
            message: "Error fetching attendance by date",
        };
    }
}