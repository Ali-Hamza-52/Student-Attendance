export interface ClassFormTypes {
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
  