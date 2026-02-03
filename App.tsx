import React, { useState } from 'react';
import { Proposal } from './components/Proposal';
import { Celebration } from './components/Celebration';
import { AppState } from './types';

// Configuration
const GIRLFRIEND_NAME = "Arpana";

export default function App() {
  const [gameState, setGameState] = useState<AppState>(AppState.PROPOSAL);

  return (
    <div className="min-h-screen h-[100dvh] w-full bg-gradient-to-b from-rose-50 via-white to-rose-100 text-gray-900 selection:bg-rose-200">
      
      {gameState === AppState.PROPOSAL && (
        <Proposal 
          name={GIRLFRIEND_NAME} 
          onAccept={() => setGameState(AppState.ACCEPTED)} 
        />
      )}

      {gameState === AppState.ACCEPTED && (
        <Celebration name={GIRLFRIEND_NAME} />
      )}
      
    </div>
  );
}