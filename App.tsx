import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Sender, Topic, ChatState } from './types';
import { DIALOGUE_FLOW, INITIAL_MESSAGES } from './constants';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';

// --- CONFIGURATION ---
// TODO: Replace this with your actual Google Cloud Run URL
// Example: "https://ziata-backend-x829s.a.run.app"
const BACKEND_URL = "https://ziata-high-wout-aidisclosure-771555879264.europe-west1.run.app"; 

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [chatState, setChatState] = useState<ChatState>(ChatState.WELCOME);
  const [isTyping, setIsTyping] = useState(false);
  const [isSessionClosed, setIsSessionClosed] = useState(false);
  const [inputText, setInputText] = useState('');

  const currentTopicRef = useRef<Topic | null>(null);
  const currentQuestionIndexRef = useRef(0);
  const userAnswersRef = useRef<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // --- NEW BACKEND CONNECTION FUNCTION ---
  const sendMessageToBackend = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      return data.reply; 
    } catch (error) {
      console.error("Backend connection failed:", error);
      return "I'm having trouble reaching my servers right now. Please try again later.";
    }
  };

  const addMessage = useCallback((text: string, sender: Sender, options?: { label: string; value: string }[]) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      text,
      sender,
      options,
    }]);
  }, []);

  const sendZiataMessage = useCallback(async (text: string, options?: { label: string; value: string }[]) => {
    const TARGET_LATENCY = 600; // Slightly increased for network realism
    setIsTyping(true);
    await new Promise(res => setTimeout(res, TARGET_LATENCY));
    setIsTyping(false);
    addMessage(text, Sender.Ziata, options);
  }, [addMessage]);

  const handleBegin = useCallback(async () => {
    addMessage("Begin", Sender.User);
    setChatState(ChatState.TOPIC_SELECTION);
    await sendZiataMessage(
      "Which topic would you like to discuss with Ziata? Please click below to select from the menu of available topics.",
      [
        { label: "Sleep Habits", value: Topic.Sleep },
        { label: "Exercise and Energy Levels", value: Topic.Exercise },
        { label: "Food and Diet", value: Topic.Food },
        { label: "Habit Formation", value: Topic.Habit },
      ]
    );
  }, [addMessage, sendZiataMessage]);

  const handleLearnMore = useCallback(async () => {
    addMessage("Learn More", Sender.User);
    await sendZiataMessage(
      "The system utilizes deterministic processing to evaluate behavioral inputs. Data processing is goal-oriented and adheres to strict task-specific protocols. Select 'Begin' to start the assessment."
    );
  }, [addMessage, sendZiataMessage]);

  const handleTopicSelect = useCallback(async (topic: Topic, label: string) => {
    currentTopicRef.current = topic;
    currentQuestionIndexRef.current = 0;
    userAnswersRef.current = [];
    
    addMessage(`Topic Selection: ${label}`, Sender.User);
    setChatState(ChatState.ASKING_QUESTIONS);
    
    const flow = DIALOGUE_FLOW[topic];
    if (!flow) return;

    // --- NEW LOGIC: Ask Backend for Affirmation ---
    // We send a prompt to the backend telling it what to do
    const prompt = `You are Ziata, a helpful wellness assistant. The user just selected the topic "${label}". Write a brief (1 sentence) encouraging affirmation of this choice.`;
    const affirmation = await sendMessageToBackend(prompt);
    
    await sendZiataMessage(affirmation);
    
    const firstQuestion = flow.questions[0];
    await sendZiataMessage(firstQuestion);
  }, [addMessage, sendZiataMessage]);

  const handleFreeTextSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isTyping || chatState !== ChatState.ASKING_QUESTIONS) return;

    const text = inputText.trim();
    setInputText('');
    addMessage(text, Sender.User);
    userAnswersRef.current.push(text);

    const topic = currentTopicRef.current;
    if (!topic) return;
    const flow = DIALOGUE_FLOW[topic];
    if (!flow) return;

    // --- NEW LOGIC: Ask Backend for Rephrasing ---
    const rephrasePrompt = `You are Ziata. The user just answered a question with: "${text}". Briefly rephrase this to show you understood (max 1 sentence), but do not ask a new question yet.`;
    const acknowledgement = await sendMessageToBackend(rephrasePrompt);
    await sendZiataMessage(acknowledgement);

    currentQuestionIndexRef.current++;
    const nextIndex = currentQuestionIndexRef.current;

    if (nextIndex < flow.questions.length) {
      const nextQuestion = flow.questions[nextIndex];
      await sendZiataMessage(nextQuestion);
    } else {
      setChatState(ChatState.ANALYZING);
      await sendZiataMessage("Analysis in progress. System is calculating Need Category and Subtype mapping...");

      try {
        // --- NEW LOGIC: Ask Backend for Final Analysis ---
        // Instead of local logic, we send the whole context to the backend
        const analysisPrompt = `
          You are Ziata, an expert wellness coach. 
          Topic: ${topic}
          Questions Asked: ${JSON.stringify(flow.questions)}
          User Answers: ${JSON.stringify(userAnswersRef.current)}
          
          Based on these answers, provide a specific, actionable recommendation (Need Category and Subtype approach).
          Keep the tone professional and encouraging. Max 3 sentences.
        `;
        
        const recommendation = await sendMessageToBackend(analysisPrompt);
        
        setChatState(ChatState.SHOWING_RESULTS);
        await sendZiataMessage(recommendation);
        
        setChatState(ChatState.ENDED);
        await sendZiataMessage("Thank you for chatting with Ziata. Remember, small changes lead to remarkable results. Have a great day!");
      } catch (error) {
        console.error("Analysis failed:", error);
        await sendZiataMessage("An error occurred during analysis. Please try returning to the survey.");
        setChatState(ChatState.ENDED);
      }
    }
  }, [inputText, isTyping, chatState, addMessage, sendZiataMessage]);

  const handleOptionClick = (value: string, label: string) => {
    if (isTyping) return;
    
    if (chatState === ChatState.WELCOME) {
      if (value === 'begin') {
        handleBegin();
      } else if (value === 'learn_more') {
        handleLearnMore();
      }
    } else if (chatState === ChatState.TOPIC_SELECTION) {
      handleTopicSelect(value as Topic, label);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onOptionClick={handleOptionClick}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>
      {chatState === ChatState.ASKING_QUESTIONS && !isTyping && (
        <form onSubmit={handleFreeTextSubmit} className="p-4 bg-white border-t">
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 p-2 border rounded-l"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r">
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
