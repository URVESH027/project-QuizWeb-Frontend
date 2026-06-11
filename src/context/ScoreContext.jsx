import React, { createContext, useState, useEffect } from "react";

export const ScoreContext = createContext();

const initialScoreState = {
  username: "Guest",
  totalScore: 0,
  quizzesPlayed: 0,
  bestScore: 0, // stored as percentage
  history: [],
};

const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export const ScoreProvider = ({ children }) => {
  const [scoreData, setScoreData] = useState(() => {
    const saved = localStorage.getItem("quizScoreData");
    return saved ? JSON.parse(saved) : initialScoreState;
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem("quizScoreData", JSON.stringify(scoreData));
  }, [scoreData]);

  const updateUsername = (newUsername) => {
    const nextState = { ...scoreData, username: newUsername };
    setScoreData(nextState);
    syncLeaderboardWithBackend(nextState);
  };

  const addAttempt = ({ quizName, score, totalQuestions, percentage, date }) => {
    setScoreData((prev) => {
      const newHistory = [
        ...prev.history,
        { id: Date.now(), quizName, score, totalQuestions, percentage, date },
      ];
      
      const newBestScore = Math.max(prev.bestScore, percentage);
      const newTotalScore = prev.totalScore + score;
      const newQuizzesPlayed = prev.quizzesPlayed + 1;

      const newState = {
        ...prev,
        bestScore: newBestScore,
        totalScore: newTotalScore,
        quizzesPlayed: newQuizzesPlayed,
        history: newHistory,
      };

      // Sync with MongoDB Leaderboard
      syncLeaderboardWithBackend(newState);

      return newState;
    });
  };

  const syncLeaderboardWithBackend = async (userState) => {
    if (userState.quizzesPlayed === 0) return; // Don't sync users who haven't played
    try {
      await fetch(`${API_BASE_URL}/api/leaderboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userState.username,
          bestScore: userState.bestScore,
          totalScore: userState.totalScore,
          quizzesPlayed: userState.quizzesPlayed
        })
      });
    } catch (err) {
      console.error("Failed to sync leaderboard:", err);
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        ...scoreData,
        updateUsername,
        addAttempt,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
