import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import CallPage from './pages/CallPage';

export default function App() {
  return (
    <Routes>
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
      <Route path="/call/:roomName" element={<CallPage />} />
      <Route path="*" element={<Navigate to="/patient" replace />} />
    </Routes>
  );
}
