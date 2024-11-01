"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/components/ui/typography';
import useToast from '@/hooks/useToast';
import { classUpdate } from '@/services/class/class';
import { DEPARTMENTS } from '@/localDb/departments';
import { classSchema } from '@/schema/class';
import { ClassFormValues } from '@/types/classType';
import { useRouter } from 'next/navigation';

interface UpdateClassProps {
  id: string;
  data: {
    department: string;
    name: string;
    session: string;
  };
}

const UpdateClass = ({ id, data }: UpdateClassProps) => {
  const router = useRouter();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      department: data?.department || "",
      className: data?.name || "",
      session: data?.session || "",
    }
  });

  const onSubmit = async (data: ClassFormValues) => {
    try {
      const result = await classUpdate(id,data);
      if (result.status === 200) {
        toast.showSuccess("Class updated successfully!");
        window.location.replace("/dashboard/class");
      }
    } catch {
      toast.showError("Failed to add class. Please try again.");
    }
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
            <input {...register('className')} className="w-full p-2 border rounded-md" />
            {errors.className && <p className="text-red-500 text-sm mt-1">{errors.className.message}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Session</label>
            <select {...register('session')} className="w-full p-2 border rounded-md">
              <option value="">Select session</option>
              {Array.from({ length: 31 }, (_, i) => (2020 + i).toString()).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.session && <p className="text-red-500 text-sm mt-1">{errors.session.message}</p>}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateClass;
