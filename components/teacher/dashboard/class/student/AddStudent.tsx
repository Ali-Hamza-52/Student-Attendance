"use client";
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import useToast from '@/hooks/useToast';
import { studentSchema } from '@/schema/student';
import { StudentFormValues } from '@/types/studentType';
import { addStudents } from '@/services/student/student';

const AddStudent = ({id}:{id:string}) => {
  const toast = useToast();
  const { register, control, handleSubmit, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      students: [{ studentName: '', rollNumber: '', gender: '',classId:id , contactNumber: '', address: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const onSubmit = async (data: StudentFormValues) => {
    try{
      const result = await addStudents(data);

      console.log("result: " , result)

      if(result.status ===200){
        toast.showSuccess("Student(s) added successfully!");
      }

      if(result.status ===400){
        toast.showError(result.message);
      }
      if(result.status ===401){
        toast.showError(result.message);
      }
    }catch{
      toast.showError("Failed to add student(s). Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Typography className="text-2xl font-bold mb-6">Add New Student(s)</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <Typography className="font-medium">Student {index + 1}</Typography>
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
                  <label className="block text-white text-sm font-medium mb-1">Student Name</label>
                  <input {...register(`students.${index}.studentName`)} className="w-full p-2 border rounded-md" />
                  {errors.students?.[index]?.studentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].studentName?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Roll Number</label>
                  <input {...register(`students.${index}.rollNumber`)} className="w-full p-2 border rounded-md" />
                  {errors.students?.[index]?.rollNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].rollNumber?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Gender</label>
                  <select {...register(`students.${index}.gender`)} className="w-full p-2 border rounded-md">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.students?.[index]?.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].gender?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Contact Number</label>
                  <input {...register(`students.${index}.contactNumber`)} className="w-full p-2 border rounded-md" />
                  {errors.students?.[index]?.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].contactNumber?.message}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-white text-sm font-medium mb-1">Address</label>
                  <input {...register(`students.${index}.address`)} className="w-full p-2 border rounded-md" />
                  {errors.students?.[index]?.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].address?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => append({ studentName: '', rollNumber: '',classId:id  ,gender: '', contactNumber: '', address: '' })}
            className="flex items-center text-blue-500 hover:text-blue-700 mt-4"
          >
            <Plus size={16} />
            <span className="ml-2">Add Another Student</span>
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
