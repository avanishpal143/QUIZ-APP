import React, { useState, useEffect } from 'react';
import { getQuizHistory } from '../utils/storage';
import { ArrowLeft, Clock, Home } from 'lucide-react';

function History({ onBack }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const results = await getQuizHistory();
      setHistory(results);
    };
    loadHistory();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quiz History</h2>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No quiz attempts yet</p>
            <button
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Home
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {history.map((result, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      {result.userName}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Score: {result.score}/{result.totalQuestions}
                    </span>
                    <span className="text-gray-600">
                      {((result.score / result.totalQuestions) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={onBack}
                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default History;