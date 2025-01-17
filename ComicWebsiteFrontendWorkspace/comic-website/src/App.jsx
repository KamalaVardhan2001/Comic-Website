import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import ComicsList from './components/ComicsList/ComicsList'
import Comic from './components/Comic/Comic'
import Chapter from './components/Chapter/Chapter'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/comic/:comicId" element={<Comic />} />
      <Route path="/comic/:comicId/chapter/:chapId" element={<Chapter />} />
    </Routes>
  )
}

export default App
