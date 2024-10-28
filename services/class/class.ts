"use server"

import databaseConnection from "@/database/connection"
import { Class } from "@/schema/class";
import { ClassFormTypes } from "@/types/classType";

export const addNewClass = async (data: ClassFormTypes) => {
    try {
        await databaseConnection();
        const newClass = new Class(data);
        await newClass.save();

        return {
            status: 200,
            message: "New class added successfully"
        }
    } catch {
        return {
            status: 500,
            message: "Server error"
        }
    }

}