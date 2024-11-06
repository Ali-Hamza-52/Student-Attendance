"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/ui/typography";
import useToast from "@/hooks/useToast";
import { UpdateCourseFormValues } from "@/types/courseType";
import { updateCourse } from "@/services/course/courses";
import { updateCourses } from "@/schema/updateCourse";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const UpdateCourse = ({
  id,
  teachers,
  course,
}: {
  id: string;
  course: {
    _id: string;
    classId: string;
    teacherName: string;
    courseName: string;
    startTime: string;
    days: string[];
    className: string;
    __v: number;
  };
  teachers: {
    teacherName: string;
    department: string;
    id: string;
  }[];
}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UpdateCourseFormValues>({
    resolver: zodResolver(updateCourses),
    defaultValues: {
      courseName: course.courseName,
      className: course.className,
      startTime: course.startTime,
      days: course.days,
      teacherName: course.teacherName,
      classId: course.classId,
    },
  });

  useEffect(() => {
    // Set the initial classId once on mount
    setValue("classId", course.classId);
  }, [course.classId, setValue]);

  const onSubmit = async (data: UpdateCourseFormValues) => {
    console.log("Form Data:", data);
    try {
      const res = await updateCourse(id, data);
      if (res.status === 200) {
        toast.showSuccess("Course updated successfully");
        window.location.replace("/dashboard/class");
      }
    } catch {
      toast.showError("Failed to update course");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Typography className="text-2xl font-bold mb-6">Update Course</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-4 border rounded-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Course Name
              </label>
              <input
                {...register("courseName")}
                className="w-full p-2 border rounded-md"
              />
              {errors.courseName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Class Name
              </label>
              <input
                {...register("className")}
                className="w-full p-2 border rounded-md"
              />
              {errors.className && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.className.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                {...register("startTime")}
                className="w-full p-2 border rounded-md"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Select Teacher
              </label>
              <select
                {...register("teacherName")}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.teacherName}>
                    {teacher.teacherName} - {teacher.department}
                  </option>
                ))}
              </select>
              {errors.teacherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teacherName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Days
              </label>
              <div className="space-y-2">
                {DAYS_OF_WEEK.map((day) => (
                  <label key={day} className="text-white flex items-center">
                    <input
                      type="checkbox"
                      {...register("days")}
                      value={day}
                      className="mr-2"
                      checked={watch("days")?.includes(day)}
                      onChange={(e) => {
                        const selectedDays = watch("days") || [];
                        if (e.target.checked) {
                          selectedDays.push(day);
                        } else {
                          const index = selectedDays.indexOf(day);
                          if (index > -1) selectedDays.splice(index, 1);
                        }
                        setValue("days", selectedDays);
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
              {errors.days && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.days.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
