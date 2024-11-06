import UpdateCourse from "@/components/teacher/dashboard/class/course/UpdateCourse";
import { getCourseByCourseId } from "@/services/course/courses";
import { getTeachersNameAndId } from "@/services/teacher/user";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const teachersResponse = await getTeachersNameAndId();
  const courseResponse = await getCourseByCourseId(params.id);

  if (teachersResponse.status !== 200 || courseResponse.status !== 200) {
    return <h1>Server Error</h1>;
  }

  const teachers = JSON.parse(JSON.stringify(teachersResponse.data));
  const course = JSON.parse(JSON.stringify(courseResponse.data));

  return <UpdateCourse id={params.id} teachers={teachers} course={course} />;
};

export default Page;
