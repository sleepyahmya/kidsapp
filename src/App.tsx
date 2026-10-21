import { useState } from "react";
import { Header } from "@/components/Header";
import { StartScreen } from "@/components/StartScreen";
import { GameBoard } from "@/components/GameBoard";
import { StatsPanel } from "@/components/StatsPanel";
import { QuizResults } from "@/components/QuizResults";
import { Scoreboard } from "@/components/Scoreboard";
import { TeacherPanel } from "@/components/TeacherPanel";
import { GroupLearn } from "@/components/GroupLearn";
import {
  getPrize,
  QUIZ_LENGTH,
  type AnimalProfile,
  type Difficulty,
  type GameStats,
  type Mode,
  type QuizResult,
} from "@/types/game";

const EMPTY_STATS: GameStats = {
  correct: 0,
  wrong: 0,
  streak: 0,
  bestStreak: 0,
};

type View = "home" | "teacher" | "group";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [playerName, setPlayerName] = useState("");
  const [animal, setAnimal] = useState<AnimalProfile | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [stats, setStats] = useState<GameStats>(EMPTY_STATS);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [quizDone, setQuizDone] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);

  const playing =
    playerName !== "" &&
    animal !== null &&
    difficulty !== null &&
    mode !== null;

  const handleStart = (
    name: string,
    chosenAnimal: AnimalProfile,
    chosenDifficulty: Difficulty,
    chosenMode: Mode
  ) => {
    setPlayerName(name);
    setAnimal(chosenAnimal);
    setDifficulty(chosenDifficulty);
    setMode(chosenMode);
    setStats(EMPTY_STATS);
    setQuestionNumber(1);
    setQuizDone(false);
    setView("home");
  };

  const handleAnswer = (isCorrect: boolean) => {
    setStats((prev) => {
      if (isCorrect) {
        const streak = prev.streak + 1;
        return {
          correct: prev.correct + 1,
          wrong: prev.wrong,
          streak,
          bestStreak: Math.max(prev.bestStreak, streak),
        };
      }
      return {
        correct: prev.correct,
        wrong: prev.wrong + 1,
        streak: 0,
        bestStreak: prev.bestStreak,
      };
    });

    if (mode === "quiz") {
      if (questionNumber >= QUIZ_LENGTH) {
        window.setTimeout(() => setQuizDone(true), 1200);
      } else {
        setQuestionNumber((n) => n + 1);
      }
    }
  };

  const handleExit = () => {
    setPlayerName("");
    setAnimal(null);
    setDifficulty(null);
    setMode(null);
    setStats(EMPTY_STATS);
    setQuestionNumber(1);
    setQuizDone(false);
  };

  const handlePlayAgain = () => {
    setStats(EMPTY_STATS);
    setQuestionNumber(1);
    setQuizDone(false);
  };

  const quizResult: QuizResult | null =
    quizDone && animal && difficulty
      ? {
          id: `${Date.now()}`,
          playerName,
          animal,
          difficulty,
          correct: stats.correct,
          total: QUIZ_LENGTH,
          score: Math.round((stats.correct / QUIZ_LENGTH) * 100),
          prize: getPrize(Math.round((stats.correct / QUIZ_LENGTH) * 100)),
          date: new Date().toISOString(),
        }
      : null;

  const handleSaveResult = () => {
    if (!quizResult) return;
    setResults((prev) => [quizResult, ...prev]);
    setQuizDone(false);
    setStats(EMPTY_STATS);
    setQuestionNumber(1);
  };

  const openTeacher = () => {
    handleExit();
    setView("teacher");
  };

  const openGroup = () => {
    handleExit();
    setView("group");
  };

  const goHome = () => {
    handleExit();
    setView("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/40 to-slate-100">
      <Header
        playerName={playerName}
        onOpenTeacher={openTeacher}
        onOpenGroup={openGroup}
        teacherOpen={view === "teacher"}
        groupOpen={view === "group"}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {view === "teacher" ? (
          <TeacherPanel results={results} onClear={() => setResults([])} />
        ) : view === "group" ? (
          <GroupLearn onExit={goHome} />
        ) : !playing ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <StartScreen onSelect={handleStart} onGroupLearn={openGroup} />
            </div>
            <div className="lg:col-span-1">
              <Scoreboard results={results} onClear={() => setResults([])} />
            </div>
          </div>
        ) : quizResult ? (
          <QuizResults
            result={quizResult}
            onPlayAgain={handlePlayAgain}
            onExit={handleSaveResult}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GameBoard
                playerName={playerName}
                animal={animal}
                difficulty={difficulty}
                mode={mode}
                questionNumber={questionNumber}
                onAnswer={handleAnswer}
                onChangeDifficulty={handleExit}
              />
            </div>
            <div className="lg:col-span-1">
              <StatsPanel
                playerName={playerName}
                animal={animal}
                stats={stats}
                onReset={() => setStats(EMPTY_STATS)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}