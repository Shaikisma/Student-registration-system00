import React, { useState } from 'react';
import Select from './ui/Select';
import Button from './ui/Button';
import { useAppContext } from '../context/AppContext';
import { CourseOffering } from '../types';

interface CourseOfferingFormProps {
  courseOffering?: CourseOffering;
  onSubmit: () => void;
}

const CourseOfferingForm: React.FC<CourseOfferingFormProps> = ({ courseOffering, onSubmit }) => {
  const { 
    courses, 
    courseTypes, 
    addCourseOffering, 
    updateCourseOffering 
  } = useAppContext();
  
  const [courseId, setCourseId] = useState(courseOffering?.courseId || '');
  const [courseTypeId, setCourseTypeId] = useState(courseOffering?.courseTypeId || '');
  const [errors, setErrors] = useState({
    courseId: '',
    courseTypeId: ''
  });

  const validateForm = () => {
    const newErrors = {
      courseId: !courseId ? 'Please select a course' : '',
      courseTypeId: !courseTypeId ? 'Please select a course type' : ''
    };
    
    setErrors(newErrors);
    return !newErrors.courseId && !newErrors.courseTypeId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (courseOffering) {
      updateCourseOffering(courseOffering.id, courseId, courseTypeId);
    } else {
      addCourseOffering({ courseId, courseTypeId });
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Course"
        options={courses.map(course => ({
          value: course.id,
          label: course.name
        }))}
        value={courseId}
        onChange={(value) => {
          setCourseId(value);
          setErrors(prev => ({ ...prev, courseId: '' }));
        }}
        error={errors.courseId}
        required
      />
      
      <Select
        label="Course Type"
        options={courseTypes.map(courseType => ({
          value: courseType.id,
          label: courseType.name
        }))}
        value={courseTypeId}
        onChange={(value) => {
          setCourseTypeId(value);
          setErrors(prev => ({ ...prev, courseTypeId: '' }));
        }}
        error={errors.courseTypeId}
        required
      />
      
      <div className="flex justify-end mt-4">
        <Button type="submit">
          {courseOffering ? 'Update Course Offering' : 'Add Course Offering'}
        </Button>
      </div>
    </form>
  );
};

export default CourseOfferingForm;