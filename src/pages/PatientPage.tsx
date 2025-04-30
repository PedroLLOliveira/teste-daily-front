import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientPage.css';

export default function PatientPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) return alert('Digite seu nome');
    const res = await fetch('http://localhost:3000/api/patient-rooms', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ patientName: name }),
    });
    const { roomName } = await res.json();
    navigate(`/call/${roomName}?userName=${encodeURIComponent(name)}`);
  };

  return (
    <div className="patient-container">
      <div className="patient-card">
        <h1 className="patient-title">Sou Paciente</h1>
        <input
          className="patient-input"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="patient-button" onClick={handleCreate}>
          Criar sala e aguardar
        </button>
      </div>
    </div>
  );
}
