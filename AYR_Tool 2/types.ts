
export enum Page {
  Landing,
  Language,
  Survey,
  Results,
}

export enum Language {
  EN = 'en',
  ES = 'es',
  ZH = 'zh',
}

export type RiskLevel = 'Lower' | 'Moderate' | 'Higher';

export interface SurveyOption {
  id: string;
  risk: RiskLevel;
}
