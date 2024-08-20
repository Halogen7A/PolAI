'use client'

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateQuestions } from '../server-actions/generateQuestions';

const PoliticalTestButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStartTest = async () => {
    setIsLoading(true);
    try {
      const questionsArray = await generateQuestions();
      // Store the questions in localStorage
      localStorage.setItem('politicalTestQuestions', JSON.stringify(questionsArray));
      // Navigate to the test page
      if (isMounted) {
        router.push('/political-test');
      }
    } catch (error) {
      console.error('Failed to generate questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // or a loading indicator
  }

  return (
    <button
      onClick={handleStartTest}
      disabled={isLoading}
      className={`bg-gradient-animation text-white py-2 px-4 rounded transition duration-300 ease-in-out ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Loading...' : 'Start Political Leaning Test'}
    </button>
  );
};

export default PoliticalTestButton;
