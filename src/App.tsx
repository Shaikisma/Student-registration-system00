import React from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CourseTypes from './pages/CourseTypes';
import Courses from './pages/Courses';
import CourseOfferings from './pages/CourseOfferings';
import Students from './pages/Students';
import Registrations from './pages/Registrations';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Layout>
        <Dashboard />
        <CourseTypes />
        <Courses />
        <CourseOfferings />
        <Students />
        <Registrations />
      </Layout>
    </AppProvider>
  );
}

export default App;