import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAppContext } from '../context/AppContext';
import { Course } from '../types';

interface CourseFormProps {
  course?: Course;
  onSubmit: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit }) => {
  const { addCourse, updateCourse } = useAppContext();
  const [name, setName] = useState(course?.name || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Course name is required');
      return;
    }
    
    if (course) {
      updateCourse(course.id, name);
    } else {
      addCourse({ name });
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Course Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        placeholder="Enter course name"
        error={error}
        required
      />
      
      <div className="flex justify-end mt-4">
        <Button type="submit">
          {course ? 'Update Course' : 'Add Course'}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;