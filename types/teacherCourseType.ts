interface course {
    courseName: string;
    startTime: string;
    days: string[];
    className: string;
  }
  
  export interface teacherCourseType {
    teacherName: string;
    teacherDepartment: string;
    courses: course[];
  }
  