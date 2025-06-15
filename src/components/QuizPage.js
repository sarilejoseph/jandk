import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is my favorite food?",
    options: ["Mango Float", "Lumpia", "Spaghetti", "Others"],
    answer: "Spaghetti",
    emoji: "🍝",
    celebrationText: "Yes! You know me so well! 😋",
  },
  {
    question: "What is my favorite color?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Green",
    emoji: "💚",
    celebrationText: "Perfect! Green is life! 🌿",
  },
  {
    question: "Do you love me?",
    options: ["Yes", "No", "Maybe", "Lubot nimo baho"],
    answer: "Yes",
    emoji: "💕",
    celebrationText: "Aww, I love you too, my Lang! 🥰",
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [isWrong, setIsWrong] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [confetti, setConfetti] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [questionProgress, setQuestionProgress] = useState(0);
  const navigate = useNavigate();

  const createConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 15; i++) {
      newConfetti.push({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"][
          Math.floor(Math.random() * 5)
        ],
        size: Math.random() * 15 + 10,
        velocity: Math.random() * 3 + 2,
      });
    }
    setConfetti(newConfetti);

    setTimeout(() => setConfetti([]), 3000);
  };

  const createSparkle = () => {
    const newSparkle = {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 25 + 15,
    };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 2000);
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);

    if (option === questions[currentQuestion].answer) {
      setShowCelebration(true);
      createConfetti();

      // Create multiple sparkles
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createSparkle(), i * 150);
      }

      setTimeout(() => {
        setShowCelebration(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setQuestionProgress(currentQuestion + 1);
        } else {
          // Quiz completed
          setTimeout(() => {
            navigate("/reward");
          }, 1000);
        }
        setSelectedAnswer("");
      }, 2500);
    } else {
      setIsWrong(true);
      setHearts(hearts - 1);

      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnswer("");
        if (hearts - 1 === 0) {
          setTimeout(() => {
            alert("Going back to start...");
          }, 500);
        }
      }, 1000);
    }
  };

  // Animate confetti
  useEffect(() => {
    if (confetti.length > 0) {
      const interval = setInterval(() => {
        setConfetti((prev) =>
          prev
            .map((piece) => ({
              ...piece,
              y: piece.y + piece.velocity,
              rotation: piece.rotation + 5,
            }))
            .filter((piece) => piece.y < window.innerHeight + 50)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [confetti]);

  const getHeartDisplay = () => {
    const fullHearts = "💖".repeat(hearts);
    const emptyHearts = "🤍".repeat(3 - hearts);
    return fullHearts + emptyHearts;
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden transition-all duration-500 ${
        isWrong ? "animate-pulse" : ""
      }`}
      style={{
        backgroundColor: isWrong ? "#FFB3B3" : "#F0D8C3",
      }}
    >
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
            borderRadius: "50%",
            transform: `rotate(${piece.rotation}deg)`,
            zIndex: 1000,
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
            zIndex: 999,
          }}
        >
          ✨
        </div>
      ))}

      {/* Main Title */}
      <div className="text-center mb-12">
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
          style={{
            color: "#8B4513",
            textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
            fontFamily: "Georgia, serif",
          }}
        >
          Love Quiz
        </h1>
        <p
          className="text-3xl md:text-4xl font-medium"
          style={{ color: "#CD853F" }}
        >
          for My Langging 💕
        </p>
      </div>

      {/* Hearts Display */}
      <div className="mb-8">
        <div
          className="text-2xl md:text-3xl font-bold mb-4 text-center"
          style={{ color: "#8B4513" }}
        >
          Hearts Remaining:
        </div>
        <div className="text-5xl md:text-6xl text-center animate-pulse">
          {getHeartDisplay()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div
          className="flex justify-between text-sm font-medium mb-2"
          style={{ color: "#8B4513" }}
        >
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round((currentQuestion / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-4 shadow-inner">
          <div
            className="h-4 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(currentQuestion / questions.length) * 100}%`,
              backgroundColor: "#CD853F",
            }}
          />
        </div>
      </div>

      {hearts === 0 ? (
        /* Game Over Screen */
        <div
          className="text-center p-12 rounded-3xl shadow-2xl max-w-lg"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <div className="text-6xl mb-6">💔</div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#8B4513" }}
          >
            Aww, no more hearts!
          </h2>
          <p className="text-2xl mb-8" style={{ color: "#CD853F" }}>
            Don't worry, Lang! Try again? 🤗
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            Back to Start 🏠
          </button>
        </div>
      ) : showCelebration ? (
        /* Celebration Screen */
        <div
          className="text-center p-12 rounded-3xl shadow-2xl max-w-2xl animate-bounce"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <div className="text-8xl mb-6">
            {questions[currentQuestion].emoji}
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color:
                questions[currentQuestion].answer === "Spaghetti"
                  ? "#FF6B6B"
                  : questions[currentQuestion].answer === "Green"
                  ? "#4ECDC4"
                  : "#CD853F",
            }}
          >
            Correct! 🎉
          </h2>
          <p className="text-2xl md:text-3xl" style={{ color: "#8B4513" }}>
            {questions[currentQuestion].celebrationText}
          </p>
        </div>
      ) : (
        /* Quiz Question */
        <div
          className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">
              {questions[currentQuestion].emoji}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-relaxed"
              style={{ color: "#8B4513" }}
            >
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== ""}
                className={`p-6 text-xl md:text-2xl font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedAnswer === option
                    ? option === questions[currentQuestion].answer
                      ? "animate-pulse"
                      : "animate-bounce"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    selectedAnswer === option
                      ? option === questions[currentQuestion].answer
                        ? "#4ECDC4"
                        : "#FF6B6B"
                      : "#CD853F",
                  color: "white",
                  border:
                    selectedAnswer === option
                      ? "4px solid white"
                      : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (selectedAnswer === "") {
                    e.target.style.backgroundColor = "#8B4513";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAnswer === "") {
                    e.target.style.backgroundColor = "#CD853F";
                  }
                }}
              >
                {option}
                {selectedAnswer === option &&
                  option === questions[currentQuestion].answer &&
                  " ✅"}
                {selectedAnswer === option &&
                  option !== questions[currentQuestion].answer &&
                  " ❌"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div
        className="absolute top-10 left-10 text-4xl opacity-20 animate-spin"
        style={{ animationDuration: "10s" }}
      >
        💝
      </div>
      <div className="absolute top-20 right-16 text-3xl opacity-20 animate-bounce">
        🎀
      </div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-20 animate-pulse">
        💖
      </div>
      <div
        className="absolute bottom-32 right-12 text-4xl opacity-20 animate-spin"
        style={{ animationDuration: "8s" }}
      >
        🌟
      </div>
    </div>
  );
};

export default QuizPage;
