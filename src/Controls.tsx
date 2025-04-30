// src/Controls.tsx
import React, { useState, useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import './Controls.css';

export default function Controls() {
  const callObject = useDaily();
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);

  // só para inicializar conforme o estado real
  useEffect(() => {
    if (!callObject) return;
    setIsAudioOn(callObject.localAudio());
  }, [callObject]);

  if (!callObject) return null;

  const toggleAudio = () => {
    const next = !isAudioOn;
    callObject.setLocalAudio(next);
    setIsAudioOn(next);               // atualiza o estado imediatamente
  };

  return (
    <div className="controls-bar">
      {/* Mute / Unmute */}
      <button
        className={`control-btn ${!isAudioOn ? 'muted' : ''}`}
        onClick={toggleAudio}
        title={isAudioOn ? 'Desligar Áudio' : 'Ligar Áudio'}
      >
        <span className="control-icon">{isAudioOn ? '🎤' : '🔇'}</span>
        <span className="control-text">
          {isAudioOn ? 'Desligar Áudio' : 'Ligar Áudio'}
        </span>
      </button>

      {/* Compartilhar tela */}
      <button
        className="control-btn"
        onClick={() => callObject.startScreenShare()}
        title="Compartilhar tela"
      >
        <span className="control-icon">🖥️</span>
        <span className="control-text">Tela</span>
      </button>

      {/* Sair da chamada */}
      <button
        className="control-btn"
        onClick={() => callObject.leave()}
        title="Sair da chamada"
      >
        <span className="control-icon">🚪</span>
        <span className="control-text">Sair</span>
      </button>
    </div>
  );
}
