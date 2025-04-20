import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CourseType, Course, CourseOffering, Student, StudentRegistration } from '../types';

interface AppContextType {
  courseTypes: CourseType[];
  courses: Course[];
  courseOfferings: CourseOffering[];
  students: Student[];
  registrations: StudentRegistration[];
  addCourseType: (courseType: Omit<CourseType, 'id'>) => void;
  updateCourseType: (id: string, name: string) => void;
  deleteCourseType: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, name: string) => void;
  deleteCourse: (id: string) => void;
  addCourseOffering: (courseOffering: Omit<CourseOffering, 'id'>) => void;
  updateCourseOffering: (id: string, courseId: string, courseTypeId: string) => void;
  deleteCourseOffering: (id: string) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  addRegistration: (registration: Omit<StudentRegistration, 'id'>) => void;
  deleteRegistration: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  getCourseTypeById: (id: string) => CourseType | undefined;
  getCourseOfferingById: (id: string) => CourseOffering | undefined;
  getStudentById: (id: string) => Student | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 9);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>(() => {
    const saved = localStorage.getItem('courseTypes');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue.length ? initialValue : [
      { id: generateId(), name: 'Individual' },
      { id: generateId(), name: 'Group' },
      { id: generateId(), name: 'Special' }
    ];
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('courses');
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue.length ? initialValue : [
      { id: generateId(), name: 'Hindi' },
      { id: generateId(), name: 'English' },
      { id: generateId(), name: 'Urdu' }
    ];
  });

  const [courseOfferings, setCourseOfferings] = useState<CourseOffering[]>(() => {
    const saved = localStorage.getItem('courseOfferings');
    return saved ? JSON.parse(saved) : [];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    const saved = localStorage.getItem('registrations');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('courseTypes', JSON.stringify(courseTypes));
  }, [courseTypes]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('courseOfferings', JSON.stringify(courseOfferings));
  }, [courseOfferings]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  // Course Type functions
  const addCourseType = ({ name }: Omit<CourseType, 'id'>) => {
    setCourseTypes([...courseTypes, { id: generateId(), name }]);
  };

  const updateCourseType = (id: string, name: string) => {
    setCourseTypes(courseTypes.map(ct => ct.id === id ? { ...ct, name } : ct));
  };

  const deleteCourseType = (id: string) => {
    // Check if the course type is used in any course offering
    const isUsed = courseOfferings.some(co => co.courseTypeId === id);
    if (isUsed) {
      alert('Cannot delete this course type as it is being used in course offerings.');
      return;
    }
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
  };

  // Course functions
  const addCourse = ({ name }: Omit<Course, 'id'>) => {
    setCourses([...courses, { id: generateId(), name }]);
  };

  const updateCourse = (id: string, name: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, name } : c));
  };

  const deleteCourse = (id: string) => {
    // Check if the course is used in any course offering
    const isUsed = courseOfferings.some(co => co.courseId === id);
    if (isUsed) {
      alert('Cannot delete this course as it is being used in course offerings.');
      return;
    }
    setCourses(courses.filter(c => c.id !== id));
  };

  // Course Offering functions
  const addCourseOffering = ({ courseId, courseTypeId }: Omit<CourseOffering, 'id'>) => {
    // Check if this combination already exists
    const exists = courseOfferings.some(
      co => co.courseId === courseId && co.courseTypeId === courseTypeId
    );
    
    if (exists) {
      alert('This course offering combination already exists.');
      return;
    }
    
    setCourseOfferings([...courseOfferings, { id: generateId(), courseId, courseTypeId }]);
  };

  const updateCourseOffering = (id: string, courseId: string, courseTypeId: string) => {
    // Check if the new combination already exists
    const exists = courseOfferings.some(
      co => co.id !== id && co.courseId === courseId && co.courseTypeId === courseTypeId
    );
    
    if (exists) {
      alert('This course offering combination already exists.');
      return;
    }
    
    setCourseOfferings(
      courseOfferings.map(co => 
        co.id === id ? { ...co, courseId, courseTypeId } : co
      )
    );
  };

  const deleteCourseOffering = (id: string) => {
    // Check if this course offering is used in any registration
    const isUsed = registrations.some(reg => reg.courseOfferingId === id);
    if (isUsed) {
      alert('Cannot delete this course offering as it has student registrations.');
      return;
    }
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
  };

  // Student functions
  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents([...students, { id: generateId(), ...student }]);
  };

  const updateStudent = (id: string, student: Omit<Student, 'id'>) => {
    setStudents(students.map(s => s.id === id ? { id, ...student } : s));
  };

  const deleteStudent = (id: string) => {
    // Check if this student has any registrations
    const isRegistered = registrations.some(reg => reg.studentId === id);
    if (isRegistered) {
      alert('Cannot delete this student as they have active registrations.');
      return;
    }
    setStudents(students.filter(s => s.id !== id));
  };

  // Registration functions
  const addRegistration = ({ studentId, courseOfferingId, registrationDate }: Omit<StudentRegistration, 'id'>) => {
    // Check if this student is already registered for this course offering
    const exists = registrations.some(
      r => r.studentId === studentId && r.courseOfferingId === courseOfferingId
    );
    
    if (exists) {
      alert('This student is already registered for this course offering.');
      return;
    }
    
    setRegistrations([...registrations, { 
      id: generateId(), 
      studentId, 
      courseOfferingId, 
      registrationDate 
    }]);
  };

  const deleteRegistration = (id: string) => {
    setRegistrations(registrations.filter(r => r.id !== id));
  };

  // Helper functions to get entities by ID
  const getCourseById = (id: string) => courses.find(c => c.id === id);
  const getCourseTypeById = (id: string) => courseTypes.find(ct => ct.id === id);
  const getCourseOfferingById = (id: string) => courseOfferings.find(co => co.id === id);
  const getStudentById = (id: string) => students.find(s => s.id === id);

  const contextValue: AppContextType = {
    courseTypes,
    courses,
    courseOfferings,
    students,
    registrations,
    addCourseType,
    updateCourseType,
    deleteCourseType,
    addCourse,
    updateCourse,
    deleteCourse,
    addCourseOffering,
    updateCourseOffering,
    deleteCourseOffering,
    addStudent,
    updateStudent,
    deleteStudent,
    addRegistration,
    deleteRegistration,
    getCourseById,
    getCourseTypeById,
    getCourseOfferingById,
    getStudentById,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};