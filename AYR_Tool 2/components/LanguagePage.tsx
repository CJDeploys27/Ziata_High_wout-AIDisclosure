
import React from 'react';
import { Language } from '../types';
import { translations } from '../constants';

interface LanguagePageProps {
  onSelectLanguage: (lang: Language) => void;
}

const LanguagePage: React.FC<LanguagePageProps> = ({ onSelectLanguage }) => {
  const languages = [
    { code: Language.EN, name: 'English' },
    { code: Language.ES, name: 'Español' },
    { code: Language.ZH, name: '中文 (Mandarin)' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="font-lato font-bold text-2xl text-brand-tertiary mb-8">
          {translations[Language.EN].languageTitle}
        </h2>
        <div className="space-y-4">
          {languages.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => onSelectLanguage(code)}
              className="w-full font-lato font-semibold text-lg text-brand-tertiary-darker bg-brand-secondary hover:bg-brand-secondary-dark transition-all duration-300 ease-in-out px-6 py-4 rounded-lg shadow-md transform hover:scale-105"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
