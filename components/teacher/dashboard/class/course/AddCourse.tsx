"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { courseSchema } from "@/schema/course";
import { Typography } from "@/components/ui/typography";
import useToast from "@/hooks/useToast";
import { CourseFormValues } from "@/types/courseType";
import { addCourse } from "@/services/course/courses";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AddCourse = ({
  id,
  teachers,
}: {
  id: string;
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
    setValue,
    control,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courses: [
        {
          classId: id,
          courseName: "",
          teacherName: "",
          startTime: "",
          days: [],
          className: "",
          teacherId: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const onSubmit = async (data: CourseFormValues) => {
    try {
      const res = await addCourse(data);
      if (res.status === 200) {
        toast.showSuccess("Courses added successfully");
        window.location.replace("/dashboard/class");
      }
    } catch {
      toast.showError("Failed to add courses");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Typography className="text-2xl font-bold mb-6">Add Courses</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <Typography className="text-xl font-semibold">Courses</Typography>
          <button
            type="button"
            onClick={() =>
              append({
                classId: id,
                courseName: "",
                startTime: "",
                days: [],
                className: "",
                teacherName: "",
                teacherId: "",
              })
            }
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={16} /> Add Course
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <Typography className="font-medium">Course {index + 1}</Typography>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Course Name
                </label>
                <input
                  {...register(`courses.${index}.courseName`)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.courses?.[index]?.courseName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.courses[index].courseName?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Class Name
                </label>
                <input
                  {...register(`courses.${index}.className`)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.courses?.[index]?.className && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.courses[index].className?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  {...register(`courses.${index}.startTime`)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.courses?.[index]?.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.courses[index].startTime?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Select Teacher
                </label>
                <select
                  {...register(`courses.${index}.teacherName`)}
                  onChange={(e) => {
                    const selectedTeacher = teachers.find(
                      (teacher) => teacher.teacherName === e.target.value
                    );
                    if (selectedTeacher) {
                      setValue(`courses.${index}.teacherId`, selectedTeacher.id);
                    }
                  }}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.teacherName}>
                      {teacher.teacherName} - {teacher.department}
                    </option>
                  ))}
                </select>
                {errors.courses?.[index]?.teacherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.courses[index].teacherName?.message}
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
                        {...register(`courses.${index}.days`)}
                        value={day}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  ))}
                </div>
                {errors.courses?.[index]?.days && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.courses[index].days?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Courses
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
