
import React from 'react';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
  onOptionClick: (value: string, label: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  const isUser = message.sender === Sender.User;

  const userBubbleClasses = 'bg-ziata-indigo text-white self-end';
  const ziataBubbleClasses = 'bg-gray-200 text-gray-800 self-start';

  const userContainerClasses = 'flex justify-end items-end gap-3';
  const ziataContainerClasses = 'flex justify-start items-end gap-3';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={isUser ? userContainerClasses : ziataContainerClasses}>
        {!isUser && (
          <div className="bg-ziata-indigo rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-md font-bold">Z</span>
          </div>
        )}
        <div
          className={`max-w-md md:max-w-lg rounded-2xl px-4 py-3 ${isUser ? userBubbleClasses : ziataBubbleClasses
            }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        {isUser && (
          <div className="bg-ziata-indigo rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">Me</span>
          </div>
        )}
      </div>

      {message.options && (
        <div className="flex flex-wrap gap-2 mt-3 self-start ml-11">
          {message.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onOptionClick(option.value, option.label)}
              className="bg-white text-ziata-indigo font-semibold py-2 px-4 border-2 border-ziata-indigo rounded-full hover:bg-ziata-indigo hover:text-white transition-colors duration-200"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
