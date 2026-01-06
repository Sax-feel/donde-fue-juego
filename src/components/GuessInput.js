import React, { useState } from 'react';
import './GuessInput.css';
import { FaCheck, FaTimes, FaRedo, FaEye, FaEyeSlash } from 'react-icons/fa';

const GuessInput = ({ onSubmit, attempts, maxAttempts, gameOver, resetGame, correctAnswer, gameWon }) => {
    const [guess, setGuess] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (guess.trim() && !gameOver) {
            onSubmit(guess.trim());
            setGuess('');
        }
    };

    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <div className="guess-container">
            <div className="attempts-counter">
                <span className="attempts-text">Intentos: {attempts} de {maxAttempts}</span>
                <div className="attempts-visual">
                    {Array.from({ length: maxAttempts }).map((_, index) => (
                        <div
                            key={index}
                            className={`attempt-dot ${index < attempts ? 'used' : 'remaining'}`}
                        ></div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="guess-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        className="guess-input"
                        disabled={gameOver}
                    />
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!guess.trim() || gameOver}
                    >
                        <FaCheck className="submit-icon" /> Comprobar
                    </button>
                </div>                
            </form>

            <div className="game-controls">
                {gameOver && !gameWon && (
                    <div className="lose-section">
                        <div className="lose-message">
                            <FaTimes className="lose-icon" />
                            <p>¡Has perdido! La imagen se ha vuelto demasiado borrosa.</p>
                        </div>
                        <button className="reset-button" onClick={resetGame}>
                            <FaRedo className="reset-icon" /> Volver a intentar
                        </button>

                        <button
                            className="show-answer-button"
                            onClick={handleShowAnswer}
                        >
                            {showAnswer ? <FaEyeSlash /> : <FaEye />}
                            {showAnswer ? 'Ocultar respuesta' : 'Ver respuesta correcta'}
                        </button>

                        {showAnswer && (
                            <div className="answer-reveal">
                                <p>La respuesta correcta era: <strong>{correctAnswer}</strong></p>
                            </div>
                        )}
                    </div>
                )}

                {gameOver && gameWon && (
                    <div className="win-section">
                        <button className="reset-button" onClick={resetGame}>
                            <FaRedo className="reset-icon" /> Jugar de nuevo
                        </button>
                    </div>
                )}

                {!gameOver && (
                    <div className="game-in-progress">
                        <p className="game-tip">Usa las pistas para adivinar el lugar correcto</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuessInput;