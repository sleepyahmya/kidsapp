export type Difficulty = "easy" | "medium" | "hard";
export type Operation = "+" | "-" | "×" | "?";
export type Mode = "practice" | "quiz";
export type GameMode = Mode;
export interface Problem { a: number; b: number; op: Operation; answer: number; display: string }
export interface DifficultyMeta { label: string; emoji: string; accent: string; soft: string; text: string; ring: string; max: number; tag: string; blurb: string }
export interface AnimalProfile { id: string; name: string; emoji: string; tagline: string; accent: string; ring: string }
export interface GameStats { correct: number; wrong: number; streak: number; bestStreak: number }
export interface Prize { title: string; emoji: string; blurb: string; accent: string }
export interface QuizResult { id: string; playerName: string; animal: AnimalProfile; difficulty: Difficulty; correct: number; total: number; score: number; prize: Prize; date: string }
export interface ModeMeta { label: string; emoji: string; blurb: string; accent: string; soft: string; text: string; tag: string; ring: string }
export const QUIZ_LENGTH = 10;
export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
export const DIFFICULTY_META: Record<Difficulty, DifficultyMeta> = {
  easy: { label: "Easy", emoji: "🌱", accent: "from-emerald-400 to-teal-500", soft: "bg-emerald-50", text: "text-emerald-600", ring: "hover:ring-emerald-100", max: 10, tag: "Up to 10", blurb: "Add and subtract small numbers." },
  medium: { label: "Medium", emoji: "⚡", accent: "from-amber-400 to-orange-500", soft: "bg-amber-50", text: "text-amber-600", ring: "hover:ring-amber-100", max: 20, tag: "Up to 20", blurb: "Try bigger sums and multiplication." },
  hard: { label: "Hard", emoji: "🚀", accent: "from-fuchsia-500 to-indigo-600", soft: "bg-fuchsia-50", text: "text-fuchsia-600", ring: "hover:ring-fuchsia-100", max: 50, tag: "Up to 50", blurb: "Take on a bigger math challenge." },
};
export const MODES: Mode[] = ["practice", "quiz"];
export const MODE_META: Record<Mode, ModeMeta> = {
  practice: { label: "Practice", emoji: "🧠", blurb: "Practice freely and build your confidence.", accent: "from-sky-400 to-blue-600", soft: "bg-sky-50", text: "text-sky-600", tag: "No timer", ring: "hover:border-sky-200" },
  quiz: { label: "Quiz", emoji: "🏆", blurb: "Answer ten questions and earn a prize.", accent: "from-rose-400 to-pink-600", soft: "bg-rose-50", text: "text-rose-600", tag: "10 questions", ring: "hover:border-rose-200" },
};
const ANIMAL_EMOJI = ["🦊", "🐼", "🐸", "🦁", "🐳", "🐝", "🦄", "🦉", "🐨", "🐯", "🐬", "🐰"];
const ANIMAL_NAMES = ["Foxy", "Panda", "Frog", "Lion", "Whale", "Bee", "Unicorn", "Owl", "Koala", "Tiger", "Dolphin", "Bunny"];
const ANIMAL_COLORS = ["from-orange-400 to-rose-500", "from-slate-400 to-slate-600", "from-emerald-400 to-teal-600", "from-amber-400 to-orange-600", "from-sky-400 to-blue-600", "from-yellow-300 to-amber-500", "from-fuchsia-400 to-violet-600", "from-indigo-400 to-blue-600", "from-stone-400 to-amber-700", "from-orange-500 to-red-600", "from-cyan-400 to-teal-600", "from-violet-400 to-fuchsia-600"];
export const ANIMALS: AnimalProfile[] = ANIMAL_EMOJI.map((emoji, i) => ({ id: `animal-${i}`, name: ANIMAL_NAMES[i], emoji, tagline: ["Quick and clever!", "Calm and curious!", "Ready to leap!", "Brave and bright!"][i % 4], accent: ANIMAL_COLORS[i], ring: "hover:ring-4 hover:ring-teal-100" }));
export const PRIZES: Prize[] = [
  { title: "Gold Star", emoji: "🏅", blurb: "Fantastic work! You earned the top prize.", accent: "from-amber-300 to-yellow-500" },
  { title: "Lollipop", emoji: "🍭", blurb: "Amazing effort on your quiz!", accent: "from-pink-300 to-rose-500" },
  { title: "Balloon", emoji: "🎈", blurb: "Great job—keep learning!", accent: "from-sky-300 to-cyan-500" },
  { title: "Cookie", emoji: "🍪", blurb: "Nice work, math star!", accent: "from-orange-300 to-amber-500" },
  { title: "Rainbow Badge", emoji: "🌈", blurb: "Every answer helps you grow!", accent: "from-violet-300 to-indigo-500" },
  { title: "Confetti Crown", emoji: "🎉", blurb: "Keep practicing and try again!", accent: "from-fuchsia-300 to-pink-500" },
];
export function getPrize(score: number): Prize {
  if (score >= 90) return PRIZES[0]; if (score >= 70) return PRIZES[1]; if (score >= 50) return PRIZES[2]; if (score >= 30) return PRIZES[3]; if (score > 0) return PRIZES[4]; return PRIZES[5];
}
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export function makeProblem(difficulty: Difficulty): Problem {
  const max = DIFFICULTY_META[difficulty].max;
  if (Math.random() < 0.18) { const a = rand(1, max); const answer = rand(1, max); const op: Operation = Math.random() < 0.5 ? "+" : "-"; const b = op === "+" ? a + answer : a - answer; return { a, b, op: "?", answer, display: "?" }; }
  if (Math.random() < 0.35) { const a = rand(2, max); const b = rand(1, a); return { a, b, op: "-", answer: a - b, display: String(a - b) }; }
  if (difficulty !== "easy" && Math.random() < 0.25) { const a = rand(2, Math.min(max, 12)); const b = rand(2, Math.min(max, 12)); return { a, b, op: "×", answer: a * b, display: String(a * b) }; }
  const a = rand(1, max); const b = rand(1, max); return { a, b, op: "+", answer: a + b, display: String(a + b) };
}
export function problemText(p: Problem): string { return p.op === "?" ? `${p.a} ± ? = ${p.b}` : `${p.a} ${p.op} ${p.b}`; }
function blip(freqs: number[], duration = 0.12) { try { const Ctx = window.AudioContext; const ctx = new Ctx(); freqs.forEach((f, i) => { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = "sine"; osc.frequency.value = f; osc.connect(gain); gain.connect(ctx.destination); const start = ctx.currentTime + i * duration; gain.gain.setValueAtTime(0.0001, start); gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, start + duration); osc.start(start); osc.stop(start + duration); }); window.setTimeout(() => void ctx.close(), (freqs.length + 1) * duration * 1000); } catch { /* audio is optional */ } }
export function correctCheer(name = "") { blip([523.25, 659.25, 783.99]); return name ? `Great job, ${name}!` : "Great job!"; }
export function wrongCheer(name = "") { blip([220, 174.61], 0.18); return name ? `Keep trying, ${name}!` : "Keep trying!"; }
export function winFanfare() { blip([523.25, 659.25, 783.99, 1046.5], 0.14); }
