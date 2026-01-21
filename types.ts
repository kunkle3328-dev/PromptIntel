
export enum UserTier {
  FREE = 'FREE',
  PRO = 'PRO',
  TEAM = 'TEAM'
}

export type View = 'dashboard' | 'learning' | 'analyzer' | 'templates' | 'settings' | 'onboarding';

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  examples: {
    bad: string;
    good: string;
    reasoning: string;
  };
  tier: UserTier;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'App Builder' | 'Debugging' | 'Systems' | 'Optimization';
  content: string;
  tier: UserTier;
}

export interface AnalysisResult {
  scores: {
    roleDefinition: number;       // Weight 10
    taskClarity: number;          // Weight 15
    contextCompleteness: number;  // Weight 15
    constraintsAndRules: number;  // Weight 10
    outputFormat: number;         // Weight 10
    specificity: number;          // Weight 10
    logicalStructure: number;     // Weight 10
    feasibility: number;          // Weight 10
    professionalReadiness: number;// Weight 10
  };
  overallScore: number;
  grade: 'Professional' | 'Advanced' | 'Intermediate' | 'Beginner' | 'Broken';
  strengths: string[];
  weaknesses: string[];
  missingElements: string[];
  improvementSuggestions: string[];
  optimizedPrompt: string;
  rewriteExplanation: string;
}

export interface UserState {
  tier: UserTier;
  completedLessons: string[];
  analyzerUses: number;
  savedPrompts: {id: string, original: string, optimized: string, date: string}[];
  hasCompletedOnboarding: boolean;
}
