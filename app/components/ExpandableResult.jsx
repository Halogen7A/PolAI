'use client'

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function ExpandableResult({ test }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-gray-700 shadow-md rounded-lg p-4 border border-gray-600 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
                <h2 className="text-xl font-semibold">{test.result}</h2>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="text-gray-400" />
            </div>
            {isOpen && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Questions and Answers:</h3>
                    {test.questions.map((question, qIndex) => (
                                <div key={qIndex} className="mb-2">
                                    <p className="font-semibold">{`Q${qIndex + 1}: ${question}`}</p>
                                    <p className="text-gray-300">{`A${qIndex + 1}: ${test.answers[qIndex]}`}</p>
                                </div>
                            ))}
                </div>
            )}
        </div>
    );
}

