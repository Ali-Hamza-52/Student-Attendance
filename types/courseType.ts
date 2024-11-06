export interface CourseFormValues {
  courses: {
    courseName: string;
    classId: string;
    teacherName: string;
    startTime: string;
    days: string[];
    teacherId:string;
    className: string;
  }[];
}
export interface UpdateCourseFormValues {

  courseName: string;
  classId: string;
  teacherName: string;
  startTime: string;
  days: string[];
  className: string;

}