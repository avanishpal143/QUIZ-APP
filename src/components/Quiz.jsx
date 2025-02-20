import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, History as HistoryIcon } from 'lucide-react';
import { questions } from '../data/questions';
import { saveQuizResult } from '../utils/storage';

function Quiz({ userName }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTimeLeft, setTotalTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
      
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setTimeLeft(30);
    }
  };

  const handleSubmit = () => {
    const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? 
      score + 1 : score;
    
    setScore(finalScore);
    setShowScore(true);
    
    // Save to IndexedDB
    const result = {
      userName,
      score: finalScore,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
    };
    saveQuizResult(result);
  };

  const getFeedback = (score) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Outstanding! You're a quiz master!";
    if (percentage >= 80) return "Great job! You really know your stuff!";
    if (percentage >= 70) return "Good work! Keep learning!";
    if (percentage >= 60) return "Not bad! Room for improvement.";
    return "Keep practicing! You'll get better with time.";
  };

  if (showScore) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
          <p className="text-lg text-gray-600 mb-2">
            Your score: {score} out of {questions.length}
          </p>
          <p className="text-md text-gray-500 mb-4">
            Percentage: {((score / questions.length) * 100).toFixed(1)}%
          </p>
          <p className="text-lg text-indigo-600 mb-6">
            {getFeedback(score)}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-4"
          >
            Try Again
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('showHistory'))}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 inline-flex items-center"
          >
            <HistoryIcon className="h-5 w-5 mr-2" />
            View History
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-600">
              Question time: {timeLeft}s
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Total time remaining: {Math.floor(totalTimeLeft / 60)}:{(totalTimeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-gray-700">{question.question}</p>
        </div>

        <div className="space-y-4">
          {question.type === 'multiple-choice' ? (
            question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border ${
                  selectedAnswer === option
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                {option}
              </button>
            ))
          ) : (
            <input
              type="number"
              value={selectedAnswer}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your answer"
            />
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              disabled={!selectedAnswer}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              disabled={!selectedAnswer}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;