import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BookOpen, BookType, Users, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const { courseTypes, courses, courseOfferings, students, registrations } = useAppContext();

  // Calculate course offerings per course type
  const courseOfferingsByCourseType: Record<string, number> = {};
  courseTypes.forEach(ct => {
    courseOfferingsByCourseType[ct.id] = courseOfferings.filter(
      co => co.courseTypeId === ct.id
    ).length;
  });

  // Calculate registrations per course offering
  const registrationsByCourseOffering: Record<string, number> = {};
  courseOfferings.forEach(co => {
    registrationsByCourseOffering[co.id] = registrations.filter(
      r => r.courseOfferingId === co.id
    ).length;
  });

  // Get most popular course offering
  let mostPopularCourseOfferingId = '';
  let maxRegistrations = 0;
  
  Object.entries(registrationsByCourseOffering).forEach(([coId, count]) => {
    if (count > maxRegistrations) {
      maxRegistrations = count;
      mostPopularCourseOfferingId = coId;
    }
  });

  const mostPopularCourseOffering = courseOfferings.find(co => co.id === mostPopularCourseOfferingId);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Course Types</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{courseTypes.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookType className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Courses</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{courses.length}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Students</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{students.length}</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Registrations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{registrations.length}</h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <UserPlus className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Offerings by Course Type</CardTitle>
          </CardHeader>
          <CardContent>
            {courseTypes.length > 0 ? (
              <div className="space-y-4">
                {courseTypes.map(ct => (
                  <div key={ct.id} className="flex items-center">
                    <div className="w-32 font-medium">{ct.name}</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(courseOfferingsByCourseType[ct.id] / courseOfferings.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-right font-medium">
                      {courseOfferingsByCourseType[ct.id]}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No course types available</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Registration Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Most Popular Course Offering</h4>
                {mostPopularCourseOffering ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      {
                        `${useAppContext().getCourseTypeById(mostPopularCourseOffering.courseTypeId)?.name} - ${
                          useAppContext().getCourseById(mostPopularCourseOffering.courseId)?.name
                        }`
                      }
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">Registrations:</span>
                      <span className="ml-2 font-bold text-blue-600">{maxRegistrations}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No registrations yet</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Registrations</h4>
                {registrations.length > 0 ? (
                  <div className="space-y-2">
                    {registrations.slice(0, 3).map(reg => {
                      const student = useAppContext().getStudentById(reg.studentId);
                      const courseOffering = useAppContext().getCourseOfferingById(reg.courseOfferingId);
                      
                      if (!student || !courseOffering) return null;
                      
                      const course = useAppContext().getCourseById(courseOffering.courseId);
                      const courseType = useAppContext().getCourseTypeById(courseOffering.courseTypeId);
                      
                      return (
                        <div key={reg.id} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">
                            {courseType?.name} - {course?.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Registered on: {new Date(reg.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">No registrations yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;