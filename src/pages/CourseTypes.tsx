import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import CourseTypeForm from '../components/CourseTypeForm';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CourseTypes = () => {
  const { courseTypes, deleteCourseType } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseType, setSelectedCourseType] = useState<string | null>(null);

  const handleAddClick = () => {
    setSelectedCourseType(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    setSelectedCourseType(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      deleteCourseType(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Types</h1>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          Add Course Type
        </Button>
      </div>

      {courseTypes.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No course types available</p>
          <Button onClick={handleAddClick} variant="outline">Add Your First Course Type</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseTypes.map((courseType) => (
            <Card key={courseType.id} className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{courseType.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(courseType.id)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(courseType.id)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCourseType ? 'Edit Course Type' : 'Add Course Type'}
      >
        <CourseTypeForm
          courseType={
            selectedCourseType
              ? courseTypes.find((ct) => ct.id === selectedCourseType)
              : undefined
          }
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CourseTypes;