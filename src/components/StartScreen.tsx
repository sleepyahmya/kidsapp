import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  PartyPopper,
  User,
  Users,
} from "lucide-react";
import {
  ANIMALS,
  DIFFICULTY_META,
  MODE_META,
  type AnimalProfile,
  type Difficulty,
  type Mode,
} from "@/types/game";

interface StartScreenProps {
  onSelect: (
    name: string,
    animal: AnimalProfile,
    difficulty: Difficulty,
    mode: Mode
  ) => void;
  onGroupLearn: () => void;
}

const ORDER: Difficulty[] = ["easy", "medium", "hard"];
const MODES: Mode[] = ["practice", "quiz"];

export function StartScreen({ onSelect, onGroupLearn }: StartScreenProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [animal, setAnimal] = useState<AnimalProfile | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [step, setStep] = useState<"name" | "animal" | "level" | "mode">(
    "name"
  );

  const trimmed = name.trim();

  const goToAnimals = () => {
    if (trimmed === "") {
      setError(true);
      return;
    }
    setStep("animal");
  };

  return (
    <div className="mx-auto max-w-4xl">
      {step === "name" && (
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 animate-bounce items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-400 via-teal-400 to-emerald-400 shadow-lg shadow-teal-400/40">
              <PartyPopper className="h-10 w-10 text-white" />
            </div>
            <span className="inline-flex items-center rounded-full border-2 border-fuchsia-200 bg-fuchsia-50 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-fuchsia-600">
              Step 1 of 4
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              What's your name?
            </h2>
            <p className="mt-3 text-lg font-medium leading-relaxed text-slate-600">
              We'll cheer you on by name every time you get an answer right! 🎉
            </p>
          </div>

          <Card className="rounded-3xl border-4 border-white bg-white shadow-xl shadow-teal-200/40">
            <CardContent className="p-6 sm:p-8">
              <Label
                htmlFor="player-name"
                className="mb-2 block font-display text-base font-bold text-slate-700"
              >
                Your name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-400" />
                <Input
                  id="player-name"
                  value={name}
                  maxLength={20}
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && goToAnimals()}
                  placeholder="e.g. Mia"
                  className={`h-14 rounded-2xl border-2 bg-white pl-11 font-display text-lg font-semibold text-slate-800 focus-visible:ring-teal-400 ${
                    error
                      ? "border-rose-300 ring-4 ring-rose-100"
                      : "border-slate-200"
                  }`}
                />
              </div>
              {error && (
                <p className="mt-2 font-display text-sm font-bold text-rose-500">
                  Please enter your name to continue.
                </p>
              )}

              <Button
                onClick={goToAnimals}
                className="mt-5 h-14 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 font-display text-lg font-extrabold text-white shadow-lg shadow-teal-400/40 transition-transform hover:scale-[1.02] hover:opacity-95"
              >
                Continue
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="font-display text-sm font-bold text-slate-400">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Button
                variant="outline"
                onClick={onGroupLearn}
                className="mt-5 h-14 w-full rounded-2xl border-2 border-teal-200 bg-teal-50/60 font-display text-lg font-extrabold text-teal-700 transition-transform hover:scale-[1.02] hover:bg-teal-50"
              >
                <Users className="mr-1.5 h-5 w-5" />
                Group learn mode
              </Button>
              <p className="mt-2 text-center text-sm font-medium text-slate-500">
                For the whole class — first to answer wins a point! 🏁
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "animal" && (
        <div>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center rounded-full border-2 border-fuchsia-200 bg-fuchsia-50 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-fuchsia-600">
              Step 2 of 4
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              Choose your animal, {trimmed} 🐾
            </h2>
            <p className="mt-3 text-lg font-medium leading-relaxed text-slate-600">
              Pick a buddy to play with you on your math adventure.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {ANIMALS.map((a) => {
              const selected = animal?.id === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setAnimal(a)}
                  className={`group flex flex-col items-center gap-3 rounded-3xl border-4 bg-white p-5 text-center shadow-lg transition-all hover:-translate-y-1.5 hover:shadow-xl ${
                    selected
                      ? "border-teal-300 shadow-teal-200/60"
                      : `border-white ${a.ring}`
                  }`}
                >
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${a.accent} text-4xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6`}
                  >
                    {a.emoji}
                  </div>
                  <div>
                    <p className="font-display text-lg font-extrabold text-slate-800">
                      {a.name}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-500">
                      {a.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep("name")}
              className="inline-flex items-center gap-1.5 font-display text-base font-bold text-slate-500 transition-colors hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to name
            </button>
            <Button
              onClick={() => animal && setStep("level")}
              disabled={!animal}
              className="h-12 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 px-7 font-display text-lg font-extrabold text-white shadow-lg shadow-teal-400/40 transition-transform hover:scale-105 disabled:opacity-40"
            >
              Continue
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {step === "level" && (
        <div>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center rounded-full border-2 border-fuchsia-200 bg-fuchsia-50 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-fuchsia-600">
              Step 3 of 4
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              Pick a level, {trimmed} {animal?.emoji}
            </h2>
            <p className="mt-3 text-lg font-medium leading-relaxed text-slate-600">
              Choose a difficulty for your questions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {ORDER.map((d) => {
              const meta = DIFFICULTY_META[d];
              const selected = difficulty === d;
              return (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`group flex flex-col overflow-hidden rounded-3xl border-4 bg-white text-left shadow-lg transition-all hover:-translate-y-1.5 hover:shadow-xl ${
                    selected
                      ? "border-teal-300 shadow-teal-200/60"
                      : `border-white ${meta.ring}`
                  }`}
                >
                  <div
                    className={`h-2.5 w-full bg-gradient-to-r ${meta.accent}`}
                  />
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-3xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6`}
                      >
                        {meta.emoji}
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-display text-xs font-bold text-slate-600">
                        {meta.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold text-slate-800">
                        {meta.label}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                        {meta.blurb}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep("animal")}
              className="inline-flex items-center gap-1.5 font-display text-base font-bold text-slate-500 transition-colors hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to animals
            </button>
            <Button
              onClick={() => difficulty && setStep("mode")}
              disabled={!difficulty}
              className="h-12 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-teal-500 to-emerald-500 px-7 font-display text-lg font-extrabold text-white shadow-lg shadow-teal-400/40 transition-transform hover:scale-105 disabled:opacity-40"
            >
              Continue
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {step === "mode" && animal && difficulty && (
        <div>
          <div className="mb-8 max-w-2xl">
            <span className="inline-flex items-center rounded-full border-2 border-fuchsia-200 bg-fuchsia-50 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-fuchsia-600">
              Step 4 of 4
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              How do you want to play, {trimmed}?
            </h2>
            <p className="mt-3 text-lg font-medium leading-relaxed text-slate-600">
              Practice freely, or take a quiz where your score is recorded.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {MODES.map((m) => {
              const meta = MODE_META[m];
              return (
                <Card
                  key={m}
                  className={`group flex flex-col overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg transition-all hover:-translate-y-1.5 hover:shadow-xl ${meta.ring}`}
                >
                  <div
                    className={`h-2.5 w-full bg-gradient-to-r ${meta.accent}`}
                  />
                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-4xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6`}
                      >
                        {meta.emoji}
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-display text-xs font-bold text-slate-600">
                        {meta.tag}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-extrabold text-slate-800">
                        {meta.label}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                        {meta.blurb}
                      </p>
                    </div>
                    <Button
                      onClick={() => onSelect(trimmed, animal, difficulty, m)}
                      className={`h-12 w-full rounded-2xl bg-gradient-to-r ${meta.accent} font-display text-lg font-extrabold text-white shadow-md transition-transform group-hover:scale-[1.03]`}
                    >
                      {m === "quiz" ? "Start quiz" : "Start playing"}
                      <ArrowRight className="ml-1 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <button
            onClick={() => setStep("level")}
            className="mt-6 inline-flex items-center gap-1.5 font-display text-base font-bold text-slate-500 transition-colors hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to levels
          </button>
        </div>
      )}
    </div>
  );
}