
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Sender, Topic, ChatState, Dialogue } from './types';
import { DIALOGUE_FLOW, INITIAL_MESSAGES } from './constants';
import { analyzeUserResponsesProxy, rephraseUserStatementProxy, affirmTopicSelectionProxy } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [chatState, setChatState] = useState<ChatState>(ChatState.WELCOME);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSessionClosed, setIsSessionClosed] = useState(false);

  const currentTopicRef = useRef<Topic | null>(null);
  const currentQuestionIndexRef = useRef(0);
  const userAnswersRef = useRef<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (text: string, sender: Sender, options?: { label: string; value: string }[]) => {
    const newMessage: Message = {
      id: Date.now() + Math.random(),
      text,
      sender,
      options,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendZiataMessage = useCallback(async (action: string | (() => Promise<string> | string), options?: { label: string; value: string }[]) => {
    const TARGET_LATENCY = 750; // 0.75 seconds
    const startTime = Date.now();
    setIsTyping(true);

    const messageText = typeof action === 'function' ? await action() : action;
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, TARGET_LATENCY - elapsedTime);

    if (remainingTime > 0) {
      await new Promise(res => setTimeout(res, remainingTime));
    }

    setIsTyping(false);
    addMessage(messageText, Sender.Ziata, options);
  }, []);


  const handleBegin = useCallback(() => {
    addMessage("Begin", Sender.User);
    setChatState(ChatState.TOPIC_SELECTION);
    sendZiataMessage(
      "Which topic would you like to discuss with Ziata? Please click below to select from the menu of available topics.",
      [
        { label: "Sleep Habits", value: Topic.Sleep },
        { label: "Exercise and Energy Levels", value: Topic.Exercise },
        { label: "Food and Diet", value: Topic.Food },
        { label: "Habit Formation", value: Topic.Habit },
      ]
    );
  }, [sendZiataMessage]);

  const handleTopicSelect = useCallback(async (topic: Topic, label: string) => {
    currentTopicRef.current = topic;
    addMessage(`I'd like to discuss: ${label}`, Sender.User);
    
    await sendZiataMessage(() => affirmTopicSelectionProxy({ topicLabel: label }));

    setChatState(ChatState.ASKING_QUESTIONS);
    await sendZiataMessage(() => DIALOGUE_FLOW[topic].questions[0]);
  }, [sendZiataMessage]);

  const handleFreeTextSubmit = useCallback(async (text: string) => {
    addMessage(text, Sender.User);
    userAnswersRef.current.push(text);
    setUserInput('');

    const topic = currentTopicRef.current;
    if (!topic) return;
    
    // 1. Send contingent rephrasing
    await sendZiataMessage(() => rephraseUserStatementProxy({ text }));
    
    currentQuestionIndexRef.current++;
    const nextQuestionIndex = currentQuestionIndexRef.current;
    const dialogue: Dialogue = DIALOGUE_FLOW[topic];

    if (nextQuestionIndex < dialogue.questions.length) {
      // 2. Ask the next question
      await sendZiataMessage(() => dialogue.questions[nextQuestionIndex]);
    } else {
      setChatState(ChatState.ANALYZING);
      await sendZiataMessage("Thank you for sharing. Let me analyze your responses to provide a personalized recommendation...");

      try {
        const result = await analyzeUserResponsesProxy({ topic, questions: dialogue.questions, answers: userAnswersRef.current });
        const recommendation = DIALOGUE_FLOW[topic].responses[result.category]?.[result.subtype];

        if (recommendation) {
            await sendZiataMessage(recommendation);
        } else {
            await sendZiataMessage("I've analyzed your responses. It seems focusing on consistency could be very helpful for you.");
        }
      } catch (error) {
        console.error("Error analyzing responses:", error);
        await sendZiataMessage("I had a little trouble analyzing your responses. However, a great first step is always to ensure you're getting consistent sleep. Let's focus on that.");
      }

      setChatState(ChatState.ENDED);
      await sendZiataMessage(
        "Thank you for chatting with Ziata. Remember, small changes lead to remarkable results. Have a great day!"
      );
    }
  }, [sendZiataMessage]);

  const handleOptionClick = (value: string, label: string) => {
    if (chatState === ChatState.WELCOME && value === 'begin') {
      handleBegin();
    } else if (chatState === ChatState.TOPIC_SELECTION) {
      handleTopicSelect(value as Topic, label);
    } else if (chatState === ChatState.ENDED) {
        addMessage(label, Sender.User);
        setIsSessionClosed(true);
        sendZiataMessage("This session has ended. Thank you for your time! Please return to survey.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && chatState === ChatState.ASKING_QUESTIONS) {
      handleFreeTextSubmit(userInput.trim());
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[90vh] flex flex-col bg-white rounded-xl shadow-2xl">
          <header className="bg-ziata-indigo text-white p-4 flex items-center rounded-t-xl z-10">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-ziata-indigo text-2xl font-bold">Z</span>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold">Ziata</h1>
              <p className="text-sm opacity-90">Lifestyle & Wellness Assistant</p>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6 pt-4 space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} onOptionClick={handleOptionClick} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={chatEndRef} />
          </main>

          <footer className="p-4 border-t border-gray-200">
            {chatState === ChatState.WELCOME && (
              <div className="flex justify-center w-full">
                <button
                  onClick={handleBegin}
                  className="bg-ziata-indigo text-white font-semibold py-2 px-8 rounded-full hover:bg-opacity-90 transition-colors shadow-md"
                >
                  Begin
                </button>
              </div>
            )}
            {chatState === ChatState.ENDED && !isSessionClosed && (
              <div className="flex justify-center w-full">
                <button
                  onClick={() => handleOptionClick("end_session", "End Session")}
                  className="bg-ziata-indigo text-white font-semibold py-2 px-8 rounded-full hover:bg-opacity-90 transition-colors shadow-md"
                >
                  End Session
                </button>
              </div>
            )}
            {chatState === ChatState.ASKING_QUESTIONS && (
              <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-ziata-indigo"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-ziata-indigo text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
                  disabled={!userInput.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
