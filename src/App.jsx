import React, { useState, useEffect } from 'react';
import QuizForm from './components/QuizForm';
import Quiz from './components/Quiz';
import History from './components/History';
import { BookOpen, Home, History as HistoryIcon } from 'lucide-react';

function App() {
  const [userName, setUserName] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const handleShowHistory = () => {
      setShowHistory(true);
      setShowQuiz(false);
    };

    window.addEventListener('showHistory', handleShowHistory);
    return () => window.removeEventListener('showHistory', handleShowHistory);
  }, []);

  const handleStartQuiz = (name) => {
    setUserName(name);
    setShowQuiz(true);
    setShowHistory(false);
  };

  const handleHome = () => {
    setShowQuiz(false);
    setShowHistory(false);
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Quiz App</span>
          </div>
          {userName && (
            <div className="flex items-center space-x-4">
              <span className="text-Black-800 text-xl"> {userName} </span>
              <button
                onClick={handleHome}
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  setShowHistory(true);
                  setShowQuiz(false);
                }}
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
              >
                <HistoryIcon className="h-5 w-5" />
                <span>History</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {!userName && !showQuiz && !showHistory && (
          <QuizForm onStart={handleStartQuiz} />
        )}
        {userName && showQuiz && !showHistory && (
          <Quiz userName={userName} />
        )}
        {showHistory && (
          <History onBack={handleHome} />
        )}
      </main>
    </div>
  );
}

export default App;