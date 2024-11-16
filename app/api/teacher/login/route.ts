import databaseConnection from "@/database/connection";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import * as argon from "argon2";
import { loginTypes } from "@/types/loginType";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const loginUser: loginTypes = await req.json();
        console.log("i am called POST", loginUser);

        await databaseConnection();
        const user = await User.findOne({ email: loginUser.email });

        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }

        const isPasswordValid = await argon.verify(user.password, loginUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                status: 401,
                message: "Invalid password",
            });
        } else {
            const cookie = cookies();
            cookie.set("teacherId", user._id.toString());

            return NextResponse.json({
                status: 200,
                message: "User authenticated successfully",
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to database",
        });
    }
}
