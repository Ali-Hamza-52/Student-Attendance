import databaseConnection from "@/database/connection";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await databaseConnection();
        const attendance = await Attendance.find({});

        return NextResponse.json({ status: 200, attendance });

    } catch (err) {

        return NextResponse.json({ status: 500, message: "Error fetching all attendance" });
    }
}
