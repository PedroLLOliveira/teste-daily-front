import React, { useEffect } from 'react';
import {
  useDaily,
  useParticipantIds,
  useParticipant,
} from '@daily-co/daily-react';
import Controls from './Controls';

export default function VideoCallPage() {
  const callObject = useDaily();
  // 🔥 para receber **todos** os participantes, basta NÃO passar `filter`
  const participantIds = useParticipantIds();

  useEffect(() => {
    if (!callObject) return;       // ◀️ garante que callObject não é null
    callObject.join();             // entra na sala
    return () => {
      callObject.leave();          // sai da sala ao desmontar
    };
  }, [callObject]);

  if (!callObject) {
    return <p>Loading call...</p>; // ou um spinner
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Participantes</h2>
      <ul>
        {participantIds.map((id) => (
          <ParticipantView key={id} id={id} />
        ))}
      </ul>
      <Controls />
    </div>
  );
}

function ParticipantView({ id }: { id: string }) {
  const participant = useParticipant(id);
  return (
    <li>
      {participant?.user_name ?? 'Convidado'} — Vídeo:{' '}
      {participant?.tracks.video.state === 'playable' ? 'On' : 'Off'}
    </li>
  );
}
