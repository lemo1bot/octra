
import React, { useState, useEffect } from 'react';
import { LEADERBOARD_KEY } from '../constants';

interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onPlayAgain }) => {
  const [leaderboard, setLeaderboard] = useState<number[]>([]);

  useEffect(() => {
    try {
        const storedScoresRaw = localStorage.getItem(LEADERBOARD_KEY);
        const storedScores = storedScoresRaw ? JSON.parse(storedScoresRaw) : [];
        
        const newScores = [...storedScores, score]
          .sort((a, b) => b - a)
          .slice(0, 5);
          
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newScores));
        setLeaderboard(newScores);
    } catch (error) {
        console.error("Could not access leaderboard from localStorage", error);
    }
  }, [score]);

  return (
    <div className="text-center flex flex-col items-center justify-center bg-black bg-opacity-50 p-8 md:p-10 rounded-lg shadow-2xl border-2 border-red-500/50 max-w-md w-full">
      <h2 className="text-5xl text-red-500 font-bold mb-4" style={{ textShadow: '0 0 10px #ef4444' }}>Game Over</h2>
      <p className="text-2xl mb-6">Your Score: <span className="font-bold text-yellow-300">{score}</span></p>
      
      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-cyan-500 text-gray-900 font-bold text-xl rounded-lg shadow-lg hover:bg-cyan-400 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-cyan-500/50"
      >
        Play Again
      </button>

      <div className="mt-8 w-full max-w-xs">
        <h3 className="text-2xl font-bold text-cyan-300 mb-4">Leaderboard</h3>
        {leaderboard.length > 0 ? (
          <ol className="list-none text-left text-lg space-y-2 p-0">
            {leaderboard.map((s, index) => (
              <li key={index} className="border-b border-gray-700 pb-1 flex items-center">
                <span className="font-bold text-yellow-400 w-8 text-center">{index + 1}.</span> 
                <span>{s} Points</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-400">No scores yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default GameOverScreen;
