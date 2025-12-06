
import React, { useState, useCallback } from 'react';
import { Page, Language, RiskLevel, SurveyOption } from './types';
import LandingPage from './components/LandingPage';
import LanguagePage from './components/LanguagePage';
import SurveyPage from './components/SurveyPage';
import ResultsPage from './components/ResultsPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [answerId, setAnswerId] = useState<string | null>(null);
  const [risk, setRisk] = useState<RiskLevel | null>(null);

  const handleStart = useCallback(() => {
    setCurrentPage(Page.Language);
  }, []);
  
  const handleSelectLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setCurrentPage(Page.Survey);
  }, []);

  const handleAnswerSurvey = useCallback((selectedAnswerId: string, calculatedRisk: RiskLevel) => {
    setAnswerId(selectedAnswerId);
    setRisk(calculatedRisk);
    setCurrentPage(Page.Results);
  }, []);

  const handleAssessAgain = useCallback(() => {
    setAnswerId(null);
    setRisk(null);
    setCurrentPage(Page.Landing);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Landing:
        return <LandingPage onStart={handleStart} />;
      case Page.Language:
        return <LanguagePage onSelectLanguage={handleSelectLanguage} />;
      case Page.Survey:
        return <SurveyPage language={language} onAnswer={handleAnswerSurvey} />;
      case Page.Results:
        if (risk && answerId) {
          return <ResultsPage language={language} answerId={answerId} risk={risk} onAssessAgain={handleAssessAgain} />;
        }
        // Fallback to landing if results aren't ready
        setCurrentPage(Page.Landing);
        return null;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <main className="font-lato bg-brand-secondary/30 min-h-screen text-brand-tertiary-darker flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        {renderPage()}
      </div>
    </main>
  );
};

export default App;
