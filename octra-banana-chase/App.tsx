
import React, { useState, useCallback } from 'react';
import type { GameState } from './types';
import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import Footer from './components/Footer';

function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = useCallback(() => {
    setGameState('PLAYING');
  }, []);

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setGameState('GAME_OVER');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameState('PLAYING');
    setFinalScore(0);
  }, []);

  const renderScreen = () => {
    switch (gameState) {
      case 'PLAYING':
        return <GameScreen onGameOver={handleGameOver} />;
      case 'GAME_OVER':
        return <GameOverScreen score={finalScore} onPlayAgain={handlePlayAgain} />;
      case 'MENU':
      default:
        return <MenuScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-mono p-4 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col items-center relative">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 tracking-wider" style={{ textShadow: '0 0 10px #fef08a, 0 0 20px #fef08a' }}>
          OCTRA BANANA CHASE
        </h1>
        <p className="text-cyan-300 mb-6">Catch the bananas, avoid the drops!</p>
        
        <div className="w-full flex justify-center">{renderScreen()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
