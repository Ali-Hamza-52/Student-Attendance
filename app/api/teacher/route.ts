import databaseConnection from "@/database/connection";
import { User } from "@/models/User";
import { signuptypes } from "@/types/signupType";
import { NextResponse } from "next/server";
import * as argon from "argon2";

export async function GET() {
    try {
        await databaseConnection();
        const teachers = await User.find({});
        if (teachers.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "No teachers found"
            })
        }
        return NextResponse.json({
            status: 200,
            teachers: teachers.map((teacher) => ({
                email: teacher.email,
                teacherName: teacher.teacherName,
                address: teacher.address,
                contactNumber: teacher.contactNumber,
                department: teacher.department,
                id: teacher._id
            }))
        })
    } catch {
        return NextResponse.json({ status: 500, message: "Server Error" });

    }
}

export async function POST(req :Request) {
    try {
        const user: signuptypes = await req.json(); // Parse incoming request body

        await databaseConnection(); // Connect to the database

        // Check if user already exists
        const isUserExist = await User.findOne({ email: user.email });
        if (isUserExist) {
            return NextResponse.json({
                status: 409,
                message: "User with this email already exists",
            });
        }

        // Hash the password before saving
        const hashedPassword = await argon.hash(user.password);
        const newTeacher = new User({ ...user, password: hashedPassword });

        // Save the new user to the database
        await newTeacher.save();

        return NextResponse.json({
            status: 200,
            message: "User saved successfully",
        });

    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to database",
        });
    }
}
