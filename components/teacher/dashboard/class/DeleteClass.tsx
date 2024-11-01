"use client";
import { deleteClassAndStudents } from "@/services/class/class";
import { UserRoundMinus } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const DeleteClass = ({id}:{id:String}) => {
  const deleteClass = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        deleteClassAndStudents(id).then((result) => {
          console.log("result: ", result)
          if (result.status === 200 || result.status === 404) {
            console.log("Class and students deleted successfully");
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            window.location.reload();
          } else {
            console.error("Failed to delete class and students");
            Swal.fire({
              title: "Error",
              text: "Failed to delete class and students",
              icon: "error",
            });
          }
        })
      }
    });
  };
  return (
    <button onClick={deleteClass} className="p-2 rounded-full flex justify-center items-center text-sm font-medium text-white bg-red-500  hover:bg-red-600 ">
      <UserRoundMinus size={15} />
    </button>
  );
};

export default DeleteClass;
