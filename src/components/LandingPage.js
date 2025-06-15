import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/yyy.jpg";

const LandingPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === "lang") {
      navigate("/acronym");
    } else {
      setError("Incorrect password. Try again!");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "#F0D8C3" }}
    >
      {/* Hero Image Container */}
      <div className="relative mb-12">
        <div className="w-80 h-80 md:w-96 md:h-96 relative">
          <img
            src={img}
            alt="Couple"
            className="w-full h-full object-cover rounded-full shadow-2xl border-8"
            style={{ borderColor: "#8B4513" }}
          />
          {/* Decorative heart overlay */}
          <div className="absolute -top-4 -right-4 text-6xl animate-pulse">
            ❤️
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 leading-tight"
          style={{
            color: "#8B4513",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            fontFamily: "Georgia, serif",
          }}
        >
          Happy Anniversary,
        </h1>
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold"
          style={{
            color: "#CD853F",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            fontFamily: "Georgia, serif",
          }}
        >
          Lang! 💕
        </h2>
      </div>

      {/* Hint Text */}
      <p
        className="text-2xl md:text-3xl text-center mb-12 font-medium max-w-2xl leading-relaxed"
        style={{ color: "#8B4513" }}
      >
        Hint: Unsa tawag nako sa imo? 🤔
      </p>

      {/* Form Container */}
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-semibold mb-3"
              style={{ color: "#8B4513" }}
            >
              Enter Password:
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 text-xl rounded-xl border-3 focus:outline-none focus:ring-4 transition-all duration-300"
              style={{
                borderColor: "#CD853F",
                backgroundColor: "#F0D8C3",
                color: "#8B4513",
              }}
              onFocus={(e) => {
                e.target.style.ringColor = "#CD853F";
                e.target.style.borderColor = "#8B4513";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#CD853F";
              }}
            />
          </div>

          {error && (
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#FFE4E1" }}
            >
              <p className="text-red-600 text-lg text-center font-medium">
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full p-4 text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
            Submit Answer ✨
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-4xl opacity-30 animate-bounce">
        💝
      </div>
      <div className="absolute top-20 right-16 text-3xl opacity-30 animate-pulse">
        🌹
      </div>
      <div className="absolute bottom-20 left-20 text-3xl opacity-30 animate-bounce">
        💕
      </div>
      <div className="absolute bottom-32 right-12 text-4xl opacity-30 animate-pulse">
        🎉
      </div>
    </div>
  );
};

export default LandingPage;
