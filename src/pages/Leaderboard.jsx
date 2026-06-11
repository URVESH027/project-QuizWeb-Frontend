import React, { useEffect, useState, useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const Leaderboard = () => {
  const { username } = useContext(ScoreContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
        if (!response.ok) throw new Error("Failed to load leaderboard");
        const data = await response.json();
        setLeaderboard(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="page-container flex-center" style={{ alignItems: "flex-start", paddingTop: "5rem" }}>
      <div className="glassmorphism slide-up" style={{ padding: "2.5rem", maxWidth: "800px", width: "100%" }}>
        <h1 className="gradient-text text-4xl font-bold mb-2">Global Leaderboard</h1>
        <p className="subtitle mb-8 text-gray-300">Compare your stats with other tech masters around the world!</p>
        
        {loading ? (
          <div className="loader">Loading global ranks...</div>
        ) : error ? (
          <div className="error-message">Could not load leaderboard: {error}</div>
        ) : leaderboard.length === 0 ? (
          <p className="text-gray-300">No entries yet. Be the first to play!</p>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Best Score</th>
                  <th>Total Score</th>
                  <th>Quizzes Played</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const isCurrentUser = entry.username === username;
                  return (
                    <tr key={index} className={isCurrentUser ? "highlight-row" : ""}>
                      <td>#{index + 1}</td>
                      <td style={{ fontWeight: isCurrentUser ? "bold" : "normal", color: isCurrentUser ? "var(--primary)" : "inherit" }}>
                        {entry.username} {isCurrentUser && "(You)"}
                      </td>
                      <td>{entry.bestScore}%</td>
                      <td>{entry.totalScore}</td>
                      <td>{entry.quizzesPlayed}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
