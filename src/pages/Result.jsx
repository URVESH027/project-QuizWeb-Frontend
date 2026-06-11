import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import { ScoreContext } from "../context/ScoreContext";

const Result = () => {
  const { score, questions, resetQuiz } = useContext(QuizContext);
  const { totalScore, quizzesPlayed, bestScore, addAttempt } = useContext(ScoreContext);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    // Only save once per visit
    if (!saved && total > 0) {
      addAttempt({
        quizName: "TechMaster Assessment",
        score,
        totalQuestions: total,
        percentage,
        date: new Date().toISOString()
      });
      setSaved(true);
    }
  }, [saved, total, score, addAttempt, percentage]);

  let message = "";
  if (percentage === 100) message = "Perfect Score! You're a true Tech Master.";
  else if (percentage >= 80) message = "Great Job! You know your stuff.";
  else if (percentage >= 50) message = "Good effort, but there's room for improvement.";
  else message = "Keep studying! You'll get there.";

  const handleRetake = () => {
    resetQuiz();
    navigate("/quiz");
  };

  return (
    <div className="page-container flex-center">
      <div className="glassmorphism text-center slide-up" style={{ padding: "3rem", maxWidth: "600px", width: "100%" }}>
        <h1 className="gradient-text text-4xl font-bold mb-2">Assessment Complete</h1>
        
        <div className="score-circle my-8 fade-in">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{percentage}%</text>
          </svg>
        </div>

        <h2 className="text-2xl mb-2">You scored {score} out of {total}</h2>
        <p className="subtitle mb-8 text-gray-300">{message}</p>
        
        <div className="stats-box mb-8 p-4" style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", textAlign: "left" }}>
          <p><strong>Your total score:</strong> {totalScore} points</p>
          <p><strong>Quizzes played:</strong> {quizzesPlayed}</p>
          <p><strong>Best score:</strong> {bestScore}%</p>
        </div>

        <button className="primary-btn" onClick={handleRetake}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
