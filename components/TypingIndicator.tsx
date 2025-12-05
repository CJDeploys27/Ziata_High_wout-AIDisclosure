
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start items-center gap-3">
      <div className="bg-ziata-indigo rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
        <span className="text-white text-md font-bold">Z</span>
      </div>
      <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-3 flex items-center space-x-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
