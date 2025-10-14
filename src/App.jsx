import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div className='min-h-screen bg-white'>
      <Header className="fixed"/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
