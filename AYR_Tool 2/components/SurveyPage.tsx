
import React from 'react';
import { Language, RiskLevel } from '../types';
import { translations, surveyQuestion } from '../constants';
import ProgressBar from './common/ProgressBar';

interface SurveyPageProps {
  language: Language;
  onAnswer: (answerId: string, risk: RiskLevel) => void;
}

const SurveyPage: React.FC<SurveyPageProps> = ({ language, onAnswer }) => {
  const t = translations[language];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-2xl text-center">
        <ProgressBar text={t.progress} />
        <h2 className="font-lato font-bold text-2xl md:text-3xl text-brand-tertiary mb-10 leading-relaxed">
          {t.surveyQuestion}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {surveyQuestion.options.map(option => (
             <button
                key={option.id}
                onClick={() => onAnswer(option.id, option.risk)}
                className="font-lato font-semibold text-lg text-white bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 ease-in-out p-6 rounded-lg shadow-md transform hover:scale-105 text-left flex items-center min-h-[100px]"
            >
                {t.surveyOptions[option.id as keyof typeof t.surveyOptions]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
