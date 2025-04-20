import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import CourseForm from '../components/CourseForm';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';

const Courses = () => {
  const { courses, deleteCourse } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleAddClick = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    setSelectedCourse(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          Add Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No courses available</p>
          <Button onClick={handleAddClick} variant="outline">Add Your First Course</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 mr-3 bg-blue-100 rounded-full">
                      <BookOpen size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(course.id)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course.id)}
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
        title={selectedCourse ? 'Edit Course' : 'Add Course'}
      >
        <CourseForm
          course={
            selectedCourse
              ? courses.find((c) => c.id === selectedCourse)
              : undefined
          }
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Courses;