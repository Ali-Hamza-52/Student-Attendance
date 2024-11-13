import databaseConnection from "@/database/connection";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await databaseConnection();
        const attendance = await Attendance.find({});

        // Returning a JSON response with NextResponse
        return NextResponse.json({ status: 200, attendance });

    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error fetching attendance:", err);

        // Returning a proper error response
        return NextResponse.json({ status: 500, message: "Error fetching all attendance" });
    }
}
