import React, { useState } from 'react';
import CodeCompiler from './CodeCompiler';

function CodingQuestion({ question, onSubmit }) {
  const [showCompiler, setShowCompiler] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('python');

  return (
    <div className="w-full space-y-6">
      {/* Problem Statement */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-lg p-6 border border-gray-700 shadow-lg">
        {/* Title and Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{question.title}</h1>
          <span className={`px-4 py-2 rounded-full font-bold text-sm ${question.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
              question.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
            }`}>
            {question.difficulty}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">📝 Problem Description</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{question.description}</p>
        </div>

        {/* Constraints */}
        {question.constraints && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-blue-400">⚙️ Constraints</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {question.constraints.map((constraint, idx) => (
                <li key={idx}>{constraint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-400">📌 Examples</h2>
          <div className="space-y-3">
            {question.examples.map((example, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                <p className="text-sm font-semibold text-cyan-400 mb-2">Example {idx + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1">Input:</p>
                    <code className="block bg-black p-3 rounded text-green-400 text-sm font-mono wrap-break-word whitespace-pre-wrap">
                      {example.input}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1">Output:</p>
                    <code className="block bg-black p-3 rounded text-yellow-400 text-sm font-mono wrap-break-word whitespace-pre-wrap">
                      {example.output}
                    </code>
                  </div>
                </div>
                {example.explanation && (
                  <p className="text-sm text-gray-400 mt-3">
                    <span className="text-gray-500">Explanation: </span>{example.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        {!showCompiler && (
          <button
            onClick={() => setShowCompiler(true)}
            className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            💻 Start Coding
          </button>
        )}
      </div>

      {/* Code Compiler */}
      {showCompiler && (
        <div className="space-y-4">
          <CodeCompiler
            testCases={question.testCases}
            onLanguageChange={setSelectedLanguage}
          />

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowCompiler(false)}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 font-bold rounded-lg transition"
            >
              ← Back to Problem
            </button>
            <button
              onClick={() => onSubmit && onSubmit(selectedLanguage)}
              className="flex-1 py-3 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              ✅ Submit Solution
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodingQuestion;
