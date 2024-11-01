"use client"; 
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { teacherSchema } from '@/schema/course';
import { Typography } from '@/components/ui/typography';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface UpdateTeacherValues {
  teacherName: string;
  teacherDepartment: string;
  courses: {
    courseName: string;
    startTime: string;
    days: string[];
    className: string;
  }[];
}

const UpdateTeacher = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateTeacherValues>({
    resolver: zodResolver(teacherSchema)
  });
  

  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
  });
  const onSubmit = (data:any) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Typography className="text-2xl font-bold mb-6">Update Teacher</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Teacher Name</label>
            <input
              {...register('teacherName', {
                required: 'Teacher name is required',
                minLength: {
                  value: 3,
                  message: 'Teacher name must be at least 3 characters long',
                },
                maxLength: {
                  value: 256,
                  message: 'Teacher name must be less than 256 characters',
                },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.teacherName && <p className="text-red-500 text-sm mt-1">{errors.teacherName.message}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Department</label>
            <input
              {...register('teacherDepartment', {
                required: 'Department is required',
                minLength: {
                  value: 2,
                  message: 'Department name must be at least 2 characters long',
                },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.teacherDepartment && <p className="text-red-500 text-sm mt-1">{errors.teacherDepartment.message}</p>}
          </div>
        </div>

        {/* Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography className="text-xl font-semibold">Courses</Typography>
            <button
              type="button"
              onClick={() => append({ courseName: '', startTime: '', days: [], className: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus size={16} />
              Add Course
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
                  <label className="block text-white text-sm font-medium mb-1">Course Name</label>
                  <input
                    {...register(`courses.${index}.courseName`, {
                      required: 'Course name is required',
                    })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.courses?.[index]?.courseName && (
                    <p className="text-red-500 text-sm mt-1">{errors.courses[index].courseName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Class Name</label>
                  <input
                    {...register(`courses.${index}.className`, {
                      required: 'Class name is required',
                    })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.courses?.[index]?.className && (
                    <p className="text-red-500 text-sm mt-1">{errors.courses[index].className.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    {...register(`courses.${index}.startTime`, {
                      required: 'Start time is required',
                    })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.courses?.[index]?.startTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.courses[index].startTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Days</label>
                  <div className="space-y-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <label key={day} className="text-white flex items-center">
                        <input
                          type="checkbox"
                          {...register(`courses.${index}.days`, {
                            validate: (value) => value.length > 0 || 'At least one day must be selected',
                          })}
                          value={day}
                          className="mr-2"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                  {errors.courses?.[index]?.days && (
                    <p className="text-red-500 text-sm mt-1">{errors.courses[index].days.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default UpdateTeacher;
