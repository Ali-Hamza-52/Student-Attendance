"use server";

import databaseConnection from "@/database/connection";
import { Course } from "@/models/TeacherCourse";
import { CourseFormValues } from "@/types/courseType";

export const addCourse = async (course: CourseFormValues) => {
    try {
        await databaseConnection();
        console.log("Course: ", course);
        course.courses.forEach(async (course) => {
            await Course.create(course);
        });
        return {
            status: 200,
            message: "Course added successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Server error",
        };
    }
}

export const removeCourse = async (id: string) => {
    try {
        await databaseConnection();
        await Course.findByIdAndDelete(id);
        return {
            status: 200,
            message: "Course removed successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Server error",
        };
    }
}

export const updateCourse = async (id: string, updatedCourse: CourseFormValues) => {
    try {
        await databaseConnection();
        await Course.findByIdAndUpdate(id, updatedCourse, { new: true });
        return {
            status: 200,
            message: "Course updated successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Server error",
        };
    }
}

export const getCourses = async (id: string) => {
    try {
        await databaseConnection();
        const courses = await Course.find({
            classId: id
        });
        return {
            status: 200,
            courses: courses
        }
    } catch {
        return {
            status: 500,
            message: "Server error"
        }
    }
}