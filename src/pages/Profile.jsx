import React, { useContext, useState } from "react";
import { ScoreContext } from "../context/ScoreContext";

const Profile = () => {
  const { username, updateUsername, totalScore, quizzesPlayed, bestScore, history } = useContext(ScoreContext);
  const [nameInput, setNameInput] = useState(username);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (nameInput.trim()) {
      updateUsername(nameInput.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="page-container flex-center" style={{ alignItems: "flex-start", paddingTop: "5rem" }}>
      <div className="glassmorphism slide-up" style={{ padding: "2.5rem", maxWidth: "800px", width: "100%" }}>
        <h1 className="gradient-text text-4xl font-bold mb-8">User Profile</h1>
        
        <div className="profile-edit mb-8" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <label htmlFor="username" className="font-bold text-xl">Username:</label>
          <input
            id="username"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="input-field"
            style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "white", fontSize: "1.1rem" }}
          />
          <button className="primary-btn" onClick={handleSave} style={{ padding: "10px 24px" }}>
            Save
          </button>
          {isSaved && <span className="text-success fade-in">Saved!</span>}
        </div>

        <div className="stats-grid mb-8" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div className="stat-card">
            <h3>Total Score</h3>
            <p className="text-2xl font-bold text-primary">{totalScore}</p>
          </div>
          <div className="stat-card">
            <h3>Quizzes Played</h3>
            <p className="text-2xl font-bold text-primary">{quizzesPlayed}</p>
          </div>
          <div className="stat-card">
            <h3>Best Score</h3>
            <p className="text-2xl font-bold text-primary">{bestScore}%</p>
          </div>
        </div>

        <h2 className="text-2xl mb-4 font-bold">Past Attempts</h2>
        {history.length === 0 ? (
          <p className="text-gray-300">No attempts yet. Go play a quiz!</p>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quiz Name</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().map((attempt) => (
                  <tr key={attempt.id}>
                    <td>{attempt.quizName}</td>
                    <td>{attempt.score} / {attempt.totalQuestions}</td>
                    <td>{attempt.percentage}%</td>
                    <td>{new Date(attempt.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
