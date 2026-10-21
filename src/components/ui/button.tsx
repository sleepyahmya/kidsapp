import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "secondary"; size?: "default" | "sm" | "lg" | "icon" };
export function Button({ className, variant = "default", size = "default", ...props }: Props) {
  const variants = { default: "bg-teal-600 text-white hover:bg-teal-700 shadow-sm", outline: "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50", ghost: "text-slate-600 hover:bg-slate-100", secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200" };
  const sizes = { default: "min-h-11 px-5 py-2.5", sm: "min-h-9 px-3 py-1.5 text-sm", lg: "min-h-12 px-7 py-3 text-lg", icon: "h-10 w-10" };
  return <button className={clsx("inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} {...props} />;
}
