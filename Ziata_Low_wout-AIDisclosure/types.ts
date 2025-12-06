
export type Sender = 'user' | 'bot';

export interface MenuOption {
  text: string;
  value: string;
  needScore: number;
  subtype: Subtype;
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  options?: MenuOption[];
}

export type Topic = 'sleep' | 'exercise' | 'food' | 'habits';

export type Subtype = 'BIOLOGY' | 'ENVIRONMENT' | 'CONSISTENCY' | 'EMOTIONAL' | 'COGNITIVE';
export type NeedCategory = 'HIGH' | 'MODERATE' | 'LOW';

export interface Question {
  text: string;
  options: MenuOption[];
}

export interface TopicFlow {
  questions: Question[];
  recommendations: Record<NeedCategory, Record<Subtype, string>>;
}

export type DialogueData = Record<Topic, TopicFlow>;
