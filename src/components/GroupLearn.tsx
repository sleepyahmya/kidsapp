import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Crown,
  Medal,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DIFFICULTY_META,
  makeProblem,
  type Difficulty,
  type Problem,
} from "@/types/game";

interface GroupLearnProps {
  onExit: () => void;
}

interface Student {
  id: string;
  name: string;
  emoji: string;
  points: number;
}

const STUDENT_EMOJIS = [
  "🐻",
  "🐼",
  "🦊",
  "🐨",
  "🐯",
  "🐸",
  "🐵",
  "🦁",
  "🐰",
  "🐷",
  "🐙",
  "🦄",
];

const ORDER: Difficulty[] = ["easy", "medium", "hard"];

export function GroupLearn({ onExit }: GroupLearnProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [problem, setProblem] = useState<Problem>(() => makeProblem("easy"));
  const [round, setRound] = useState(1);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [buzz, setBuzz] = useState(0);
  const [showRanking, setShowRanking] = useState(false);
  const timerRef = useRef<number | null>(null);

  const meta = DIFFICULTY_META[difficulty];

  const ranked = useMemo(
    () => [...students].sort((a, b) => b.points - a.points),
    [students]
  );

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const addStudent = () => {
    const name = newName.trim();
    if (name === "") return;
    setStudents((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        name,
        emoji: STUDENT_EMOJIS[prev.length % STUDENT_EMOJIS.length],
        points: 0,
      },
    ]);
    setNewName("");
  };

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const nextRound = useCallback(() => {
    clearTimer();
    setProblem(makeProblem(difficulty));
    setWinnerId(null);
    setRound((r) => r + 1);
  }, [clearTimer, difficulty]);

  const awardPoint = (student: Student) => {
    if (winnerId !== null) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id ? { ...s, points: s.points + 1 } : s
      )
    );
    setWinnerId(student.id);
    setBuzz((b) => b + 1);
    clearTimer();
    timerRef.current = window.setTimeout(nextRound, 1800);
  };

  const adjustPoints = (id: string, delta: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, points: Math.max(0, s.points + delta) } : s
      )
    );
    // Awarding a point (via the + button) also ends the round and moves on.
    if (delta > 0 && winnerId === null) {
      setWinnerId(id);
      setBuzz((b) => b + 1);
      clearTimer();
      timerRef.current = window.setTimeout(nextRound, 1800);
    }
  };

  const resetScores = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, points: 0 })));
    setWinnerId(null);
    setRound(1);
    setProblem(makeProblem(difficulty));
  };

  const changeDifficulty = (d: Difficulty) => {
    setDifficulty(d);
    setProblem(makeProblem(d));
    setWinnerId(null);
  };

  const topPoints = ranked[0] ? ranked[0].points : 0;

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
        <div className="h-2.5 w-full bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500" />
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-teal-500 to-emerald-500 shadow-md">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-800">
                  Group learn
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  First to answer correctly wins the point! 🏁
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="rounded-full font-display font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <RotateCcw className="mr-1 h-4 w-4" />
              Exit
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-bold text-slate-500">
              Level:
            </span>
            {ORDER.map((d) => {
              const m = DIFFICULTY_META[d];
              const active = difficulty === d;
              return (
                <button
                  key={d}
                  onClick={() => changeDifficulty(d)}
                  className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-1.5 font-display text-sm font-bold transition-all hover:scale-105 ${
                    active
                      ? `border-transparent bg-gradient-to-r ${m.accent} text-white shadow-md`
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{m.emoji}</span>
                  {m.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
            <div className={`h-2.5 w-full bg-gradient-to-r ${meta.accent}`} />
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-teal-200 bg-teal-50 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-teal-600">
                  <Sparkles className="h-4 w-4" />
                  Round {round}
                </span>
                <span className="font-display text-sm font-bold text-slate-500">
                  {meta.label} level
                </span>
              </div>

              <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border-4 border-dashed border-teal-100 bg-gradient-to-b from-teal-50/60 to-white py-10">
                {winnerId && (
                  <div
                    key={buzz}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <div className="animate-ping text-8xl opacity-30">🎉</div>
                  </div>
                )}

                <p className="font-display text-lg font-bold text-slate-500">
                  Who can solve it first? ✋
                </p>

                <div className="font-math flex items-center gap-4 text-6xl tracking-tight text-slate-800 sm:text-7xl">
                  <span>{problem.a}</span>
                  <span className="text-teal-500">{problem.op}</span>
                  <span>{problem.b}</span>
                  <span className="text-slate-300">=</span>
                  <span className="text-slate-300">?</span>
                </div>

                {winnerId ? (
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-display text-xl font-extrabold text-emerald-600">
                      {students.find((s) => s.id === winnerId)?.emoji}{" "}
                      {students.find((s) => s.id === winnerId)?.name} got it
                      first! +1 point
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Next question coming up…
                    </p>
                  </div>
                ) : (
                  <p className="font-display text-base font-bold text-slate-500">
                    Tap a student on the side to award the point 🎯
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={nextRound}
                    className="h-11 rounded-2xl border-2 border-slate-200 font-display text-base font-bold text-slate-600 hover:bg-slate-50"
                  >
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Skip / next question
                  </Button>
                  <Button
                    onClick={() => setShowRanking(true)}
                    disabled={students.length === 0}
                    className="h-11 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 font-display text-base font-extrabold text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40"
                  >
                    <Trophy className="mr-1.5 h-4 w-4" />
                    Finish quiz &amp; show ranking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card className="rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
            <CardContent className="p-6">
              <h3 className="mb-4 font-display text-lg font-extrabold text-slate-800">
                Add students
              </h3>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label
                    htmlFor="student-name"
                    className="mb-2 block font-display text-sm font-bold text-slate-600"
                  >
                    Student name
                  </Label>
                  <Input
                    id="student-name"
                    value={newName}
                    maxLength={16}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addStudent()}
                    placeholder="e.g. Leo"
                    className="h-12 rounded-2xl border-2 border-slate-200 bg-white font-display text-base font-semibold text-slate-800 focus-visible:ring-teal-400"
                  />
                </div>
                <Button
                  onClick={addStudent}
                  disabled={newName.trim() === ""}
                  className="h-12 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 px-4 font-display font-extrabold text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {students.length === 0 ? (
                <div className="mt-4 rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center">
                  <p className="text-4xl">👩‍🏫</p>
                  <p className="mt-2 font-display text-base font-bold text-slate-600">
                    No students yet
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Add your class to start the group game.
                  </p>
                </div>
              ) : (
                <ul className="mt-4 flex flex-col gap-2">
                  {students.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-2 pl-3 transition-all hover:border-teal-200"
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      <span className="min-w-0 flex-1 truncate font-display text-base font-extrabold text-slate-800">
                        {s.name}
                      </span>
                      <span className="font-display text-sm font-bold text-slate-500">
                        {s.points} pt{s.points === 1 ? "" : "s"}
                      </span>
                      <button
                        onClick={() => adjustPoints(s.id, -1)}
                        disabled={s.points === 0}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-200 text-slate-500 transition-all hover:scale-110 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-500"
                        aria-label={`Remove a point from ${s.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => adjustPoints(s.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-emerald-200 bg-emerald-50 text-emerald-600 transition-all hover:scale-110 hover:border-emerald-300 hover:bg-emerald-100"
                        aria-label={`Add a point to ${s.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeStudent(s.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                        aria-label={`Remove ${s.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showRanking} onOpenChange={setShowRanking}>
        <DialogContent className="max-w-lg overflow-hidden rounded-3xl border-4 border-white p-0 shadow-2xl">
          <div className="h-2.5 w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
          <div className="p-6 sm:p-8">
            <DialogHeader className="text-left">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-md">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-800">
                    Final ranking
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium text-slate-500">
                    Great job everyone! 🎉
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {ranked.length === 0 ? (
              <div className="mt-4 rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center">
                <p className="text-4xl">🏆</p>
                <p className="mt-2 font-display text-base font-bold text-slate-600">
                  No students to rank
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Add students and play a round first.
                </p>
              </div>
            ) : (
              <ul className="mt-5 flex flex-col gap-2">
                {ranked.map((s, i) => {
                  const isLeader = i === 0 && s.points > 0;
                  const isTied = s.points === topPoints && s.points > 0;
                  return (
                    <li
                      key={s.id}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-3 transition-all ${
                        isLeader
                          ? "border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50"
                          : "border-slate-100 bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-base font-extrabold ${
                          isLeader
                            ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isLeader ? <Crown className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className="text-2xl">{s.emoji}</span>
                      <span className="min-w-0 flex-1 truncate font-display text-base font-extrabold text-slate-800">
                        {s.name}
                      </span>
                      {isTied && !isLeader && (
                        <Medal className="h-4 w-4 text-slate-400" />
                      )}
                      <span className="shrink-0 font-display text-xl font-extrabold tracking-tight text-indigo-600">
                        {s.points}
                      </span>
                      <span className="shrink-0 font-display text-sm font-bold text-slate-400">
                        pt{s.points === 1 ? "" : "s"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            <DialogFooter className="mt-6 flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={resetScores}
                className="h-11 rounded-2xl border-2 border-slate-200 font-display text-base font-bold text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw className="mr-1 h-4 w-4" />
                Reset scores
              </Button>
              <Button
                onClick={() => setShowRanking(false)}
                className="h-11 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 font-display text-base font-extrabold text-white shadow-md transition-transform hover:scale-105"
              >
                Back to quiz
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}