import React, { useEffect, useState } from 'react';
import './VictoryAlert.css';
import { FaHeart, FaTrophy, FaStar } from 'react-icons/fa';

const VictoryAlert = ({ correctAnswer, attempts, cluesUsed, onClose }) => {
    const [hearts, setHearts] = useState([]);
    const [confetti, setConfetti] = useState([]);
    const [stars, setStars] = useState([]);
    const [sparkles, setSparkles] = useState([]);

    // Crear corazones que caen LENTAMENTE
    useEffect(() => {
        const createHeart = () => {
            const heartTypes = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝'];
            return {
                id: Date.now() + Math.random(),
                left: Math.random() * 100,
                size: Math.random() * 25 + 20,
                duration: Math.random() * 8 + 6, // Más lento: 6-14 segundos
                delay: Math.random() * 5,
                emoji: heartTypes[Math.floor(Math.random() * heartTypes.length)],
                rotation: Math.random() * 360,
                wiggle: Math.random() * 20 - 10
            };
        };

        // Crear corazones iniciales
        const initialHearts = Array.from({ length: 15 }, createHeart);
        setHearts(initialHearts);

        const interval = setInterval(() => {
            setHearts(prev => {
                if (prev.length < 30) { // Máximo 30 corazones
                    const newHearts = [...prev, createHeart()];
                    return newHearts;
                }
                return prev;
            });
        }, 1000); // Crear un corazón nuevo cada segundo

        return () => clearInterval(interval);
    }, []);

    // Crear confeti de colores
    useEffect(() => {
        const createConfetti = () => {
            const colors = ['#ec4899', '#8b5cf6', '#f472b6', '#a78bfa', '#fbbf24', '#34d399', '#60a5fa'];
            const shapes = ['circle', 'square', 'triangle'];
            return {
                id: Date.now() + Math.random(),
                left: Math.random() * 100,
                size: Math.random() * 12 + 8,
                duration: Math.random() * 5 + 3,
                delay: Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                rotation: Math.random() * 720
            };
        };

        // Crear confeti inicial abundante
        const initialConfetti = Array.from({ length: 100 }, createConfetti);
        setConfetti(initialConfetti);

        const interval = setInterval(() => {
            setConfetti(prev => {
                if (prev.length < 200) {
                    const newConfetti = [...prev, createConfetti()];
                    return newConfetti;
                }
                return prev;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    // Crear estrellitas que caen
    useEffect(() => {
        const createStar = () => {
            const starTypes = ['⭐', '🌟', '✨', '💫', '☄️'];
            return {
                id: Date.now() + Math.random(),
                left: Math.random() * 100,
                size: Math.random() * 20 + 15,
                duration: Math.random() * 7 + 5,
                delay: Math.random() * 3,
                emoji: starTypes[Math.floor(Math.random() * starTypes.length)],
                sparkle: Math.random() > 0.5,
                rotation: Math.random() * 360
            };
        };

        // Crear estrellas iniciales
        const initialStars = Array.from({ length: 20 }, createStar);
        setStars(initialStars);

        const interval = setInterval(() => {
            setStars(prev => {
                if (prev.length < 40) {
                    const newStars = [...prev, createStar()];
                    return newStars;
                }
                return prev;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    // Crear brillos (sparkles) estáticos
    useEffect(() => {
        const createSparkle = () => {
            return {
                id: Date.now() + Math.random(),
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 6 + 3,
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 1
            };
        };

        const initialSparkles = Array.from({ length: 30 }, createSparkle);
        setSparkles(initialSparkles);

        const interval = setInterval(() => {
            setSparkles(prev => {
                const newSparkles = [...prev.slice(-20), createSparkle()];
                return newSparkles.length > 30 ? newSparkles.slice(-30) : newSparkles;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Limpiar elementos cuando termina la animación
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            setHearts(prev => prev.filter(heart => {
                const heartElement = document.getElementById(`heart-${heart.id}`);
                return heartElement && heartElement.isConnected;
            }));

            setConfetti(prev => prev.filter(c => {
                const confettiElement = document.getElementById(`confetti-${c.id}`);
                return confettiElement && confettiElement.isConnected;
            }));

            setStars(prev => prev.filter(star => {
                const starElement = document.getElementById(`star-${star.id}`);
                return starElement && starElement.isConnected;
            }));
        }, 10000);

        return () => clearInterval(cleanupInterval);
    }, []);

    return (
        <div className="victory-alert-overlay">
            <div className="magic-fog" />
            {/* Corazones que caen LENTAMENTE */}
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    id={`heart-${heart.id}`}
                    className="falling-heart"
                    style={{
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                        animation: `heartFall ${heart.duration}s ease-in forwards`,
                        animationDelay: `${heart.delay}s`,
                        transform: `rotate(${heart.rotation}deg)`
                    }}
                >
                    {heart.emoji}
                </div>
            ))}

            {/* Confeti colorido */}
            {confetti.map(c => (
                <div
                    key={c.id}
                    id={`confetti-${c.id}`}
                    className={`confetti ${c.shape}`}
                    style={{
                        left: `${c.left}%`,
                        width: `${c.size}px`,
                        height: `${c.size}px`,
                        backgroundColor: c.color,
                        animation: `confettiFall ${c.duration}s ease-in forwards`,
                        animationDelay: `${c.delay}s`,
                        transform: `rotate(${c.rotation}deg)`
                    }}
                />
            ))}

            {/* Estrellitas que caen */}
            {stars.map(star => (
                <div
                    key={star.id}
                    id={`star-${star.id}`}
                    className="falling-star"
                    style={{
                        left: `${star.left}%`,
                        fontSize: `${star.size}px`,
                        animation: `starFall ${star.duration}s ease-in-out forwards`,
                        animationDelay: `${star.delay}s`,
                        filter: star.sparkle ? 'drop-shadow(0 0 8px gold)' : 'none'
                    }}
                >
                    {star.emoji}
                </div>
            ))}

            {/* Brillo alrededor del alert */}
            <div className="victory-glow" />

            {/* Alert principal */}
            <div className="victory-alert">
                {/* Brillos (sparkles) dentro del alert */}
                {sparkles.map(sparkle => (
                    <div
                        key={sparkle.id}
                        className="sparkle"
                        style={{
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                            width: `${sparkle.size}px`,
                            height: `${sparkle.size}px`,
                            animation: `sparkleTwinkle ${sparkle.duration}s ease-in-out infinite`,
                            animationDelay: `${sparkle.delay}s`
                        }}
                    />
                ))}

                {/* Contenido del alert */}
                <div className="victory-alert-icon">
                    <FaTrophy />
                </div>

                <h2 className="victory-alert-title">¡Lo lograste!</h2>

                <p className="victory-alert-message">
                    Descubriste el lugar secreto, ahora captura esta pantalla y mándala a tu pololo! Desbloqueaste un premio
                </p>

                <div className="victory-alert-answer">
                    {correctAnswer}
                </div>

                <div className="victory-alert-stats">
                    <FaStar style={{ marginRight: '8px', color: '#FFD700' }} />
                    Lo lograste en {attempts} intento {attempts !== 1 ? 's ' : ''}
                    usando {cluesUsed} pista{cluesUsed !== 1 ? 's' : ''}
                    <FaStar style={{ marginLeft: '8px', color: '#FFD700' }} />
                </div>

                <button
                    className="victory-alert-button"
                    onClick={onClose}
                >
                    <FaHeart style={{ marginRight: '10px' }} />
                    Continuar la Aventura
                    <FaHeart style={{ marginLeft: '10px' }} />
                </button>
            </div>
            
        </div>
    );
};

export default VictoryAlert;