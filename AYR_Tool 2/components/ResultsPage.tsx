
import React, { useState } from 'react';
import { Language, RiskLevel } from '../types';
import { translations, surveyQuestion } from '../constants';
import RiskDonutChart from './common/RiskDonutChart';
import { SaveIcon, PhoneIcon, RestartIcon, ChevronDownIcon } from './common/icons';

interface ResultsPageProps {
  language: Language;
  answerId: string;
  risk: RiskLevel;
  onAssessAgain: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ language, answerId, risk, onAssessAgain }) => {
  const [isExplanationVisible, setExplanationVisible] = useState(false);
  const t = translations[language];
  
  const selectedOption = surveyQuestion.options.find(opt => opt.id === answerId);
  const answerText = selectedOption ? t.surveyOptions[selectedOption.id as keyof typeof t.surveyOptions] : '';
  const explanationText = selectedOption ? t.explanations[selectedOption.explanationKey as keyof typeof t.explanations] : '';


  const ResultCard: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({ title, children, className = ''}) => (
    <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col ${className}`}>
        <h3 className="font-lato font-bold text-xl text-brand-tertiary mb-4 border-b-2 border-brand-primary/50 pb-2">{title}</h3>
        <div className="flex-grow">
            {children}
        </div>
    </div>
  );

  return (
    <div className="animate-fade-in w-full">
      <h2 className="font-lato font-black text-3xl md:text-4xl text-center text-brand-tertiary mb-8">
        {t.resultsHeader}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ResultCard title={t.yourResults} className="items-center">
            <div className="my-4">
                <RiskDonutChart risk={risk} riskText={t.riskLevels[risk]}/>
            </div>
        </ResultCard>
        
        <ResultCard title={t.effectsOfResults}>
          <div className="font-lato text-brand-tertiary-dark bg-brand-secondary/80 rounded-lg shadow-inner overflow-hidden">
              <button
                  onClick={() => setExplanationVisible(!isExplanationVisible)}
                  className="flex justify-between items-center w-full text-left font-semibold p-4 transition-colors hover:bg-brand-secondary-dark/50"
                  aria-expanded={isExplanationVisible}
                  aria-controls="explanation-panel"
              >
                  <span>{answerText}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isExplanationVisible ? 'rotate-180' : ''}`} />
              </button>
              {isExplanationVisible && (
                  <div id="explanation-panel" className="p-4 pt-2 border-t border-brand-secondary-dark animate-fade-in bg-brand-secondary/80">
                      <p className="font-semibold text-brand-tertiary-dark text-sm mb-1">{t.riskExplanation}</p>
                      <p className="text-brand-tertiary-darker text-sm font-normal">
                          {explanationText}
                      </p>
                  </div>
              )}
          </div>
        </ResultCard>

        <ResultCard title={t.whatNext}>
            <p className="text-brand-tertiary-darker mb-4">{t.whatNextBody}</p>
            <ul className="space-y-2">
                {t.locations.map(location => (
                    <li key={location} className="p-3 bg-brand-secondary/80 rounded-md text-brand-tertiary-dark font-semibold cursor-pointer hover:bg-brand-secondary-dark transition">
                        {location}
                    </li>
                ))}
            </ul>
        </ResultCard>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="flex items-center justify-center gap-2 w-full sm:w-auto font-lato font-bold text-white bg-brand-tertiary hover:bg-brand-tertiary-dark transition-all duration-300 ease-in-out px-6 py-3 rounded-full shadow-md transform hover:scale-105">
            <SaveIcon className="w-5 h-5" />
            <span>{t.saveButton}</span>
        </button>
        <button className="flex items-center justify-center gap-2 w-full sm:w-auto font-lato font-bold text-white bg-brand-primary-dark hover:bg-brand-primary-darker transition-all duration-300 ease-in-out px-6 py-3 rounded-full shadow-md transform hover:scale-105">
            <PhoneIcon className="w-5 h-5" />
            <span>{t.callButton}</span>
        </button>
        <button onClick={onAssessAgain} className="flex items-center justify-center gap-2 w-full sm:w-auto font-lato font-bold text-brand-tertiary-darker bg-brand-secondary-dark hover:bg-brand-secondary-darker transition-all duration-300 ease-in-out px-6 py-3 rounded-full shadow-md transform hover:scale-105">
            <RestartIcon className="w-5 h-5" />
            <span>{t.againButton}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
