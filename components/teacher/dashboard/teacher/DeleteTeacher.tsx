"use client";
import { UserRoundMinus } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";
import { deleteTeacher } from "@/services/teacher/user";
import { useRouter } from "next/navigation";

const DeleteTeacher = ({ teacherId }: { teacherId: string }) => {
  const router = useRouter();

  const teacherDeleted = () => {
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
        // Execute deleteTeacher and handle responses
        deleteTeacher(teacherId)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "The teacher has been deleted.",
                icon: "success",
              });
              router.push('/dashboard/teacher');
            } else {
              Swal.fire({
                title: "Error",
                text: "Failed to delete teacher",
                icon: "error",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "An error occurred while trying to delete the teacher.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <button
      onClick={teacherDeleted}
      className="p-2 rounded-full flex justify-center items-center text-sm font-medium text-white bg-red-500 hover:bg-red-600"
    >
      <UserRoundMinus size={15} />
    </button>
  );
};

export default DeleteTeacher;
