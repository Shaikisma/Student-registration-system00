export interface CourseType {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
}

export interface CourseOffering {
  id: string;
  courseId: string;
  courseTypeId: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface StudentRegistration {
  id: string;
  studentId: string;
  courseOfferingId: string;
  registrationDate: string;
}