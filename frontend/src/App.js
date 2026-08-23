import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
import ProtectedRoute from "./components/ProtectedRoute";
import MyLearning from "./pages/MyLearning";
import Profile from "./pages/Profile";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from './pages/instructor/CreateCourse';
import MyCourses from './pages/instructor/MyCourses';
import AdminDashboard from "./pages/AdminDashboard";
import CoursePlayer from './pages/CoursePlayer';
import InstructorLayout from "./layouts/InstructorLayout";

export default function App(){

  return(
    <BrowserRouter>
      <Navbar />
      <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:courseId/learn/:lessonId" element={<CoursePlayer />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route element={<ProtectedRoute roles={['admin']}/>}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute roles={['instructor']}/>}>
            <Route element={<InstructorLayout />}>
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/courses" element={<MyCourses />} />
              <Route path="/instructor/create-course" element={<CreateCourse />} />
            </Route>
          </Route>

      </Routes>
      <Footer />
    
    </BrowserRouter>
  );
}