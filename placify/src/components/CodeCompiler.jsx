import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function CodeCompiler({ onLanguageChange, testCases = [] }) {
  const [code, setCode] = useState('// Write your code here\n');
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [executionTime, setExecutionTime] = useState('');

  const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
  };

  const languages = [
    { id: 'python', name: '🐍 Python', label: 'python' },
    { id: 'javascript', name: '📝 JavaScript', label: 'javascript' },
    { id: 'java', name: '☕ Java', label: 'java' },
    { id: 'cpp', name: '⚙️ C++', label: 'cpp' },
    { id: 'c', name: '🔧 C', label: 'c_cpp' },
  ];

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (onLanguageChange) onLanguageChange(newLanguage);
  };

  const executeCode = async () => {
    if (!code.trim()) {
      setError('Please write some code first');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('Executing...');
    setTestResults([]);
    const startTime = Date.now();

    try {
      const response = await fetch(`${API_URL}/compiler/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          languageId: languageMap[language] || 71,
          input: input || '',
        }),
      });

      const data = await response.json();
      const endTime = Date.now();
      setExecutionTime(`${endTime - startTime}ms`);

      if (response.ok) {
        setOutput(data.output || 'Program executed successfully (no output)');
        setError('');
      } else {
        setError(data.message || 'Compilation failed');
        setOutput('');
      }
    } catch (err) {
      setError('❌ Failed to execute code. Check if backend is running.');
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  const runTestCases = async () => {
    if (!code.trim()) {
      setError('Please write some code first');
      return;
    }

    if (testCases.length === 0) {
      setError('No test cases available');
      return;
    }

    setLoading(true);
    setError('');
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      try {
        const response = await fetch(`${API_URL}/compiler/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            languageId: languageMap[language] || 71,
            input: testCase.input || '',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const passed = data.output?.trim() === testCase.expectedOutput?.trim();
          results.push({
            id: i + 1,
            passed,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: data.output,
          });
        } else {
          results.push({
            id: i + 1,
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: 'Compilation Error: ' + data.message,
          });
        }
      } catch (err) {
        results.push({
          id: i + 1,
          passed: false,
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: 'Error: ' + err.message,
        });
      }
    }

    setTestResults(results);
    const passedCount = results.filter((r) => r.passed).length;
    setOutput(`✅ Test Results: ${passedCount}/${results.length} passed`);
    setLoading(false);
  };

  const aceLanguageMode = {
    python: 'python',
    javascript: 'javascript',
    java: 'java',
    cpp: 'c_cpp',
    c: 'c_cpp',
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-950 to-gray-900 text-white rounded-lg p-6 space-y-4 border border-gray-800 shadow-xl">
      {/* Header with Language Selection */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h2 className="text-2xl font-bold">💻 Code Compiler</h2>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-700 transition disabled:opacity-50"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Code Editor */}
      <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <AceEditor
          mode={aceLanguageMode[language]}
          theme="monokai"
          onChange={setCode}
          value={code}
          name="CODE_EDITOR"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            fontSize: 14,
            fontFamily: 'Fira Code',
          }}
          width="100%"
          height="400px"
        />
      </div>

      {/* Input/Output Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">📥 Input (Optional)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input here or leave empty..."
            className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm font-mono focus:border-blue-500 transition"
          />
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-semibold mb-2">📤 Output</label>
          <div className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm font-mono overflow-auto">
            {error ? (
              <span className="text-red-400 font-semibold">{error}</span>
            ) : (
              <span className="text-green-400 whitespace-pre-wrap break-words">{output}</span>
            )}
            {executionTime && (
              <div className="text-gray-500 text-xs mt-2">⏱️ Execution time: {executionTime}</div>
            )}
          </div>
        </div>
      </div>

      {/* Run Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={executeCode}
          disabled={loading}
          className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
        >
          {loading ? '⏳ Running...' : '▶️ Run Code'}
        </button>
        {testCases.length > 0 && (
          <button
            onClick={runTestCases}
            disabled={loading}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 font-bold rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            {loading ? '⏳ Testing...' : '🧪 Run Test Cases'}
          </button>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3">🧪 Test Case Results</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {testResults.map((result) => (
              <div
                key={result.id}
                className={`p-3 rounded-lg border ${result.passed
                    ? 'bg-green-900 border-green-700'
                    : 'bg-red-900 border-red-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {result.passed ? '✅' : '❌'} Test Case #{result.id}
                  </span>
                  <span className={result.passed ? 'text-green-300' : 'text-red-300'}>
                    {result.passed ? 'PASSED' : 'FAILED'}
                  </span>
                </div>
                <div className="text-xs mt-2 space-y-1 text-gray-300">
                  <div>Input: <code className="bg-gray-900 px-2 py-1 rounded">{result.input || '(empty)'}</code></div>
                  <div>Expected: <code className="bg-gray-900 px-2 py-1 rounded">{result.expected}</code></div>
                  <div>Got: <code className={`px-2 py-1 rounded ${result.passed ? 'bg-green-900' : 'bg-red-900'}`}>{result.actual}</code></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeCompiler;
