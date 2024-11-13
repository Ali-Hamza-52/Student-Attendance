import databaseConnection from "@/database/connection";
import Attendance from "@/models/Attendance";
import getIdFromUrl from "@/utils/getIdFromUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const id = getIdFromUrl(req.url);
    try {
        await databaseConnection();
        const attendance = await Attendance.find({classId:id});

        return NextResponse.json({ status: 200, attendance });

    } catch (err) {

        return NextResponse.json({ status: 500, message: "Error fetching all attendance" });
    }
}