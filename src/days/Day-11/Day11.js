
import { useState } from "react";

const questions = [
  {
    question: "Which language is used to build React applications?",
    options: ["Python", "JavaScript", "Java", "C++"],
    answer: "JavaScript",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    answer: "useState",
  },
  {
    question: "Which method is used to display lists in React?",
    options: ["map()", "filter()", "reduce()", "find()"],
    answer: "map()",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "What is JSX?",
    options: [
      "A database",
      "A JavaScript syntax extension",
      "A CSS framework",
      "A programming language",
    ],
    answer: "A JavaScript syntax extension",
  },
];

function Day11() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];

  // Select an answer
  const handleAnswer = (option) => {
    if (answered) return;

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
            React Quiz App 🧠
          </h1>
          <p className="text-slate-400 mt-2">
            Test your knowledge and improve your skills!
          </p>
        </div>

        {/* Quiz Questions */}
        {!showResult ? (
          <div>

            {/* Progress */}
            <div className="flex justify-between text-sm text-slate-400 mb-3">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>
                Score: {score}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 h-2 rounded-full mb-8">
              <div
                className="bg-cyan-400 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            {/* Question */}
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">

              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === question.answer;

                let optionStyle =
                  "border-slate-700 bg-slate-800 hover:border-cyan-400";

                if (answered && isCorrect) {
                  optionStyle =
                    "border-green-500 bg-green-500/10 text-green-400";
                } else if (answered && isSelected && !isCorrect) {
                  optionStyle =
                    "border-red-500 bg-red-500/10 text-red-400";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-lg border transition ${optionStyle} disabled:cursor-not-allowed`}
                  >
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}

            </div>

            {/* Answer Feedback */}
            {answered && (
              <div className="mt-5">
                {selectedAnswer === question.answer ? (
                  <p className="text-green-400 font-semibold">
                    Correct answer! 🎉
                  </p>
                ) : (
                  <p className="text-red-400 font-semibold">
                    Wrong answer! Correct answer: {question.answer}
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {answered && (
              <button
                onClick={handleNext}
                className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-3 rounded-lg transition"
              >
                {currentQuestion === questions.length - 1
                  ? "View Result"
                  : "Next Question"}
              </button>
            )}

          </div>
        ) : (

          /* Result Screen */
          <div className="text-center py-8">

            <div className="text-6xl mb-5">
              {score >= 3 ? "🏆" : "📚"}
            </div>

            <h2 className="text-3xl font-bold text-cyan-400 mb-3">
              Quiz Completed!
            </h2>

            <p className="text-slate-400 mb-6">
              Here is your final result.
            </p>

            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <p className="text-slate-400 mb-2">
                Your Score
              </p>

              <h3 className="text-5xl font-bold text-green-400">
                {score} / {questions.length}
              </h3>

              <p className="text-cyan-400 mt-3">
                Percentage:{" "}
                {Math.round((score / questions.length) * 100)}%
              </p>
            </div>

            <p className="text-lg mb-6">
              {score === questions.length
                ? "Excellent! Perfect score! 🌟"
                : score >= 3
                ? "Great job! Keep learning! 👏"
                : "Keep practicing. You can do better! 💪"}
            </p>

            <button
              onClick={handleRestart}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-8 py-3 rounded-lg transition"
            >
              Restart Quiz
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Day11;
