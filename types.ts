
export enum Sender {
  User = 'user',
  Ziata = 'ziata',
}

export interface Message {
  id: number;
  text: string;
  sender: Sender;
  options?: { label: string; value: string }[];
}

export enum Topic {
  Sleep = 'SLEEP',
  Exercise = 'EXERCISE',
  Food = 'FOOD',
  Habit = 'HABIT',
}

export enum ChatState {
  WELCOME,
  TOPIC_SELECTION,
  ASKING_QUESTIONS,
  ANALYZING,
  SHOWING_RESULTS,
  ENDED,
}

export type NeedCategory = 'HIGH' | 'MODERATE' | 'LOW';
export type Subtype = 'BIOLOGY' | 'ENVIRONMENT' | 'CONSISTENCY' | 'EMOTIONAL' | 'COGNITIVE';

export interface Dialogue {
  questions: string[];
  responses: Record<NeedCategory, Partial<Record<Subtype, string>>>;
}
