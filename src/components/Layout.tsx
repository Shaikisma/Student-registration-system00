import React, { useState } from 'react';
import { Tabs, TabsProvider, TabsList, TabsTrigger } from './ui/Tabs';
import { Home, BookOpen, BookType, Users, UserPlus, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return children[0];
      case 'courseTypes':
        return children[1];
      case 'courses':
        return children[2];
      case 'courseOfferings':
        return children[3];
      case 'students':
        return children[4];
      case 'registrations':
        return children[5];
      default:
        return children[0];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-black text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <GraduationCap size={32} className="text-white" />
            <h1 className="text-2xl font-bold tracking-tight">Student Registration System</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <TabsProvider value={activeTab} onValueChange={setActiveTab}>
          <Tabs>
            <TabsList className="mb-8 p-1.5 bg-white rounded-lg shadow-xl flex overflow-x-auto space-x-1 border border-gray-100">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2 px-5 py-2.5 rounded-md transition-all duration-200">
                <Home size={18} />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="courseTypes" className="flex items-center space-x-2 px-5 py-2.5 rounded-md transition-all duration-200">
                <BookType size={18} />
                <span>Course Types</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center space-x-2 px-5 py-2.5 rounded-md transition-all duration-200">
                <BookOpen size={18} />
                <span>Courses</span>
              </TabsTrigger>
              <TabsTrigger value="courseOfferings" className="flex items-center space-x-2 px-5 py-2.5 rounded-md transition-all duration-200">
                <BookOpen size={18} />
                <span>Course Offerings</span>
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center space-x-2 px-5 py-2.5 rounded-md transition-all duration-200">
                <Users size={18} />
                <span>Students</span>
              </TabsTrigger>
              <TabsTrigger value="registrations" className="flex items-center space-x-2 px-5 py-2.5 rounded-md transition-all duration-200">
                <UserPlus size={18} />
                <span>Registrations</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-xl shadow-xl p-8 min-h-[calc(100vh-20rem)] border border-gray-100">
              {getActiveContent()}
            </div>
          </Tabs>
        </TabsProvider>
      </main>
      
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2025 Student Registration System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;