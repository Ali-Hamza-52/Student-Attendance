"use server"

import databaseConnection from "@/database/connection"
import { TeacherCourse } from "@/models/TeacherCourse";
import { teacherCourseType } from "@/types/teacherCourseType";


export const  addTeacherCourse = async (data:teacherCourseType) =>{
    try{
        console.log("attendance",data)
        await databaseConnection();
        await TeacherCourse.create(data);
        return {
            status: 200,
            message: "Teacher course added successfully",
        };


    }catch{
        console.log("Error adding teacher course")
        return {
            status: 500,
            message: "An error occurred while adding teacher course",
        };
    }
}