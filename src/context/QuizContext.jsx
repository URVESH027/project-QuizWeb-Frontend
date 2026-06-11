import React, { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/questions`);
      if (!response.ok) throw new Error("Failed to load questions");
      const data = await response.json();
      setQuestions(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    return isCorrect;
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    // Optionally fetch questions again to randomize if we add a randomizer
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        score,
        loading,
        error,
        answerQuestion,
        nextQuestion,
        resetQuiz,
        isFinished: currentQuestionIndex >= questions.length && questions.length > 0,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
