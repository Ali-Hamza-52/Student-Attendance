"use client";
import { UserRoundMinus } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

const DeleteTeacher = () => {
  const deleteTeacher = () => {
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <button onClick={deleteTeacher} className="p-2 rounded-full flex justify-center items-center text-sm font-medium text-white bg-red-500  hover:bg-red-600 ">
      <UserRoundMinus size={15} />
    </button>
  );
};

export default DeleteTeacher;
