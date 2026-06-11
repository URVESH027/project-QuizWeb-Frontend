import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";

const Home = () => {
  const navigate = useNavigate();
  const { loading, error, questions } = useContext(QuizContext);

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="page-container flex-center">
      <div className="glassmorphism text-center slide-up" style={{ padding: "3rem", maxWidth: "600px" }}>
        <h1 className="gradient-text text-4xl font-bold mb-4">TechMaster Quiz</h1>
        <p className="subtitle mb-8 text-gray-300">
          Test your knowledge in Web Development, React, and Software Engineering. Are you ready to prove your skills?
        </p>
        
        {loading ? (
          <div className="loader">Loading challenges...</div>
        ) : error ? (
          <div className="error-message">Failed to load: {error}</div>
        ) : questions.length === 0 ? (
          <div className="error-message">No questions available right now.</div>
        ) : (
          <button className="primary-btn pulse-anim" onClick={startQuiz}>
            Start Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
