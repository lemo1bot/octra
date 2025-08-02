import React, { useState, useEffect, useRef } from 'react';
import type { Banana } from '../types';
import { 
    GAME_WIDTH, 
    GAME_HEIGHT, 
    PLAYER_WIDTH, 
    PLAYER_HEIGHT,
    PLAYER_SPEED, 
    BANANA_WIDTH, 
    BANANA_HEIGHT, 
    BANANA_FALL_SPEED, 
    BANANA_SPAWN_INTERVAL,
    MAX_MISSED_BANANAS,
    BANANA_IMAGE_URL
} from '../constants';

const Player: React.FC<{ positionX: number }> = ({ positionX }) => (
    <div
        className="absolute bottom-2 bg-cyan-400 rounded-md"
        style={{
            left: `${positionX}%`,
            width: `${PLAYER_WIDTH}px`,
            height: `${PLAYER_HEIGHT}px`,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 15px 5px rgba(0, 255, 255, 0.7), 0 0 5px 2px rgba(255, 255, 255, 0.8) inset',
        }}
    />
);

const BananaComponent: React.FC<{ banana: Banana }> = React.memo(({ banana }) => (
    <img
        src={BANANA_IMAGE_URL}
        alt="Falling Banana"
        className="absolute"
        style={{
            left: `${banana.x}%`,
            top: `${banana.y}px`,
            width: `${BANANA_WIDTH}px`,
            height: `${BANANA_HEIGHT}px`,
            transform: 'translateX(-50%)',
        }}
    />
));

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
    const [score, setScore] = useState(0);
    const [missed, setMissed] = useState(0);
    const [playerX, setPlayerX] = useState(50);
    const [bananas, setBananas] = useState<Banana[]>([]);
    
    const keysPressed = useRef<Record<string, boolean>>({});
    const animationFrameId = useRef<number | null>(null);
    const playerXRef = useRef(playerX);
    playerXRef.current = playerX;

    useEffect(() => {
        const gameLoop = () => {
            // Update player position based on keys pressed
            if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
                setPlayerX(prevX => {
                    const playerHalfWidthPercent = (PLAYER_WIDTH / 2 / GAME_WIDTH) * 100;
                    return Math.max(playerHalfWidthPercent, prevX - PLAYER_SPEED);
                });
            }
            if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
                setPlayerX(prevX => {
                    const playerHalfWidthPercent = (PLAYER_WIDTH / 2 / GAME_WIDTH) * 100;
                    return Math.min(100 - playerHalfWidthPercent, prevX + PLAYER_SPEED);
                });
            }

            // Update bananas
            setBananas(prevBananas => {
                const updatedBananas: Banana[] = [];
                let scoreIncrease = 0;
                let missedIncrease = 0;

                const playerLeftPx = (playerXRef.current / 100) * GAME_WIDTH - PLAYER_WIDTH / 2;
                const playerRightPx = playerLeftPx + PLAYER_WIDTH;
                const playerTopPx = GAME_HEIGHT - PLAYER_HEIGHT - 8;

                for (const banana of prevBananas) {
                    const newY = banana.y + BANANA_FALL_SPEED;

                    if (newY > GAME_HEIGHT) {
                        missedIncrease++;
                        continue;
                    }

                    const bananaLeftPx = (banana.x / 100) * GAME_WIDTH - BANANA_WIDTH / 2;
                    const bananaRightPx = bananaLeftPx + BANANA_WIDTH;
                    
                    if (playerRightPx > bananaLeftPx && playerLeftPx < bananaRightPx && playerTopPx < newY + BANANA_HEIGHT) {
                         scoreIncrease++;
                    } else {
                        updatedBananas.push({ ...banana, y: newY });
                    }
                }

                if (scoreIncrease > 0) setScore(s => s + scoreIncrease);
                if (missedIncrease > 0) setMissed(m => m + missedIncrease);
                
                return updatedBananas;
            });

            animationFrameId.current = requestAnimationFrame(gameLoop);
        };
        
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.key.toLowerCase()] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const spawnInterval = setInterval(() => {
            setBananas(prev => [...prev, { id: Date.now(), x: Math.random() * 90 + 5, y: -BANANA_HEIGHT }]);
        }, BANANA_SPAWN_INTERVAL);
        return () => clearInterval(spawnInterval);
    }, []);

    useEffect(() => {
        if (missed >= MAX_MISSED_BANANAS) {
            onGameOver(score);
        }
    }, [missed, onGameOver, score]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2 text-2xl px-2" style={{width: `${GAME_WIDTH}px`}}>
                <p>Score: <span className="font-bold text-yellow-300">{score}</span></p>
                <p>Missed: <span className="font-bold text-red-500">{missed} / {MAX_MISSED_BANANAS}</span></p>
            </div>
            <div
                className="relative bg-black bg-opacity-70 rounded-lg shadow-2xl border-2 border-cyan-500/50 overflow-hidden"
                style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
            >
                {bananas.map(banana => <BananaComponent key={banana.id} banana={banana} />)}
                <Player positionX={playerX} />
            </div>
        </div>
    );
};

export default GameScreen;