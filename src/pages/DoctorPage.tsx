import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorPage.css';

interface QueueItem { roomName: string; patientName: string; url: string; }

export default function DoctorPage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/queue')
      .then((r) => r.json())
      .then(setQueue);
  }, []);

  const handleStart = (roomName: string) => {
    fetch(`http://localhost:3000/api/queue/${roomName}`, { method: 'DELETE' });
    navigate(`/call/${roomName}?userName=${encodeURIComponent(name)}`);;
  };

  return (
    <div className="doctor-container">
      <div className="doctor-header">
        <h1 className="doctor-title">Sou Médico</h1>
        <input
          className="doctor-input"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <ul className="queue-list">
        {queue.length > 0 ? (
          queue.map(({ roomName, patientName }) => (
            <li key={roomName} className="queue-item">
              <span className="queue-name">{patientName}</span>
              <button
                className="queue-button"
                onClick={() => handleStart(roomName)}
              >
                Iniciar atendimento
              </button>
            </li>
          ))
        ) : (
          <p className="empty-text">Nenhum paciente na fila</p>
        )}
      </ul>
    </div>
  );
}
