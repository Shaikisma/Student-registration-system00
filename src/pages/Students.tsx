import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import StudentForm from '../components/StudentForm';
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';

const Students = () => {
  const { students, deleteStudent } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleAddClick = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    setSelectedStudent(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button onClick={handleAddClick} className="flex items-center">
          <Plus size={18} className="mr-1" />
          Add Student
        </Button>
      </div>

      {students.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No students available</p>
          <Button onClick={handleAddClick} variant="outline">Add Your First Student</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {students.map((student) => (
            <Card key={student.id} className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={16} className="mr-2" />
                        {student.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={16} className="mr-2" />
                        {student.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(student.id)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student.id)}
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
        title={selectedStudent ? 'Edit Student' : 'Add Student'}
      >
        <StudentForm
          student={
            selectedStudent
              ? students.find((s) => s.id === selectedStudent)
              : undefined
          }
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Students;