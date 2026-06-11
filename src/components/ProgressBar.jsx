import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const ProgressBar = () => {
  const { currentQuestionIndex, questions } = useContext(QuizContext);
  const total = questions.length;
  const progress = total > 0 ? (currentQuestionIndex / total) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
