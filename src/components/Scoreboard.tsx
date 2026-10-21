import { ClipboardList, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizResult } from "@/types/game";

interface ScoreboardProps {
  results: QuizResult[];
  onClear: () => void;
}

export function Scoreboard({ results, onClear }: ScoreboardProps) {
  const sorted = [...results].sort((a, b) => b.score - a.score);

  return (
    <Card className="rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-md">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-extrabold leading-none text-slate-800">
              Class scoreboard
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Quiz results this session
            </p>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center">
            <p className="text-4xl">📋</p>
            <p className="mt-2 font-display text-base font-bold text-slate-600">
              No quiz results yet
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Finish a quiz to see scores here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {sorted.map((r, i) => (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-base font-extrabold ${
                    i === 0
                      ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {i === 0 ? <Trophy className="h-4 w-4" /> : i + 1}
                </span>
                <span className="text-2xl">{r.animal.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base font-extrabold text-slate-800">
                    {r.playerName}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {r.correct}/{r.total} · {r.difficulty}
                  </p>
                </div>
                <span className="shrink-0 font-display text-xl font-extrabold tracking-tight text-indigo-600">
                  {r.score}%
                </span>
              </li>
            ))}
          </ul>
        )}

        {sorted.length > 0 && (
          <Button
            variant="outline"
            onClick={onClear}
            className="mt-4 h-11 w-full rounded-2xl border-2 border-slate-200 font-display text-base font-bold text-slate-600 hover:bg-slate-50"
          >
            Clear scoreboard
          </Button>
        )}
      </CardContent>
    </Card>
  );
}