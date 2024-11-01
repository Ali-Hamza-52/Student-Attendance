"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScanFace } from "lucide-react";
import { SignupFormInputs, signupSchema } from "@/schema/signup";
import { postTeacher } from "@/services/teacher/user";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await postTeacher(data);
      console.log(response);
      if(response.status === 200){
        toast.showSuccess(response.message);
        router.push("/login")
      }

      if(response.status === 409){
        toast.showError("Email already in use.");
      }
    } catch {
      toast.showError("An error occurred while creating the account.");
    }
  };

  return (
    <div className="max-w-lg mt-5 mx-auto bg-white flex min-h-full flex-col justify-center px-6 py-6 lg:px-8 shadow-2xl rounded-3xl">
      <div className="flex justify-center">
        <ScanFace color="blue" size={35} />
      </div>
      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-4 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <div>
          <label
            htmlFor="teacherName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Teacher Name
          </label>
          <input
            id="teacherName"
            {...register("teacherName")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.teacherName
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          />
          {errors.teacherName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.teacherName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="teacherEmail"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Teacher Email
          </label>
          <input
            id="teacherEmail"
            {...register("email")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.email
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Contact Number
          </label>
          <input
            id="contactNumber"
            {...register("contactNumber")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.contactNumber
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          />
          {errors.contactNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Department
          </label>
          <select
            id="department"
            {...register("department")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.department
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          >
            <option value="">Select Department</option>
            <option value="Arts">Arts</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Commerce">Commerce</option>
            <option value="Computer">Computer</option>
            <option value="Economics">Economics</option>
            <option value="English">English</option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Islamiyat">Islamiyat</option>
            <option value="Literature">Literature</option>
            <option value="Mathematics">Mathematics</option>
            <option value="PakStudy">Pak Study</option>
            <option value="Physics">Physics</option>
            <option value="Sociology">Sociology</option>
            <option value="Urdu">Urdu</option>
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-500">
              {errors.department.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.password
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.confirmPassword
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address
          </label>
          <input
            id="address"
            {...register("address")}
            className={`block w-full rounded-md px-3 focus-within:ring-blue-500 focus:outline-blue-500 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
              errors.address
                ? "ring-red-500 focus:ring-red-500"
                : "ring-gray-300 focus:ring-indigo-600"
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Sign up
        </button>
      </form>
      <p className="mt-3 text-center text-sm text-gray-500">
        Alread Register?
        <a
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:underline hover:text-indigo-500"
        >
          {" "}
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
