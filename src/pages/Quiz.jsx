import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";

const Quiz = () => {
  const { isFinished, currentQuestionIndex, questions } = useContext(QuizContext);
  const navigate = useNavigate();

  const timeLimit = 60; // seconds for the entire quiz
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Timer logic
  useEffect(() => {
    if (isFinished) return;
    
    if (timeLeft <= 0) {
      navigate("/result");
      return;
    }
    
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeLeft, isFinished, navigate]);

  useEffect(() => {
    if (isFinished) {
      navigate("/result");
    }
  }, [isFinished, navigate]);

  if (questions.length === 0) return null;

  const timerColorClass = timeLeft <= 10 ? "text-error pulse-anim" : "text-main";

  return (
    <div className="page-container flex-center">
      <div className="quiz-wrapper">
        <header className="quiz-header fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
            <div className={`timer-display ${timerColorClass}`} style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Time left: {timeLeft} s
            </div>
          </div>
          <ProgressBar />
        </header>
        <QuizCard />
      </div>
    </div>
  );
};

export default Quiz;
