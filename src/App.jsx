import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { ScoreProvider } from "./context/ScoreContext";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import ErrorBoundary from "./components/ErrorBoundary";

const Header = () => (
  <nav className="app-header">
    <div className="header-links">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/profile" className="nav-link">Profile</Link>
      <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
    </div>
  </nav>
);

function App() {
  return (
    <ErrorBoundary>
      <ScoreProvider>
        <QuizProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </Router>
        </QuizProvider>
      </ScoreProvider>
    </ErrorBoundary>
  );
}

export default App;
