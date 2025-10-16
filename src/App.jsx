import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <div className='min-h-screen'>
      <Header className="fixed"/>
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
