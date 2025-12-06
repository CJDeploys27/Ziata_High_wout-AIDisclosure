import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] animate-fade-in">
      <h1 className="font-lato font-black text-5xl md:text-7xl text-brand-tertiary tracking-tight">
        AssessYourRisk
      </h1>
      <h2 className="mt-4 font-lato font-bold text-2xl md:text-3xl text-brand-tertiary-dark">
        Sunday Dinners Keep Families Together
      </h2>
      <h3 className="mt-2 font-lato font-bold text-xl md:text-2xl text-brand-tertiary-dark">
        So does early cancer screenings,
      </h3>
      <button
        onClick={onStart}
        className="mt-12 font-lato font-bold text-xl text-white bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 ease-in-out px-10 py-4 rounded-full shadow-lg transform hover:scale-105"
      >
        Start Here
      </button>
    </div>
  );
};

export default LandingPage;