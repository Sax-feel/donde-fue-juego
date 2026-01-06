import React from 'react';
import './Clues.css';
import { FaLightbulb } from 'react-icons/fa';

const Clues = ({ clues, currentClueIndex, showNextClue, remainingClues }) => {
    return (
        <div className="clues-container">
            <h3 className="clues-title">
                <FaLightbulb className="clue-icon" /> Pistas Disponibles
            </h3>

            <div className="clues-counter">
                <span className="counter-text">Pistas mostradas: {currentClueIndex + 1} de {clues.length}</span>
                <span className="counter-text">Pistas restantes: {remainingClues}</span>
            </div>

            <div className="current-clue">
                <div className="clue-header">
                    <span className="clue-number">Pista #{currentClueIndex + 1}</span>
                </div>
                <p className="clue-text">{clues[currentClueIndex]}</p>
            </div>

            <div className="clues-history">
                <h4>Pistas anteriores:</h4>
                <ul className="clues-list">
                    {clues.slice(0, currentClueIndex).map((clue, index) => (
                        <li key={index} className="previous-clue">
                            <span className="history-clue-number">Pista #{index + 1}:</span> {clue}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="clue-button"
                onClick={showNextClue}
                disabled={currentClueIndex >= clues.length - 1}
            >
                <FaLightbulb className="button-icon" />
                {currentClueIndex >= clues.length - 1 ? 'Todas las pistas usadas' : 'Mostrar siguiente pista'}
            </button>
        </div>
    );
};

export default Clues;