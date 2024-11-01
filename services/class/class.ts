"use server"
import { ObjectId } from 'mongodb';
import databaseConnection from "@/database/connection"
import Class from "@/models/Class";
import { ClassFormValues } from "@/types/classType";
import Student from '@/models/Student';

export const addNewClass = async (data: ClassFormValues) => {
    try {
        await databaseConnection();
        const newClass = new Class(data);
        const res = await newClass.save();
        return {
            status: 200,
            classId: res._id,
            message: "New class added successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Server error"
        }
    }

}

export const getAllClasses = async () => {
    try {
        await databaseConnection();
        const classes = await Class.find();
        return {
            status: 200,
            classes: classes
        }
    } catch {
        return {
            status: 500,
            message: "Server error"
        }
    }
}


export const getClassById = async (classId: string) => {
    try {
        await databaseConnection();

        const classDetails = await Class.findById(classId);
        return {
            status: 200,
            data: {
                name: classDetails.className,
                department: classDetails.department,
                session: classDetails.session
            }
        };
    } catch (error) { // Include error in catch block for detailed logging if needed
        console.error("Error fetching class details:", error);
        return {
            status: 500,
            message: "Server error"
        };
    }
};


export const classUpdate = async (classId: string, updatedData: ClassFormValues) => {
    try {
        await databaseConnection();
        await Class.findByIdAndUpdate(classId, updatedData, { new: true });
        return {
            status: 200,
            message: "Class updated successfully",
        };

    } catch {
        return {
            status: 500,
            message: "An error occurred while updating class",
        };
    }
}

export const deleteClassAndStudents = async (classId: string) => {
    try {
        await databaseConnection();

        try {
            // Delete the class document from the Class collection
            const classDeleteResult = await Class.deleteOne({ _id: classId });

            if (classDeleteResult.deletedCount === 0) {
                return {
                    status: 404,
                    message: "Class not found"
                };
            }
            const deleteStudentResult = await Student.deleteMany({ classId: classId });
            if (deleteStudentResult.deletedCount === 0) {
                return {
                    status: 404,
                    message: "No students found in this class"
                };
            }

            return {
                status: 200,
                message: "Class and related students deleted successfully"
            };
        } catch (error) {
            console.error("Error deleting class and students:", error);
            return {
                status: 500,
                message: "Error occurred while deleting class and students"
            };
        }
    } catch (error) {
        console.error("Database connection error:", error);
        return {
            status: 500,
            message: "Server error"
        };
    }
};