// src/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    // chama o seu backend
    const res = await fetch('http://localhost:3000/api/rooms', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ privacy: 'public' }),
    });
    const data = await res.json();
    // data.url = https://splitcare.daily.co/<roomName>
    const url = new URL(data.url);
    const roomName = url.pathname.replace('/', '');
    // redireciona para /call/:roomName
    navigate(`/call/${roomName}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Painel do Médico</h1>
      <button onClick={handleCreateRoom}>
        Criar Sala de Consulta
      </button>
    </div>
  );
}
