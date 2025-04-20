import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAppContext } from '../context/AppContext';
import { Student } from '../types';

interface StudentFormProps {
  student?: Student;
  onSubmit: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSubmit }) => {
  const { addStudent, updateStudent } = useAppContext();
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? 'Name is required' : '',
      email: !formData.email.trim() 
        ? 'Email is required' 
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) 
          ? 'Please enter a valid email'
          : '',
      phone: !formData.phone.trim() 
        ? 'Phone number is required' 
        : !/^\d{10}$/.test(formData.phone.replace(/\D/g, '')) 
          ? 'Please enter a valid 10-digit phone number'
          : ''
    };
    
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (student) {
      updateStudent(student.id, formData);
    } else {
      addStudent(formData);
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter full name"
        error={errors.name}
        required
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email address"
        error={errors.email}
        required
      />
      
      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
        error={errors.phone}
        required
      />
      
      <div className="flex justify-end mt-4">
        <Button type="submit">
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;