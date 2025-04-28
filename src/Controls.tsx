import React from 'react';
import { useDaily } from '@daily-co/daily-react';

export default function Controls() {
  const callObject = useDaily();

  // Se não tiver callObject, não renderiza nada
  if (!callObject) return null;

  // Lê o estado atual do áudio local
  const isAudioOn = callObject.localAudio();

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => callObject.setLocalAudio(!isAudioOn)}>
        {isAudioOn ? '🔇 Mute' : '🎤 Unmute'}
      </button>

      <button onClick={() => callObject.startScreenShare()}>
        📺 Compartilhar tela
      </button>

      <button onClick={() => callObject.leave()}>
        🚪 Sair
      </button>
    </div>
  );
}
