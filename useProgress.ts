import { useCallback, useEffect, useState } from 'react';
import { loadProgress, saveProgress } from '@/context/AccountContext';

export interface LearnProgress {
  completedModules: string[];
  quizScores: Record<string, { score: number; total: number; takenAt: number }>;
}

export function useProgress() {
  const [progress, setProgress] = useState<LearnProgress>(loadProgress);

  useEffect(() => { saveProgress(progress); }, [progress]);

  const completeModule = useCallback((id: string) => {
    setProgress(prev => prev.completedModules.includes(id) ? prev : { ...prev, completedModules: [...prev.completedModules, id] });
  }, []);

  const recordQuiz = useCallback((id: string, score: number, total: number) => {
    setProgress(prev => ({ ...prev, quizScores: { ...prev.quizScores, [id]: { score, total, takenAt: Date.now() } } }));
  }, []);

  return { progress, completeModule, recordQuiz };
}
