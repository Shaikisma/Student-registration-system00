import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import CourseOfferingForm from '../components/CourseOfferingForm';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CourseOfferings = () => {
  const { 
    courseOfferings, 
    deleteCourseOffering,
    getCourseById,
    getCourseTypeById
  } = useAppContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseOffering, setSelectedCourseOffering] = useState<string | null>(null);

  const handleAddClick = () => {
    setSelectedCourseOffering(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    setSelectedCourseOffering(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      deleteCourseOffering(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Offerings</h1>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          Add Course Offering
        </Button>
      </div>

      {courseOfferings.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No course offerings available</p>
          <Button onClick={handleAddClick} variant="outline">Add Your First Course Offering</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseOfferings.map((offering) => {
            const course = getCourseById(offering.courseId);
            const courseType = getCourseTypeById(offering.courseTypeId);
            
            return (
              <Card key={offering.id} className="transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">
                        {course?.name}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(offering.id)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(offering.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {courseType?.name}
                    </div>
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
        title={selectedCourseOffering ? 'Edit Course Offering' : 'Add Course Offering'}
      >
        <CourseOfferingForm
          courseOffering={
            selectedCourseOffering
              ? courseOfferings.find((co) => co.id === selectedCourseOffering)
              : undefined
          }
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CourseOfferings;