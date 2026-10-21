import { Award, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizResult } from "@/types/game";

interface QuizResultsProps {
  result: QuizResult;
  onPlayAgain: () => void;
  onExit: () => void;
}

export function QuizResults({
  result,
  onPlayAgain,
  onExit,
}: QuizResultsProps) {
  const { prize } = result;

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl shadow-amber-200/50">
        <div className={`h-3 w-full bg-gradient-to-r ${prize.accent}`} />
        <CardContent className="p-6 text-center sm:p-10">
          <div className="mx-auto mb-4 flex h-28 w-28 animate-bounce items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-yellow-50 text-6xl shadow-inner">
            {prize.emoji}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-200 bg-amber-50 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-amber-600">
            <Award className="h-4 w-4" />
            Prize unlocked
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
            {prize.title}
          </h2>
          <p className="mt-2 text-lg font-medium leading-relaxed text-slate-600">
            {prize.blurb}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-slate-800">
                {result.score}%
              </p>
              <p className="mt-1 text-sm font-bold text-slate-500">Score</p>
            </div>
            <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/60 p-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-emerald-600">
                {result.correct}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-500">Correct</p>
            </div>
            <div className="rounded-2xl border-2 border-rose-100 bg-rose-50/60 p-4">
              <p className="font-display text-4xl font-extrabold tracking-tight text-rose-500">
                {result.total - result.correct}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-500">Missed</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 px-4 py-3 font-display text-base font-bold text-indigo-600">
            <Trophy className="h-5 w-5" />
            {result.playerName} {result.animal.emoji} · {result.difficulty} quiz
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onPlayAgain}
              className="h-14 flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 font-display text-lg font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-transform hover:scale-[1.02]"
            >
              <RotateCcw className="mr-1 h-5 w-5" />
              Play again
            </Button>
            <Button
              variant="outline"
              onClick={onExit}
              className="h-14 flex-1 rounded-2xl border-2 border-slate-200 font-display text-lg font-bold text-slate-600 hover:bg-slate-50"
            >
              Back to start
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}