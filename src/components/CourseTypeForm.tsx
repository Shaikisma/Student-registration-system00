import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAppContext } from '../context/AppContext';
import { CourseType } from '../types';

interface CourseTypeFormProps {
  courseType?: CourseType;
  onSubmit: () => void;
}

const CourseTypeForm: React.FC<CourseTypeFormProps> = ({ courseType, onSubmit }) => {
  const { addCourseType, updateCourseType } = useAppContext();
  const [name, setName] = useState(courseType?.name || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Course type name is required');
      return;
    }
    
    if (courseType) {
      updateCourseType(courseType.id, name);
    } else {
      addCourseType({ name });
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Course Type Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        placeholder="Enter course type name"
        error={error}
        required
      />
      
      <div className="flex justify-end mt-4">
        <Button type="submit">
          {courseType ? 'Update Course Type' : 'Add Course Type'}
        </Button>
      </div>
    </form>
  );
};

export default CourseTypeForm;