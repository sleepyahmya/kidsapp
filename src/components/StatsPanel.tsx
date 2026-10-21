import { CheckCircle2, Flame, Star, Target, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AnimalProfile, GameStats } from "@/types/game";

interface StatsPanelProps {
  playerName: string;
  animal: AnimalProfile;
  stats: GameStats;
  onReset: () => void;
}

export function StatsPanel({
  playerName,
  animal,
  stats,
  onReset,
}: StatsPanelProps) {
  const total = stats.correct + stats.wrong;
  const accuracy = total === 0 ? 0 : Math.round((stats.correct / total) * 100);

  const items = [
    {
      label: "Correct",
      value: stats.correct,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Oops",
      value: stats.wrong,
      icon: XCircle,
      color: "bg-rose-50 text-rose-500",
    },
    {
      label: "Streak",
      value: stats.streak,
      icon: Flame,
      color: "bg-amber-50 text-amber-500",
    },
    {
      label: "Best",
      value: stats.bestStreak,
      icon: Target,
      color: "bg-sky-50 text-sky-600",
    },
  ];

  return (
    <Card className="rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${animal.accent} text-2xl shadow-md`}
          >
            {animal.emoji}
          </div>
          <div>
            <h3 className="font-display text-lg font-extrabold leading-none text-slate-800">
              {playerName}'s progress
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Playing as {animal.name}
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border-2 border-teal-100 bg-teal-50/50 p-4">
          <div className="flex items-end justify-between">
            <span className="font-display text-base font-bold text-slate-600">
              Accuracy
            </span>
            <span className="font-display text-4xl font-extrabold tracking-tight text-slate-800">
              {accuracy}%
            </span>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {total === 0
              ? "No answers yet — start solving! 🚀"
              : `${stats.correct} of ${total} correct`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border-2 border-slate-100 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
            >
              <div
                className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <p className="font-display text-3xl font-extrabold tracking-tight text-slate-800">
                {item.value}
              </p>
              <p className="text-sm font-bold text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={onReset}
          className="mt-5 h-11 w-full rounded-2xl border-2 border-slate-200 font-display text-base font-bold text-slate-600 hover:bg-slate-50"
        >
          <Star className="mr-1 h-4 w-4" />
          Reset session
        </Button>
      </CardContent>
    </Card>
  );
}