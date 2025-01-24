import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from './App.tsx'
import React from 'react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<App />} />
        
        {/* Redirect to login.html */}
        <Route path="/login" element={<Navigate to="/login.html" replace />} />
        
        {/* Redirect to dashboard.html */}
        <Route path="/dashboard" element={<Navigate to="/dashboard.html" replace />} />
      </Routes>
    </Router>
  </StrictMode>
)
