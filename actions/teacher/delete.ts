"use server";
import { deleteTeacher } from "@/services/teacher/user";

export const deleteTeachers = async (id:string)=>{
    try{
        const res = await deleteTeacher(id);
        if(res.status === 200)
            return true;
        return false;
    }
    catch{
        return false;
    }
}