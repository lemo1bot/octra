
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-4 text-center text-gray-500 text-sm">
      Part of the Octra Ecosystem · Built with ❤️ by Lemon ·{' '}
      <a 
        href="https://x.com/bank_of_btc" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-cyan-400 hover:text-cyan-300 underline"
      >
        @bank_of_btc
      </a>
    </footer>
  );
};

export default Footer;
