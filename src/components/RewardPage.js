import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RewardPage = () => {
  const [confetti, setConfetti] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [showReward, setShowReward] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [fireworks, setFireworks] = useState([]);
  const navigate = useNavigate();

  // Create continuous confetti rain
  const createConfetti = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FECA57",
      "#FF9FF3",
      "#54A0FF",
    ];
    const newConfetti = [];

    for (let i = 0; i < 8; i++) {
      newConfetti.push({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 8,
        velocity: Math.random() * 4 + 3,
        drift: (Math.random() - 0.5) * 2,
        shape: Math.random() > 0.5 ? "circle" : "square",
      });
    }

    setConfetti((prev) => [...prev.slice(-50), ...newConfetti]);
  };

  // Create floating hearts
  const createHearts = () => {
    const heartEmojis = ["💕", "💖", "💗", "💝", "💘", "💞", "💓", "💟"];
    const newHearts = [];

    for (let i = 0; i < 3; i++) {
      newHearts.push({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        size: Math.random() * 30 + 20,
        velocity: Math.random() * 2 + 1,
        drift: (Math.random() - 0.5) * 3,
      });
    }

    setHearts((prev) => [...prev.slice(-20), ...newHearts]);
  };

  // Create sparkle burst
  const createSparkles = () => {
    const newSparkles = [];
    for (let i = 0; i < 12; i++) {
      newSparkles.push({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 35 + 15,
        delay: i * 100,
      });
    }
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 3000);
  };

  // Create fireworks effect
  const createFirework = (x, y) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"];
    const particles = [];

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      particles.push({
        id: Math.random(),
        x: x,
        y: y,
        targetX: x + Math.cos(angle) * (Math.random() * 150 + 100),
        targetY: y + Math.sin(angle) * (Math.random() * 150 + 100),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        progress: 0,
      });
    }

    setFireworks((prev) => [...prev, ...particles]);
    setTimeout(() => {
      setFireworks((prev) => prev.filter((p) => !particles.includes(p)));
    }, 2000);
  };

  // Initialize celebration sequence
  useEffect(() => {
    // Phase 1: Initial sparkles
    setTimeout(() => {
      createSparkles();
      setAnimationPhase(1);
    }, 500);

    // Phase 2: Show main content
    setTimeout(() => {
      setShowReward(true);
      setAnimationPhase(2);
    }, 1500);

    // Phase 3: Start continuous effects
    setTimeout(() => {
      setAnimationPhase(3);
    }, 3000);

    // Start continuous confetti and hearts
    const confettiInterval = setInterval(createConfetti, 800);
    const heartsInterval = setInterval(createHearts, 1200);

    // Random fireworks
    const fireworksInterval = setInterval(() => {
      createFirework(
        Math.random() * window.innerWidth,
        Math.random() * (window.innerHeight * 0.6) + 100
      );
    }, 2000);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(heartsInterval);
      clearInterval(fireworksInterval);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      // Animate confetti
      setConfetti((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            y: piece.y + piece.velocity,
            x: piece.x + piece.drift,
            rotation: piece.rotation + 8,
          }))
          .filter((piece) => piece.y < window.innerHeight + 100)
      );

      // Animate hearts
      setHearts((prev) =>
        prev
          .map((heart) => ({
            ...heart,
            y: heart.y - heart.velocity,
            x: heart.x + heart.drift,
          }))
          .filter((heart) => heart.y > -100)
      );

      // Animate fireworks
      setFireworks((prev) =>
        prev.map((particle) => ({
          ...particle,
          progress: Math.min(particle.progress + 0.05, 1),
          x: particle.x + (particle.targetX - particle.x) * 0.05,
          y: particle.y + (particle.targetY - particle.y) * 0.05,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center p-8 relative overflow-hidden font-lora">
      {/* Floating Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute pointer-events-none"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            borderRadius: piece.shape === "circle" ? "50%" : "20%",
            transform: `rotate(${piece.rotation}deg)`,
            zIndex: 1000,
            opacity: 0.9,
          }}
        />
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none animate-pulse"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            zIndex: 999,
            opacity: 0.8,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Fireworks */}
      {fireworks.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            opacity: 1 - particle.progress,
            zIndex: 998,
          }}
        />
      ))}

      {/* Floating Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            fontSize: sparkle.size,
            zIndex: 997,
            animationDelay: `${sparkle.delay}ms`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Main Content */}
      <div
        className={`text-center transition-all duration-1000 ${
          showReward
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Celebration Header */}
        <div className="mb-12">
          <div className="text-8xl md:text-9xl mb-8 animate-bounce">🎉</div>

          <h1 className="text-6xl md:text-7xl font-dancing text-white mb-6 leading-tight drop-shadow-lg">
            Perfect Score!
          </h1>

          <h2 className="text-4xl md:text-5xl font-dancing text-white mb-8 drop-shadow-lg">
            You Got It All Right, Lang! 💕
          </h2>
        </div>

        {/* Reward Card */}
        <div className="max-w-4xl p-12 rounded-3xl shadow-2xl mb-12 transform hover:scale-105 transition-all duration-500 bg-white">
          <div className="text-7xl mb-8">🎁</div>

          <h3 className="text-4xl md:text-5xl font-dancing text-red-500 mb-8">
            Your Special Reward! 🌟
          </h3>

          <div className="text-2xl md:text-3xl leading-relaxed mb-8 font-lora text-black">
            Your reward is a{" "}
            <span className="font-bold text-4xl text-red-500">
              special date
            </span>{" "}
            with me!
            <br />
            Let's make more{" "}
            <span className="font-bold">unforgettable memories</span> together!
            💝
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-red-100">
              <div className="text-4xl mb-3">🍽️</div>
              <h4 className="text-xl font-bold mb-2 text-red-500">
                Romantic Dinner
              </h4>
              <p className="text-black">Your favorite spaghetti date!</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={() => navigate("/")}
          className="px-10 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg bg-red-500 text-white hover:bg-red-600"
        >
          Start Over 🔄
        </button>
      </div>

      {/* Decorative Corner Elements */}
      <div
        className="absolute top-10 left-10 text-6xl opacity-30 animate-spin"
        style={{ animationDuration: "15s" }}
      >
        🎊
      </div>
      <div className="absolute top-16 right-16 text-5xl opacity-30 animate-bounce">
        🎈
      </div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-30 animate-pulse">
        🌟
      </div>
      <div
        className="absolute bottom-32 right-12 text-6xl opacity-30 animate-spin"
        style={{ animationDuration: "12s" }}
      >
        🎁
      </div>

      {/* Corner Hearts */}
      <div className="absolute top-1/4 left-8 text-3xl opacity-40 animate-pulse">
        💖
      </div>
      <div className="absolute top-1/3 right-12 text-4xl opacity-40 animate-bounce">
        💕
      </div>
      <div className="absolute bottom-1/4 left-16 text-3xl opacity-40 animate-pulse">
        💘
      </div>
      <div className="absolute bottom-1/3 right-8 text-4xl opacity-40 animate-bounce">
        💝
      </div>
    </div>
  );
};

export default RewardPage;
