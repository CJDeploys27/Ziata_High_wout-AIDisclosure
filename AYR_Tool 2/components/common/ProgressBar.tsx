
import React from 'react';

interface ProgressBarProps {
    text: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ text }) => {
    return (
        <div className="w-full mb-8">
            <p className="text-center text-brand-tertiary font-lato font-semibold mb-2">{text}</p>
            <div className="w-full bg-brand-secondary-dark rounded-full h-4 overflow-hidden">
                <div
                    className="bg-brand-primary h-4 rounded-full"
                    style={{ width: `100%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
