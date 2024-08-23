"use client"

import { useState, useEffect } from 'react';
import { calculateLeaning } from '../server-actions/calculatePoliticalLeaning';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { saveTest } from '../server-actions/saveTest';

const PoliticalTestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const storedQuestions = typeof window !== 'undefined' ? localStorage.getItem('politicalTestQuestions') : null;
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const handleResponseChange = (index, value) => {
    setResponses(prev => ({
      ...prev,
      [index]: value,
    }));
  };

  const calculateLeaningHandler = async () => {
    try {
      const result = await calculateLeaning(responses);
      setResult(result);
    } catch (error) {
      console.error('Failed to calculate political leaning:', error);
    }
  };

  const saveResultHandler = async () => {
    try {
      await saveTest({
        questions,
        answers: Object.values(responses),
        result,
      });
      router.push('/profile');
    } catch (error) {
      console.error('Failed to save test result:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Political Leaning Test</title>
        <meta name="description" content="Take the political leaning test" />
      </Head>
      <div className="p-6 bg-gray-900 shadow-md text-white">
        <h1 className="text-2xl font-bold mb-6">Political Leaning Test</h1>

        {questions.length > 0 ? (
          <form className="space-y-4">
            {questions.map((question, index) => (
              <div key={index}>
                <label className="block mb-2 font-bold text-lg">{question}</label>
                <textarea
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={calculateLeaningHandler}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>No questions available. Please start the test from the main page.</p>
        )}

        {result && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl mb-4">Your Political Leaning: {result}</h3>
            <div className="flex space-x-4">
              <button
                onClick={saveResultHandler}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Save Result
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Do Not Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PoliticalTestPage;