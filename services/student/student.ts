"use server";

import databaseConnection from "@/database/connection";
import Student from "@/models/Student";
import { StudentFormValues } from "@/types/studentType";

export const addStudents = async (data: StudentFormValues) => {
    try {
        await databaseConnection();

        const uniqueStudents = new Set<string>();
        const validationErrors: string[] = [];
        const classRollNumbers = new Map<string, Set<string>>();

        for (const student of data.students) {
            const uniqueKey = `${student.rollNumber}-${student.classId}`;


            if (uniqueStudents.has(uniqueKey)) {
                validationErrors.push(`The roll number ${student.rollNumber} is already in use in this class.`);
                continue;
            }


            if (!classRollNumbers.has(student.classId)) {
                classRollNumbers.set(student.classId, new Set<string>());
            }


            if (classRollNumbers.get(student.classId)?.has(student.rollNumber)) {
                validationErrors.push(`The roll number ${student.rollNumber} is already in use in this class.`);
                return {
                    status: 401,
                    message: `The roll number ${student.rollNumber} is already in use in this class.`
                };
            }

            const existingStudent = await Student.findOne({
                rollNumber: student.rollNumber,
                classId: student.classId,
            });

            if (existingStudent) {
                validationErrors.push(`The roll number ${student.rollNumber} is already in use in this class.`);

                return {
                    status: 401,
                    message: `The roll number ${student.rollNumber} is already in use in this class.`
                };
            } else {
                uniqueStudents.add(uniqueKey);
                classRollNumbers.get(student.classId)?.add(student.rollNumber);
            }
        }


        if (validationErrors.length > 0) {
            return {
                status: 400,
                message: validationErrors.join(', '),
            };
        }


        const response = await Student.create(data.students);
        console.log("Students created:", response);

        return {
            status: 200,
            message: "Students added successfully",
        };
    } catch (error) {
        console.error("Database connection error:", error);
        return {
            status: 500,
            message: "Failed to connect to the database",
        };
    }
}

export const getStudentByClass = async (classId: string) => {
    try {
        await databaseConnection();
        const students = await Student.find({ classId });
        return{
            status: 200,
            message: "Students retrieved successfully",
            students,
        }

        return {

        }
    } catch (error) {
        console.error("Database connection error:", error);
        return {
            status: 500,
            message: "Failed to connect to the database",
        };
    }
}
