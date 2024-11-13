import databaseConnection from "@/database/connection";
import Class from "@/models/Class";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await databaseConnection();
        const classes = await Class.find({});

        if(!classes){
            return NextResponse.json({ status: 404, message: "No classes found" });
        }

        // Returning a JSON response with NextResponse
        return NextResponse.json({ status: 200, classes });

    } catch (err) {
        // Log the error for debugging purposes
        console.error("Error fetching attendance:", err);

        // Returning a proper error response
        return NextResponse.json({ status: 500, message: "Error fetching all attendance" });
    }
}
