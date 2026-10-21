import { useState } from "react";
import {
  ClipboardCheck,
  Lock,
  LockOpen,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QuizResult } from "@/types/game";

interface TeacherPanelProps {
  results: QuizResult[];
  onClear: () => void;
}

const TEACHER_PIN = "1234";

export function TeacherPanel({ results, onClear }: TeacherPanelProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const sorted = [...results].sort((a, b) => b.score - a.score);
  const totalQuizzes = results.length;
  const classAverage =
    totalQuizzes === 0
      ? 0
      : Math.round(
          results.reduce((sum, r) => sum + r.score, 0) / totalQuizzes
        );
  const topScore = totalQuizzes === 0 ? 0 : sorted[0].score;
  const prizesEarned = results.filter((r) => r.score >= 75).length;

  const tryUnlock = () => {
    if (pin === TEACHER_PIN) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <Card className="mx-auto max-w-md overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-indigo-200/40">
        <div className="h-2.5 w-full bg-gradient-to-r from-indigo-400 to-violet-600" />
        <CardContent className="p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-md">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-800">
              Teacher mode
            </h2>
            <p className="mt-2 text-base font-medium leading-relaxed text-slate-600">
              Enter the teacher PIN to review the class scoreboard and quiz
              results.
            </p>

            <div className="mt-6 text-left">
              <Label
                htmlFor="teacher-pin"
                className="mb-2 block font-display text-base font-bold text-slate-700"
              >
                Teacher PIN
              </Label>
              <Input
                id="teacher-pin"
                type="password"
                inputMode="numeric"
                value={pin}
                maxLength={4}
                autoFocus
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                placeholder="••••"
                className={`font-math h-14 rounded-2xl border-4 bg-white text-center text-2xl tracking-widest text-slate-800 focus-visible:ring-indigo-400 ${
                  error
                    ? "border-rose-300 ring-4 ring-rose-100"
                    : "border-slate-200"
                }`}
              />
              {error && (
                <p className="mt-2 font-display text-sm font-bold text-rose-500">
                  Incorrect PIN. Try again.
                </p>
              )}
              <p className="mt-2 text-sm font-medium text-slate-400">
                Demo PIN: 1234
              </p>
            </div>

            <Button
              onClick={tryUnlock}
              className="mt-5 h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 font-display text-lg font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-transform hover:scale-[1.02]"
            >
              <LockOpen className="mr-1 h-5 w-5" />
              Unlock
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-indigo-200/40">
        <div className="h-2.5 w-full bg-gradient-to-r from-indigo-400 to-violet-600" />
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-md">
                <ClipboardCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-800">
                  Teacher dashboard
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  Class results for this session
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUnlocked(false)}
              className="rounded-full font-display font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <Lock className="mr-1 h-4 w-4" />
              Lock
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600">
                <Users className="h-4 w-4" />
              </div>
              <p className="font-display text-3xl font-extrabold tracking-tight text-slate-800">
                {totalQuizzes}
              </p>
              <p className="text-sm font-bold text-slate-500">Quizzes taken</p>
            </div>
            <div className="rounded-2xl border-2 border-teal-100 bg-teal-50/50 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-600">
                <ClipboardCheck className="h-4 w-4" />
              </div>
              <p className="font-display text-3xl font-extrabold tracking-tight text-slate-800">
                {classAverage}%
              </p>
              <p className="text-sm font-bold text-slate-500">Class average</p>
            </div>
            <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-500">
                <Trophy className="h-4 w-4" />
              </div>
              <p className="font-display text-3xl font-extrabold tracking-tight text-slate-800">
                {topScore}%
              </p>
              <p className="text-sm font-bold text-slate-500">Top score</p>
            </div>
            <div className="rounded-2xl border-2 border-fuchsia-100 bg-fuchsia-50/50 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-2xl">
                🎁
              </div>
              <p className="font-display text-3xl font-extrabold tracking-tight text-slate-800">
                {prizesEarned}
              </p>
              <p className="text-sm font-bold text-slate-500">Prizes earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-4 border-white bg-white shadow-xl shadow-indigo-200/40">
        <CardContent className="p-6">
          <h3 className="mb-4 font-display text-xl font-extrabold text-slate-800">
            Recorded quiz results
          </h3>

          {sorted.length === 0 ? (
            <div className="rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center">
              <p className="text-4xl">📋</p>
              <p className="mt-2 font-display text-base font-bold text-slate-600">
                No results recorded yet
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Students' quiz scores will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border-2 border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50 font-display text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-bold">Student</th>
                    <th className="px-4 py-3 font-bold">Level</th>
                    <th className="px-4 py-3 text-center font-bold">Correct</th>
                    <th className="px-4 py-3 text-center font-bold">Score</th>
                    <th className="px-4 py-3 text-center font-bold">Prize</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sorted.map((r) => (
                    <tr
                      key={r.id}
                      className="bg-white transition-colors hover:bg-teal-50/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{r.animal.emoji}</span>
                          <span className="font-display text-base font-extrabold text-slate-800">
                            {r.playerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium capitalize text-slate-600">
                        {r.difficulty}
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-slate-600">
                        {r.correct}/{r.total}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex min-w-16 justify-center rounded-full px-3 py-1 font-display text-sm font-extrabold ${
                            r.score >= 75
                              ? "bg-emerald-50 text-emerald-600"
                              : r.score >= 50
                                ? "bg-amber-50 text-amber-600"
                                : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {r.score}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-slate-700">
                          <span className="text-lg">{r.prize.emoji}</span>
                          <span className="text-sm font-bold">
                            {r.prize.title}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {sorted.length > 0 && (
            <Button
              variant="outline"
              onClick={onClear}
              className="mt-4 h-11 w-full rounded-2xl border-2 border-slate-200 font-display text-base font-bold text-slate-600 hover:bg-slate-50"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Clear all results
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}