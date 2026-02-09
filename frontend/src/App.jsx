import { useState } from 'react'
import './App.css'
import Main from './pages/Main'
import Landing from './pages/Landing'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={ <Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
