
import React from 'react';
import { RiskLevel } from '../../types';

interface RiskDonutChartProps {
    risk: RiskLevel;
    riskText: string;
}

const RiskDonutChart: React.FC<RiskDonutChartProps> = ({ risk, riskText }) => {
    const riskConfig = {
        Lower: { color: 'text-risk-lower', bgColor: 'bg-risk-lower/20', ringColor: 'stroke-risk-lower', value: 33 },
        Moderate: { color: 'text-risk-moderate', bgColor: 'bg-risk-moderate/20', ringColor: 'stroke-risk-moderate', value: 66 },
        Higher: { color: 'text-risk-higher', bgColor: 'bg-risk-higher/20', ringColor: 'stroke-risk-higher', value: 100 },
    };

    const config = riskConfig[risk];
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
    const offset = circumference - (config.value / 100) * circumference;

    return (
        <div className={`relative flex items-center justify-center w-48 h-48 rounded-full ${config.bgColor}`}>
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                    className="text-gray-300"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <circle
                    className={config.ringColor}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
            </svg>
            <span className={`text-2xl font-lato font-bold ${config.color}`}>{riskText}</span>
        </div>
    );
};

export default RiskDonutChart;
