import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AcronymPage from "./components/AcronymPage";
import QuizPage from "./components/QuizPage";
import RewardPage from "./components/RewardPage";

function App() {
  return (
    <div className="min-h-screen bg-pink-200 font-lora">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/acronym" element={<AcronymPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/reward" element={<RewardPage />} />
      </Routes>
    </div>
  );
}

export default App;
