import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: "CSS",
  },
  {
    question: "Which HTML tag creates the largest heading?",
    options: ["<h6>", "<h3>", "<h1>", "<head>"],
    correctAnswer: "<h1>",
  },
  {
    question:
      "Which JavaScript keyword creates a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const",
  },
  {
    question: "Which array method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    correctAnswer: "push()",
  },
  {
    question:
      "Which React hook is used to store changing data in a component?",
    options: ["useState()", "useEffect()", "useMemo()", "useReducer()"],
    correctAnswer: "useState()",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extra",
    ],
    correctAnswer: "JavaScript XML",
  },
  {
    question: "Which CSS property changes the color of text?",
    options: ["background-color", "font-style", "color", "text-align"],
    correctAnswer: "color",
  },
  {
    question: "Which HTML element is used to create a link?",
    options: ["<link>", "<a>", "<href>", "<nav>"],
    correctAnswer: "<a>",
  },
  {
    question: "Which operator checks equality without converting types?",
    options: ["==", "=", "===", "!="],
    correctAnswer: "===",
  },
  {
    question: "What should each item in a rendered React list have?",
    options: [
      "A unique key prop",
      "An id attribute",
      "A ref",
      "A class name",
    ],
    correctAnswer: "A unique key prop",
  },
];

function getResultMessage(percentage) {
  if (percentage === 100) {
    return "Perfect score! You really know your stuff.";
  }
  if (percentage >= 80) {
    return "Great job! You know the basics well.";
  }
  if (percentage >= 60) {
    return "Not bad! Keep practicing to improve.";
  }
  return "Keep going! Review the topics and try again.";
}

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const progress = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  );
  const percentage = Math.round((score / totalQuestions) * 100);

  function startQuiz() {
    setHasStarted(true);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
  }

  function handleAnswerClick(option) {
    // Only the first answer for a question is accepted.
    if (selectedAnswer !== "") {
      return;
    }

    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  }

  function handleNextClick() {
    if (isLastQuestion) {
      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer("");
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResults(false);
    setHasStarted(true);
  }

  function getAnswerClass(option) {
    if (selectedAnswer === "") {
      return "answer-btn";
    }
    if (option === currentQuestion.correctAnswer) {
      return "answer-btn correct";
    }
    if (option === selectedAnswer) {
      return "answer-btn wrong";
    }
    return "answer-btn faded";
  }

  if (!hasStarted) {
    return (
      <main className="page">
        <section className="quiz-card start-screen">
          <h1 className="quiz-title">QuizMaster</h1>
          <p className="start-text">
            Test your knowledge of HTML, CSS, JavaScript, and React.
          </p>
          <p className="start-info">
            {totalQuestions} questions. No time limit. Your score appears at the
            end.
          </p>

          <button type="button" className="btn start-btn" onClick={startQuiz}>
            Start Quiz
          </button>

          <p className="small-note">A small React practice project.</p>
        </section>
      </main>
    );
  }

  if (showResults) {
    return (
      <main className="page">
        <section className="quiz-card result-screen">
          <h1 className="quiz-title">Quiz Results</h1>

          <p className="score-percentage">{percentage}%</p>
          <p className="score-detail">
            You got {score} out of {totalQuestions} correct.
          </p>
          <p className="result-message">{getResultMessage(percentage)}</p>

          <button
            type="button"
            className="btn restart-btn"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title small">QuizMaster</h1>
          <span className="question-count">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="answer-list">
          {currentQuestion.options.map((option) => (
            <button
              type="button"
              key={option}
              className={getAnswerClass(option)}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== ""}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== "" && (
          <p
            className={
              selectedAnswer === currentQuestion.correctAnswer
                ? "feedback correct"
                : "feedback wrong"
            }
            aria-live="polite"
          >
            {selectedAnswer === currentQuestion.correctAnswer
              ? "Correct!"
              : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`}
          </p>
        )}

        <button
          type="button"
          className="btn next-btn"
          onClick={handleNextClick}
          disabled={selectedAnswer === ""}
        >
          {isLastQuestion ? "See Results" : "Next Question"}
        </button>
      </section>
    </main>
  );
}

export default App;
