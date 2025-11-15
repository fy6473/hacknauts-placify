import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CodingQuestion from '../components/CodingQuestion';
import { codingQuestions } from '../data/codingQuestions';

function TechnicalTestPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes

  // Redirect if not authenticated
  if (!user || !token) {
    navigate('/signin');
    return null;
  }

  const currentQuestion = codingQuestions[currentQuestionIndex];

  const handleSubmitSolution = (language) => {
    setSubmittedAnswers({
      ...submittedAnswers,
      [currentQuestion.id]: {
        language,
        submittedAt: new Date(),
      },
    });

    alert(`✅ Solution submitted in ${language}!`);

    // Move to next question
    if (currentQuestionIndex < codingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleFinishTest = () => {
    setShowResults(true);
  };

  // Timer interval
  React.useEffect(() => {
    if (!testStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, showResults]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const solvedCount = Object.keys(submittedAnswers).length;
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700 shadow-xl text-center">
            <h1 className="text-4xl font-bold mb-4">🎉 Test Completed!</h1>
            <div className="text-6xl font-bold mb-2 text-blue-400">
              {solvedCount}/{codingQuestions.length}
            </div>
            <p className="text-xl text-gray-300 mb-6">
              You solved {solvedCount} out of {codingQuestions.length} problems
            </p>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">📊 Your Solutions</h2>
              <div className="space-y-2">
                {codingQuestions.map((q) => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <span className="font-semibold">{q.title}</span>
                    {submittedAnswers[q.id] ? (
                      <span className="text-green-400 font-bold">✅ Solved</span>
                    ) : (
                      <span className="text-red-400 font-bold">❌ Not Attempted</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTestStarted(false);
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setSubmittedAnswers({});
                  setTimeLeft(60 * 60);
                }}
                className="flex-1 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-bold rounded-lg transition"
              >
                🔄 Retake Test
              </button>
              <button
                onClick={() => navigate('/home')}
                className="flex-1 py-3 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 font-bold rounded-lg transition"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700 shadow-xl">
            <h1 className="text-4xl font-bold mb-6">💻 Technical Coding Round</h1>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700 space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">📋 Test Details</h2>
                <p className="text-gray-300 mb-2">
                  <strong>Total Questions:</strong> {codingQuestions.length}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Time Limit:</strong> 60 minutes
                </p>
                <p className="text-gray-300">
                  <strong>Difficulty:</strong> Easy to Medium
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">🎯 Instructions</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Read the problem statement carefully</li>
                  <li>Write and test your solution using the code editor</li>
                  <li>Run test cases to verify your solution</li>
                  <li>Submit your solution to move to the next problem</li>
                  <li>You can select your preferred programming language</li>
                  <li>Make sure your output matches exactly with expected output</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">🌐 Supported Languages</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="bg-gray-800 p-2 rounded text-sm">🐍 Python 3</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">📝 JavaScript</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">☕ Java</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">⚙️ C++</div>
                  <div className="bg-gray-800 p-2 rounded text-sm">🔧 C</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/home')}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 font-bold rounded-lg transition"
              >
                ← Back
              </button>
              <button
                onClick={handleStartTest}
                className="flex-1 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-bold rounded-lg transition transform hover:scale-105"
              >
                🚀 Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div>
            <h1 className="text-2xl font-bold">💻 Technical Round</h1>
            <p className="text-gray-400">
              Question {currentQuestionIndex + 1} of {codingQuestions.length}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className={`text-3xl font-bold px-4 py-2 rounded-lg ${timeLeft > 600 ? 'bg-blue-900' : 'bg-red-900'
              }`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-400">
              Solved: {Object.keys(submittedAnswers).length}/{codingQuestions.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Questions List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 sticky top-6">
              <h2 className="text-lg font-bold mb-4">📚 Questions</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {codingQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg transition border ${idx === currentQuestionIndex
                        ? 'bg-blue-900 border-blue-700'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{q.title}</span>
                      {submittedAnswers[q.id] ? (
                        <span className="text-green-400 text-lg">✅</span>
                      ) : (
                        <span className="text-gray-500 text-lg">○</span>
                      )}
                    </div>
                    <span className={`text-xs ${q.difficulty === 'Easy'
                        ? 'text-green-400'
                        : 'text-yellow-400'
                      }`}>
                      {q.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Question and Compiler */}
          <div className="lg:col-span-2">
            <CodingQuestion
              question={currentQuestion}
              onSubmit={handleSubmitSolution}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex gap-3 justify-between">
          <button
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }
            }}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 font-bold rounded-lg transition"
          >
            ← Previous
          </button>

          <button
            onClick={handleFinishTest}
            className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold rounded-lg transition"
          >
            🏁 Finish Test
          </button>

          <button
            onClick={() => {
              if (currentQuestionIndex < codingQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            }}
            disabled={currentQuestionIndex === codingQuestions.length - 1}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 font-bold rounded-lg transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechnicalTestPage;
