import React, { useState } from 'react';
import './Game.css';
import ImageDisplay from './ImageDisplay';
import Clues from './Clues';
import GuessInput from './GuessInput';
import VictoryAlert from './VictoryAlert';
import gameData from '../data/gameData';
import { FaHeart } from 'react-icons/fa';

const Game = () => {
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [blurLevel, setBlurLevel] = useState(20);
    const [saturationLevel, setSaturationLevel] = useState(20);
    const [message, setMessage] = useState('');
    const [showVictoryAlert, setShowVictoryAlert] = useState(false);

    const maxAttempts = gameData.maxAttempts;
    const totalClues = gameData.clues.length;

    const showNextClue = () => {
        if (currentClueIndex < totalClues - 1) {
            setCurrentClueIndex(currentClueIndex + 1);
        }
    };

    const handleGuess = (guess) => {
        if (gameOver) return;

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        // Comprobar si la respuesta es correcta
        if (guess.toLowerCase() === gameData.correctAnswer.toLowerCase()) {
            setWon(true);
            setGameOver(true);
            setBlurLevel(0); // Imagen completamente clara
            setSaturationLevel(100); // Colores al máximo
            setMessage(`¡Amor a primera vista! Has encontrado el lugar del corazón 💖`);

            // Mostrar alert de victoria después de un breve delay
            setTimeout(() => {
                setShowVictoryAlert(true);
            }, 800);
        } else {
            // Si es incorrecta, aumentar el desenfoque y reducir la saturación
            const newBlurLevel = blurLevel + 5;
            const newSaturationLevel = Math.max(0, saturationLevel - 20);

            setBlurLevel(newBlurLevel);
            setSaturationLevel(newSaturationLevel);

            // Verificar si se han agotado los intentos
            if (newAttempts >= maxAttempts) {
                setGameOver(true);
                setMessage(`El romance se desvaneció... 💔 ¡Inténtalo de nuevo!`);
            } else {
                setMessage(`No es el lugar correcto!! vamos que no esta dificil. Te quedan ${maxAttempts - newAttempts} intentos. 💘`);
            }
        }
    };

    const resetGame = () => {
        setCurrentClueIndex(0);
        setAttempts(0);
        setGameOver(false);
        setWon(false);
        setBlurLevel(20);
        setSaturationLevel(20);
        setMessage('');
        setShowVictoryAlert(false);
    };

    const handleCloseVictoryAlert = () => {
        setShowVictoryAlert(false);
    };

    const remainingClues = totalClues - (currentClueIndex + 1);

    return (
        <div className="game-container">
            {showVictoryAlert && (
                <VictoryAlert
                    correctAnswer={gameData.correctAnswer}
                    attempts={attempts}
                    cluesUsed={currentClueIndex + 1}
                    onClose={handleCloseVictoryAlert}
                />
            )}

            <header className="game-header">
                                    <h1 className="game-title">Para: Araceli</h1>
                <div className="hearts-decoration">
                    <h1 className="game-title">{gameData.title}</h1>
                </div>
            </header>

            <div className="game-content">
                <div className="main-game-area">
                    {/* Imagen y pistas en la misma fila */}
                    <div className="row-container">
                        <div className="image-section">
                            <ImageDisplay
                                blurLevel={blurLevel}
                                saturationLevel={saturationLevel}
                                gameWon={won}
                            />
                        </div>
                        <div className="guess-section">
                            <GuessInput
                                onSubmit={handleGuess}
                                attempts={attempts}
                                maxAttempts={maxAttempts}
                                gameOver={gameOver}
                                resetGame={resetGame}
                                correctAnswer={gameData.correctAnswer}
                                gameWon={won}
                            />

                            {message && (
                                <div className={`message-box ${won ? 'success' : gameOver ? 'error' : 'info'}`}>
                                    <div className="message-icon">
                                        {won ? <FaHeart /> : gameOver ? '💔' : '💘'}
                                    </div>
                                    <p className="message-text">{message}</p>
                                </div>
                            )}
                        </div>

                        
                    </div>

                    {/* Input y cómo jugar en la misma fila */}
                    <div className="row-container bottom-row">
                        <div className="clues-section">
                            <Clues
                                clues={gameData.clues}
                                currentClueIndex={currentClueIndex}
                                showNextClue={showNextClue}
                                remainingClues={remainingClues}
                            />
                        </div>

                        <div className="instructions-section">
                            <div className="instructions">
                                <h3><span className="instructions-icon">💝</span> ¿Cómo jugar este juego?</h3>
                                <ul>
                                    <li>Usa las pistas para descubrir el lugar secreto.</li>
                                    <li>Cada respuesta incorrecta hace que el recuerdo se desvanezca (la imagen se vuelve borrosa).</li>
                                    <li>Tienes {maxAttempts} oportunidades para encontrar el lugar.</li>
                                    <li>Si adivinas correctamente, el recuerdo será claro y hermoso.</li>
                                    <li>Escribe la respuesta exacta como aparece en el juego.</li>
                                </ul>
                            </div>

                            <div className="romantic-quote">
                                <p className="quote-text">"El amor no se mira, se siente, y mucho más cuando se encuentra en el lugar correcto."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="game-footer">
                <div className="footer-hearts">
                    <span>❤️</span>
                    <span>💕</span>
                    <span>💖</span>
                </div>
                <p>Juego Romántico "¿Dónde fue?" - Encuentra el lugar del corazón</p>
                <p className="footer-secret">Lugar secreto: {won || gameOver ? gameData.correctAnswer : '?????'}</p>
            </footer>
        </div>
    );
};

export default Game;