"use client";
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

// Department options
const DEPARTMENTS = [
  'Computer', 'English', 'Urdu', 'Math', 'Physics', 'Chemistry',
  'Economics', 'Islamiyat', 'Physical Education'
]as const;

// Zod schema for form validation
const classSchema = z.object({
  department: z.enum(DEPARTMENTS, { required_error: 'Department is required' }),
  className: z.string().min(1, 'Class name is required'),
  students: z.array(z.object({
    studentName: z.string().min(1, 'Student name is required'),
    rollNumber: z.string().min(1, 'Roll number is required'),
    gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required' }),
    contactNumber: z.string().min(1, 'Contact number is required'),
    address: z.string().min(1, 'Address is required'),
  })),
});

interface ClassFormValues {
  department: string;
  className: string;
  students: {
    studentName: string;
    rollNumber: string;
    gender: string;
    contactNumber: string;
    address: string;
  }[];
}

const UpdateClass: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      students: [{ studentName: '', rollNumber: '', gender: '', contactNumber: '', address: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const onSubmit = (data: ClassFormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Typography className="text-2xl font-bold mb-6">Update Class</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Department</label>
            <select {...register('department')} className="w-full p-2 border rounded-md">
              <option value="">Select department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Class Name</label>
            <input
              {...register('className')}
              className="w-full p-2 border rounded-md"
            />
            {errors.className && <p className="text-red-500 text-sm mt-1">{errors.className.message}</p>}
          </div>
        </div>

        {/* Students Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography className="text-xl font-semibold">Students</Typography>
            <button
              type="button"
              onClick={() => append({ studentName: '', rollNumber: '', gender: '', contactNumber: '', address: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus size={16} />
              Add Student
            </button>
          </div>

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
                  <input
                    {...register(`students.${index}.studentName`)}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.students?.[index]?.studentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].studentName?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Roll Number</label>
                  <input
                    {...register(`students.${index}.rollNumber`)}
                    className="w-full p-2 border rounded-md"
                  />
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
                  <input
                    {...register(`students.${index}.contactNumber`)}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.students?.[index]?.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].contactNumber?.message}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-white text-sm font-medium mb-1">Address</label>
                  <input
                    {...register(`students.${index}.address`)}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.students?.[index]?.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.students[index].address?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateClass;
