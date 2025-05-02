import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  DailyProvider,
  useDaily,
  useParticipantIds,
  useParticipant,
} from '@daily-co/daily-react';
import Controls from '../Controls';
import './CallPage.css';

interface CallInnerProps { roomName: string; userName: string; }

function CallInner({ roomName, userName }: CallInnerProps) {
  const callObject = useDaily();
  const participantIds = useParticipantIds();

  useEffect(() => {
    if (!callObject) return;
    callObject.join({ userName });
    callObject.setLocalAudio(true);
    return () => void callObject.leave();
  }, [callObject, userName]);

  if (!callObject) return <p>Carregando chamada…</p>;

  return (
    <div className="call-container">
      {/* Header */}
      <div className="call-header">
        <div className="call-title">Sala: {roomName}</div>
        <button
          className="call-leave-btn"
          onClick={() => callObject.leave()}>
          Sair
        </button>
      </div>

      {/* Grid de vídeos */}
      <div className="video-grid">
        {participantIds.map((id) => (
          <Participant key={id} id={id} />
        ))}
      </div>

      {/* Controles flutuantes */}
      <div className="controls-container">
        <Controls />
      </div>
    </div>
  );
}

function Participant({ id }: { id: string }) {
  const p = useParticipant(id)!;
  const videoTrack = p.tracks.video?.track;
  const audioTrack = p.tracks.audio?.track;

  return (
    <div className="participant">
      {videoTrack && (
        <video
          className="participant-video"
          ref={(el) => {
            if (el) el.srcObject = new MediaStream([videoTrack]);
          }}
          autoPlay
          muted={p.local}
        />
      )}
      {audioTrack && (
        <audio
          ref={(el) => {
            if (el) el.srcObject = new MediaStream([audioTrack]);
          }}
          autoPlay
          muted={p.local}
          style={{ display: 'none' }}
        />
      )}
      <div className="participant-name">
        {p.user_name ?? 'Convidado'}
      </div>
    </div>
  );
}

export default function CallPage() {
  const { roomName } = useParams<{ roomName: string }>();
  const [search] = useSearchParams();
  const userName = search.get('userName') ?? '';

  if (!roomName || !userName) {
    return <p>Falta o nome da sala ou do usuário na URL.</p>;
  }

  const roomUrl = `https://splitcare.daily.co/${roomName}`;

  return (
    <DailyProvider url={roomUrl} showLeaveButton={false}>
      <CallInner roomName={roomName} userName={userName} />
    </DailyProvider>
  );
}
