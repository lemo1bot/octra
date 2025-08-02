
import React from 'react';

interface MenuScreenProps {
  onStartGame: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center bg-black bg-opacity-50 p-8 md:p-10 rounded-lg shadow-2xl border-2 border-cyan-500/50 max-w-md w-full">
      <h2 className="text-3xl text-cyan-300 mb-6">Are you ready?</h2>
      <button
        onClick={onStartGame}
        className="px-8 py-3 bg-cyan-500 text-gray-900 font-bold text-xl rounded-lg shadow-lg hover:bg-cyan-400 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-cyan-500/50"
      >
        Start Game
      </button>
      <div className="mt-8 text-left text-gray-300">
        <h3 className="font-bold text-lg text-white mb-2">Instructions:</h3>
        <p><span className="font-bold text-cyan-400 w-24 inline-block">Move Left:</span> 'A' or Left Arrow Key</p>
        <p><span className="font-bold text-cyan-400 w-24 inline-block">Move Right:</span> 'D' or Right Arrow Key</p>
        <p className="mt-4">Catch as many bananas as you can.</p>
        <p>If you miss <span className="font-bold text-red-500">5</span> bananas, it's Game Over!</p>
      </div>
    </div>
  );
};

export default MenuScreen;
