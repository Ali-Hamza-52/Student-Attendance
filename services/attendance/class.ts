"use server";

import { Course } from '@/models/TeacherCourse';
import databaseConnection from "@/database/connection";
import Student from '@/models/Student';
import { ObjectId } from 'mongodb';

export const teacherClasses = async (id: string) => {
    try {
        await databaseConnection();
        const classes = await Course.find({ teacherId: id }).lean();

        if (classes.length === 0) {
            return {
                status: 404,
                message: "No classes found for this teacher",
            };
        }

        return {
            status: 200,
            message: "Classes found",
            data: classes
        };
    } catch (error) {
        console.error("Database query error:", error);
        return {
            status: 500,
            message: "Server error",
        };
    }
};

export const getAllClassStudent = async (id: string) => {
    try {
        console.log("id: " + id);
        await databaseConnection();
        const students = await Student.find({ classId: new ObjectId(id)  });
        console.log("students: ", students)
        if (students.length === 0){
            return {
                status: 404,
                message: "No students found for this class",
            };
        }
        return {
            status: 200,
            message: "Students found",
            data: students
        };

    } catch {
        console.error("Database query error:");
        return {
            status: 500,
            message: "Server error",
        };

    }
}
