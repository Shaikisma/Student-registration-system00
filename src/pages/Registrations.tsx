import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import RegistrationForm from '../components/RegistrationForm';
import Select from '../components/ui/Select';
import { Plus, Trash2, Calendar, BookOpen } from 'lucide-react';

const Registrations = () => {
  const { 
    registrations, 
    courseOfferings,
    courseTypes,
    students,
    deleteRegistration,
    getCourseById,
    getCourseTypeById,
    getStudentById
  } = useAppContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseOffering, setSelectedCourseOffering] = useState('');

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to remove this registration?')) {
      deleteRegistration(id);
    }
  };

  // Filtered registrations based on selected course offering
  const filteredRegistrations = selectedCourseOffering
    ? registrations.filter(r => r.courseOfferingId === selectedCourseOffering)
    : registrations;

  // Generate course offering options for the filter
  const courseOfferingOptions = courseOfferings.map(co => {
    const course = getCourseById(co.courseId);
    const courseType = getCourseTypeById(co.courseTypeId);
    return {
      value: co.id,
      label: `${courseType?.name} - ${course?.name}`
    };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Registrations</h1>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          New Registration
        </Button>
      </div>

      <div className="mb-6">
        <Select
          label="Filter by Course Offering"
          options={courseOfferingOptions}
          value={selectedCourseOffering}
          onChange={setSelectedCourseOffering}
        />
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">
            {selectedCourseOffering
              ? 'No registrations found for this course offering'
              : 'No registrations available'}
          </p>
          <Button onClick={handleAddClick} variant="outline">Register a Student</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Group registrations by course offering */}
          {courseOfferings.filter(co => 
            filteredRegistrations.some(r => r.courseOfferingId === co.id)
          ).map(courseOffering => {
            const course = getCourseById(courseOffering.courseId);
            const courseType = getCourseTypeById(courseOffering.courseTypeId);
            const offeringRegistrations = filteredRegistrations.filter(
              r => r.courseOfferingId === courseOffering.id
            );
            
            return (
              <Card key={courseOffering.id} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center">
                    <BookOpen size={18} className="mr-2 text-blue-600" />
                    {courseType?.name} - {course?.name}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({offeringRegistrations.length} student{offeringRegistrations.length !== 1 ? 's' : ''})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {offeringRegistrations.map(registration => {
                      const student = getStudentById(registration.studentId);
                      
                      if (!student) return null;
                      
                      return (
                        <div key={registration.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{student.name}</h4>
                              <div className="flex items-center mt-1 text-sm text-gray-600">
                                <Calendar size={14} className="mr-1" />
                                Registered on: {new Date(registration.registrationDate).toLocaleDateString()}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteClick(registration.id)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register a Student"
      >
        <RegistrationForm onSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Registrations;