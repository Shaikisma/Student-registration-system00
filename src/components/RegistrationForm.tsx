import React, { useState } from 'react';
import Select from './ui/Select';
import Button from './ui/Button';
import { useAppContext } from '../context/AppContext';

interface RegistrationFormProps {
  onSubmit: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const { 
    courseTypes,
    courseOfferings, 
    courses,
    students,
    addRegistration,
    getCourseById,
    getCourseTypeById
  } = useAppContext();
  
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const [studentId, setStudentId] = useState('');
  
  const [errors, setErrors] = useState({
    courseTypeId: '',
    courseOfferingId: '',
    studentId: ''
  });

  // Filter course offerings based on selected course type
  const filteredCourseOfferings = selectedCourseTypeId
    ? courseOfferings.filter(co => co.courseTypeId === selectedCourseTypeId)
    : courseOfferings;

  const courseOfferingOptions = filteredCourseOfferings.map(co => {
    const course = getCourseById(co.courseId);
    const courseType = getCourseTypeById(co.courseTypeId);
    return {
      value: co.id,
      label: `${courseType?.name} - ${course?.name}`
    };
  });

  const validateForm = () => {
    const newErrors = {
      courseTypeId: selectedCourseTypeId ? '' : 'Please select a course type',
      courseOfferingId: courseOfferingId ? '' : 'Please select a course offering',
      studentId: studentId ? '' : 'Please select a student'
    };
    
    setErrors(newErrors);
    return !newErrors.courseOfferingId && !newErrors.studentId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    addRegistration({
      studentId,
      courseOfferingId,
      registrationDate: new Date().toISOString().split('T')[0]
    });
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Filter by Course Type"
        options={courseTypes.map(ct => ({
          value: ct.id,
          label: ct.name
        }))}
        value={selectedCourseTypeId}
        onChange={(value) => {
          setSelectedCourseTypeId(value);
          setCourseOfferingId(''); // Reset selected course offering when course type changes
          setErrors(prev => ({ ...prev, courseTypeId: '' }));
        }}
        error={errors.courseTypeId}
      />
      
      <Select
        label="Course Offering"
        options={courseOfferingOptions}
        value={courseOfferingId}
        onChange={(value) => {
          setCourseOfferingId(value);
          setErrors(prev => ({ ...prev, courseOfferingId: '' }));
        }}
        error={errors.courseOfferingId}
        required
      />
      
      <Select
        label="Student"
        options={students.map(student => ({
          value: student.id,
          label: `${student.name} (${student.email})`
        }))}
        value={studentId}
        onChange={(value) => {
          setStudentId(value);
          setErrors(prev => ({ ...prev, studentId: '' }));
        }}
        error={errors.studentId}
        required
      />
      
      <div className="flex justify-end mt-4">
        <Button type="submit">
          Register Student
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;