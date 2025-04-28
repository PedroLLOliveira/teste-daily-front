import React from 'react';
import { DailyProvider } from '@daily-co/daily-react';
import VideoCallPage from './VideoCallPage';

const ROOM_URL = import.meta.env.VITE_DAILY_ROOM_URL as string;

export default function App() {
  return (
    <DailyProvider url={ROOM_URL}>
      <VideoCallPage />
    </DailyProvider>
  );
}
