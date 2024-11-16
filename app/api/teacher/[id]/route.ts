import databaseConnection from "@/database/connection";
import { User } from "@/models/User";
import getIdFromUrl from "@/utils/getIdFromUrl";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const id = getIdFromUrl(req.url);

        await databaseConnection(); // Connect to the database

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }

        return NextResponse.json({
            status: 200,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({
            status: 500,
            message: "Failed to delete user",
        });
    }
}

export async function GET(req: NextRequest) {
    try {
        const id = getIdFromUrl(req.url);
        await databaseConnection();
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }
        return NextResponse.json({
            status: 200,
            teacher: {
                email: user.email,
                teacherName: user.teacherName,
                address: user.address,
                contactNumber: user.contactNumber,
                department: user.department
            }
        })
    } catch {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to database",
        });
    }
}

export async function PUT(req: NextRequest) {
    // try {
    //     const id = getIdFromUrl(req.url);
    //     const { name, email, password } = req.body;
    //     await databaseConnection();
    //     const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    //     if (!user) {
    //         return NextResponse.json({
    //             status: 404,
    //             message: "User not found",
    //         });
    //     }

    //     return NextResponse.json({
    //         status: 200,
    //         message: "User updated successfully",
    //         user
    //     });

    // } catch {
    //     return NextResponse.json({
    //         status: 500,
    //         message: "Failed to connect to database"
    //     })
    // }
}