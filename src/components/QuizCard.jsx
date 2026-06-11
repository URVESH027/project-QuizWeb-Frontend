import React, { useState, useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const QuizCard = () => {
  const { questions, currentQuestionIndex, answerQuestion, nextQuestion } = useContext(QuizContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = questions[currentQuestionIndex];

  const handleSelect = (option) => {
    if (selectedOption) return; // Prevent multiple clicks
    setSelectedOption(option);
    const correct = answerQuestion(option);
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(null);
    nextQuestion();
  };

  if (!question) return null;

  return (
    <div className="quiz-card glassmorphism slide-up">
      <div className="quiz-card-header">
        <span className="badge difficulty">{question.difficulty}</span>
        <span className="badge category">{question.category}</span>
      </div>
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-grid">
        {question.options.map((option, index) => {
          let btnClass = "option-btn";
          if (selectedOption) {
            if (option === question.answer) btnClass += " correct";
            else if (option === selectedOption) btnClass += " incorrect";
            else btnClass += " disabled";
          }

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => handleSelect(option)}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`explanation fade-in ${isCorrect ? "success" : "error"}`}>
          <p><strong>{isCorrect ? "Correct!" : "Incorrect!"}</strong> {question.explanation}</p>
          <button className="primary-btn mt-4" onClick={handleNext}>
            {currentQuestionIndex === questions.length - 1 ? "See Results" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
