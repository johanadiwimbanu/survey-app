type Step = 'user' | 'survey' | 'result';

export interface User {
  name: string;
  age: string;
  job: string;
}

export interface SurveyState {
  step: Step;
  user: User;
  answer: Record<string, string>;
  timeLeft: number;
  currentQuestion: number;
  setStep: (step: Step) => void;
  setCurrentQuestion: (step: number) => void;
  setUser: (data: User) => void;
  setAnswer: (key: string, value: string) => void;
  setTimeLeft: (timer: number) => void;
  resetAll: () => void;
}
