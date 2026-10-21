import { GraduationCap, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  playerName: string;
  onOpenTeacher: () => void;
  onOpenGroup: () => void;
  teacherOpen: boolean;
  groupOpen: boolean;
}

export function Header({
  playerName,
  onOpenTeacher,
  onOpenGroup,
  teacherOpen,
  groupOpen,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b-4 border-white/60 bg-gradient-to-r from-fuchsia-100 via-teal-100 to-amber-100 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 rotate-3 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-teal-500 to-emerald-500 shadow-md shadow-teal-500/30 transition-transform hover:rotate-6">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold leading-none tracking-tight text-slate-800">
              Math Buddies
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {playerName
                ? `Hi ${playerName}! Let's play! 🎈`
                : "Fun math practice for kids 🎈"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={groupOpen ? "default" : "outline"}
            onClick={onOpenGroup}
            className={`rounded-full border-2 px-5 font-display text-base font-bold shadow-sm transition-transform hover:scale-105 ${
              groupOpen
                ? "border-transparent bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:opacity-90"
                : "border-teal-200 bg-white text-teal-600 hover:bg-teal-50"
            }`}
          >
            <Users className="mr-1.5 h-4 w-4" />
            Group learn
          </Button>

          <Button
            variant={teacherOpen ? "default" : "outline"}
            onClick={onOpenTeacher}
            className={`rounded-full border-2 px-5 font-display text-base font-bold shadow-sm transition-transform hover:scale-105 ${
              teacherOpen
                ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90"
                : "border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <GraduationCap className="mr-1.5 h-4 w-4" />
            Teacher mode
          </Button>
        </div>
      </div>
    </header>
  );
}