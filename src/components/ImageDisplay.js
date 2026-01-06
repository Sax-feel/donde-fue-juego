import React from 'react';
import './ImageDisplay.css';
import gameData from '../data/gameData'; // Importar gameData

const ImageDisplay = ({ blurLevel, saturationLevel, gameWon }) => {
    // Si el juego fue ganado, mostrar imagen completamente clara
    const finalBlurLevel = gameWon ? 0 : blurLevel;
    const finalSaturationLevel = gameWon ? 100 : saturationLevel;

    // Usar la imagen del gameData
    const imageUrl = gameData.imageUrl;

    const imageStyle = {
        filter: `blur(${finalBlurLevel}px) saturate(${finalSaturationLevel}%)`,
        transition: 'filter 0.8s ease-in-out'
    };

    return (
        <div className="image-container">
            <div className="image-frame">
                <img
                    src={imageUrl}
                    alt="Lugar a adivinar"
                    className="mystery-image"
                    style={imageStyle}
                    onError={(e) => {
                        // Si hay error cargando la imagen, usar una por defecto
                        e.target.onerror = null;
                        e.target.src = "https://share.google/sX381X8Q8tbWVC4LU";
                    }}
                />
                <div className="image-overlay">
                    <p className="image-text">¿Dónde fue tomada esta foto?</p>
                    {gameWon && (
                        <div className="image-revealed">
                            <span className="revealed-text">¡Imagen revelada!</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="image-stats">
                <div className="stat">
                    <span className="stat-label">Nivel de desenfoque:</span>
                    <span className="stat-value">{finalBlurLevel.toFixed(1)}px</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Nivel de color:</span>
                    <span className="stat-value">{finalSaturationLevel}%</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Estado:</span>
                    <span className={`stat-value ${gameWon ? 'stat-won' : ''}`}>
                        {gameWon ? '¡Revelado!' : 'Oculto'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ImageDisplay;