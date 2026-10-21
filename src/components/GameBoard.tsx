import { useCallback, useEffect, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  correctCheer,
  DIFFICULTY_META,
  makeProblem,
  QUIZ_LENGTH,
  wrongCheer,
  type AnimalProfile,
  type Difficulty,
  type Mode,
  type Problem,
} from "@/types/game";

interface GameBoardProps {
  playerName: string;
  animal: AnimalProfile;
  difficulty: Difficulty;
  mode: Mode;
  questionNumber: number;
  onAnswer: (isCorrect: boolean) => void;
  onChangeDifficulty: () => void;
}

export function GameBoard({
  playerName,
  animal,
  difficulty,
  mode,
  questionNumber,
  onAnswer,
  onChangeDifficulty,
}: GameBoardProps) {
  const [problem, setProblem] = useState<Problem>(() =>
    makeProblem(difficulty)
  );
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [cheer, setCheer] = useState("");
  const [burst, setBurst] = useState(0);

  const meta = DIFFICULTY_META[difficulty];
  const isQuiz = mode === "quiz";

  const nextProblem = useCallback(() => {
    setProblem(makeProblem(difficulty));
    setValue("");
    setFeedback(null);
    setCheer("");
  }, [difficulty]);

  useEffect(() => {
    setProblem(makeProblem(difficulty));
    setValue("");
    setFeedback(null);
    setCheer("");
  }, [difficulty]);

  const submit = () => {
    if (value.trim() === "" || feedback) return;
    const isCorrect = Number(value) === problem.answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    setCheer(isCorrect ? correctCheer(playerName) : wrongCheer(playerName));
    if (isCorrect) setBurst((b) => b + 1);
    onAnswer(isCorrect);
    window.setTimeout(nextProblem, isCorrect ? 1100 : 1700);
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
      <div className={`h-2.5 w-full bg-gradient-to-r ${meta.accent}`} />
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${animal.accent} text-2xl shadow-md`}
            >
              {animal.emoji}
            </div>
            <div>
              <p className="font-display text-base font-extrabold text-slate-800">
                {animal.name} · {meta.label}
              </p>
              <p className="text-sm font-medium text-slate-500">
                {isQuiz ? "Quiz mode 📝" : "Practice mode 🎈"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onChangeDifficulty}
            className="rounded-full font-display font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Exit
          </Button>
        </div>

        {isQuiz && (
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between font-display text-sm font-bold text-slate-500">
              <span>
                Question {Math.min(questionNumber, QUIZ_LENGTH)} of {QUIZ_LENGTH}
              </span>
              <span>{Math.round((questionNumber / QUIZ_LENGTH) * 100)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-600 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (questionNumber / QUIZ_LENGTH) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border-4 border-dashed border-teal-100 bg-gradient-to-b from-teal-50/60 to-white py-10">
          {feedback === "correct" && (
            <div
              key={burst}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="animate-ping text-7xl opacity-30">🎉</div>
            </div>
          )}

          <p className="font-display text-lg font-bold text-slate-500">
            Go for it,{" "}
            <span className="text-teal-600">{playerName}</span>! {animal.emoji}{" "}
            💪
          </p>

          <div
            className={`font-math flex items-center gap-4 text-6xl tracking-tight text-slate-800 transition-transform sm:text-7xl ${
              feedback === "correct" ? "scale-110" : ""
            }`}
          >
            <span>{problem.a}</span>
            <span className="text-teal-500">{problem.op}</span>
            <span>{problem.b}</span>
            <span className="text-slate-300">=</span>
            <span className="text-slate-300">?</span>
          </div>

          <div className="flex w-full max-w-xs items-center gap-3">
            <Input
              type="number"
              inputMode="numeric"
              value={value}
              autoFocus
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="?"
              className="font-math h-16 rounded-2xl border-4 border-slate-200 bg-white text-center text-3xl text-slate-800 focus-visible:ring-teal-400"
            />
            <Button
              onClick={submit}
              disabled={value.trim() === "" || feedback !== null}
              className="h-16 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 px-7 font-display text-lg font-extrabold text-white shadow-lg shadow-teal-400/40 transition-transform hover:scale-105"
            >
              Check
            </Button>
          </div>

          <div className="min-h-7 px-4 text-center">
            {feedback === "correct" && (
              <p className="flex items-center justify-center gap-2 font-display text-lg font-extrabold text-emerald-600">
                <Check className="h-6 w-6" /> {cheer}
              </p>
            )}
            {feedback === "wrong" && (
              <p className="flex items-center justify-center gap-2 font-display text-lg font-extrabold text-rose-500">
                <X className="h-6 w-6" /> {cheer} The answer is {problem.answer}.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}