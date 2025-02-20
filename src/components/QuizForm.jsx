import React, { useState } from 'react';
import { UserCircle, BookOpen, Brain } from 'lucide-react';

function QuizForm({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      onStart(name);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90"></div>
          <div className="relative p-8">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-center text-white mb-2">
              Quiz App
            </h1>
            <p className="text-center text-white/80 mb-4">
              Test your knowledge
            </p>
          </div>
        </div>

        <div className="p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  className={`block w-full pl-10 pr-4 py-3 border ${
                    error
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } rounded-lg shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="Your name"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span> {error}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Starting...
                  </>
                ) : (
                  <>
                    <BookOpen className="h-5 w-5 mr-2" />
                    Start Quiz
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500">
                By starting the quiz, you'll have 30 seconds per question and 5
                minutes total to complete all questions.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuizForm;