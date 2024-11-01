"use server";

import { signuptypes } from './../../types/signupType';
import databaseConnection from "@/database/connection";
import * as argon from "argon2";
import { User } from '@/models/User';
import { loginTypes } from '@/types/loginType';
import { cookies } from 'next/headers';

export const postTeacher = async (user: signuptypes) => {
    try {
        await databaseConnection();

        const isUserExist = await User.findOne({ email: user.email });
        if (isUserExist) {
            console.log("User already exists");
            return {
                status: 409,
                message: "User with this email already exists",
            };
        }

        const hashedPassword = await argon.hash(user.password);
        const newTeacher = new User({ ...user, password: hashedPassword });

        await newTeacher.save();

        return {
            status: 200,
            message: "User saved successfully",
        };

    } catch (error) {
        console.error("Database connection error:", error);
        return {
            status: 500,
            message: "Failed to connect to database",
        };
    }
};

export const TeacherLogin = async (loginUser: loginTypes) => {
    try {
        await databaseConnection();
        const user = await User.findOne({ email: loginUser.email });
        if (!user) {
            return {
                status: 404,
                message: "User not found",
            };
        }
        const isPasswordValid = await argon.verify(user.password, loginUser.password);
        if (!isPasswordValid) {
            return {
                status: 401,
                message: "Invalid password",
            }
        } else {
            const cookie = cookies();
            cookie.set("teacherId", user._id);

            return {
                status: 200,
                message: "User authenticated successfully",
            }
        }
    } catch {
        return {
            status: 500,
            message: "Failed to connect to database",
        };
    }

}

export const getTeacherId = async (id: string) => {
    try {
        await databaseConnection();
        const user = await User.findById(id);
        if (!user) {
            return {
                status: 404,
                message: "User not found",
            };
        }
        return {
            status: 200,
            teacher: {
                email: user.email,
                teacherName: user.teacherName,
                address: user.address,
                contactNumber: user.contactNumber,
                department: user.department
            }
        }
    } catch {
        return {
            status: 500,
            message: "Failed to connect to database",
        };
    }
}

export const getTeachers = async () => {
    try {
        await databaseConnection();
        const teachers = await User.find({});
        return {
            status: 200,
            teachers: teachers.map((teacher) => ({
                email: teacher.email,
                teacherName: teacher.teacherName,
                address: teacher.address,
                contactNumber: teacher.contactNumber,
                department: teacher.department,
                id: teacher._id
            }))
        }
    } catch {
        return {
            status: 500,
            message: "Failed to connect to database",
        };
    }
}

export const deleteTeacher = async (id: string) => {
    try {
        await databaseConnection();
        const teacher = await User.findByIdAndDelete(id);
        if (!teacher) {
            return {
                status: 404,
                message: "Teacher not found",
            };
        }
        return {
            status: 200,
            message: "Teacher deleted successfully",
        };
    } catch {
        return {
            status: 500,
            message: "Failed to connect to database",
        };
    }
}