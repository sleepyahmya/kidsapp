import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={clsx("flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-base outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:opacity-50", className)} {...props} />; }
