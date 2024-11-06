"use server";

import databaseConnection from "@/database/connection";
import { Course } from "@/models/TeacherCourse";
import { CourseFormValues, UpdateCourseFormValues } from "@/types/courseType";

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

export const getCourseByCourseId = async (id: string) => {
    try {
        await databaseConnection();
        const course = await Course.findById(id);
        if (!course) {
            return {
                status: 404,
                message: "Course not found",
            };
        }
        return {
            status: 200,
            data:course,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Server error",
        };
    }
}

export const updateCourse = async (id: string, updatedCourse: UpdateCourseFormValues) => {
    try {
        await databaseConnection();
        console.log("i am updating course")
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

        if (courses.length == 0) {
            return {
                status: 404,
                message: "No courses found for the given class"
            }
        }


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