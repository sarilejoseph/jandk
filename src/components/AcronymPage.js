import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AcronymPage = () => {
  const [clickedLetters, setClickedLetters] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const navigate = useNavigate();

  const acronym = [
    { letter: "L", meaning: "Loving", color: "#FF6B6B", emoji: "💕" },
    { letter: "A", meaning: "Adorable", color: "#4ECDC4", emoji: "🥰" },
    { letter: "N", meaning: "Nigga", color: "#45B7D1", emoji: "👨🏿" },
    { letter: "G", meaning: "Gorgeous", color: "#96CEB4", emoji: "✨" },
  ];

  const sequence = ["L", "A", "N", "G"];

  const createSparkle = () => {
    const newSparkle = {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 10,
    };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 2000);
  };

  const handleLetterClick = (letter) => {
    if (sequence[currentStep] === letter && !clickedLetters.includes(letter)) {
      setClickedLetters((prev) => [...prev, letter]);
      setCurrentStep((prev) => prev + 1);
      createSparkle();

      // Create multiple sparkles for effect
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createSparkle(), i * 100);
      }

      if (currentStep === 3) {
        setTimeout(() => {
          setShowCelebration(true);
          // Create celebration sparkles
          for (let i = 0; i < 10; i++) {
            setTimeout(() => createSparkle(), i * 200);
          }
        }, 500);
      }
    }
  };

  const getLetterStyle = (letter, index) => {
    const isRevealed = clickedLetters.includes(letter);
    const isNext = sequence[currentStep] === letter;
    const isPast = sequence.indexOf(letter) < currentStep;

    if (isRevealed) {
      return {
        backgroundColor: acronym[index].color,
        color: "white",
        transform: "scale(1.1)",
        boxShadow: `0 0 30px ${acronym[index].color}`,
      };
    } else if (isNext) {
      return {
        backgroundColor: "#F0D8C3",
        color: "#8B4513",
        borderColor: "#CD853F",
        borderWidth: "4px",
        animation: "pulse 1s infinite",
        cursor: "pointer",
      };
    } else {
      return {
        backgroundColor: "rgba(240, 216, 195, 0.3)",
        color: "#8B4513",
        opacity: isPast ? 0.3 : 1,
      };
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ backgroundColor: "#F0D8C3" }}
    >
      {/* Floating Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            fontSize: sparkle.size,
          }}
        >
          ✨
        </div>
      ))}

      {/* Main Title */}
      <div className="text-center mb-16">
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
          style={{
            color: "#8B4513",
            textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
            fontFamily: "Georgia, serif",
          }}
        >
          This is why I call you
        </h1>

        {/* Interactive LANG Letters */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          {acronym.map((item, index) => (
            <div
              key={item.letter}
              className="relative group"
              onClick={() => handleLetterClick(item.letter)}
            >
              <div
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-500 border-2"
                style={getLetterStyle(item.letter, index)}
              >
                {item.letter}
              </div>

              {/* Hover tooltip for next letter */}
              {sequence[currentStep] === item.letter &&
                !clickedLetters.includes(item.letter) && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-800">
                      Click me! 👆
                    </p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {sequence.map((letter, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index < currentStep ? "#CD853F" : "rgba(139, 69, 19, 0.3)",
              }}
            />
          ))}
        </div>

        {/* Instructions */}
        {currentStep < 4 && (
          <p
            className="text-2xl md:text-3xl font-medium mb-8"
            style={{ color: "#8B4513" }}
          >
            {currentStep === 0
              ? "Click the letters in order: L → A → N → G"
              : `Great! Now click "${sequence[currentStep]}" 🎯`}
          </p>
        )}
      </div>

      {/* Revealed Meanings */}
      {clickedLetters.length > 0 && (
        <div
          className="w-full max-w-4xl p-8 rounded-3xl shadow-2xl mb-8"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-8"
            style={{ color: "#8B4513" }}
          >
            Here's what each letter means... 💝
          </h2>

          <div className="grid gap-6 md:gap-8">
            {acronym.map((item, index) => {
              const isRevealed = clickedLetters.includes(item.letter);
              return (
                <div
                  key={item.letter}
                  className={`flex items-center gap-6 p-6 rounded-2xl transition-all duration-700 ${
                    isRevealed
                      ? "opacity-100 transform translate-x-0"
                      : "opacity-30 transform translate-x-8"
                  }`}
                  style={{
                    backgroundColor: isRevealed
                      ? `${item.color}20`
                      : "transparent",
                    border: isRevealed
                      ? `3px solid ${item.color}`
                      : "3px solid transparent",
                  }}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold text-white"
                    style={{
                      backgroundColor: isRevealed ? item.color : "#ccc",
                    }}
                  >
                    {item.letter}
                  </div>

                  <div className="flex-1">
                    <p
                      className="text-3xl md:text-4xl font-serif font-bold"
                      style={{ color: isRevealed ? item.color : "#999" }}
                    >
                      {item.meaning} {item.emoji}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Celebration Message */}
      {showCelebration && (
        <div className="text-center animate-bounce">
          <div
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "#CD853F" }}
          >
            🎉 Perfect! kaldag ka sakin! 🎉
          </div>

          <button
            onClick={() => navigate("/quiz")} // Replace with your navigation
            className="px-12 py-4 text-2xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{
              backgroundColor: "#CD853F",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#8B4513";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#CD853F";
            }}
          >
            Continue to Quiz ✨
          </button>
        </div>
      )}

      {/* Decorative Elements */}
      <div
        className="absolute top-10 left-10 text-4xl opacity-20 animate-spin"
        style={{ animationDuration: "10s" }}
      >
        💕
      </div>
      <div className="absolute top-20 right-16 text-3xl opacity-20 animate-bounce">
        🌟
      </div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-20 animate-pulse">
        💖
      </div>
      <div
        className="absolute bottom-32 right-12 text-4xl opacity-20 animate-spin"
        style={{ animationDuration: "8s" }}
      >
        🎊
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default AcronymPage;
