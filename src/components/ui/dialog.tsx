import type { HTMLAttributes, ReactNode } from "react";
export function Dialog({ open, children }: { open: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) { return open ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="presentation"><div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">{children}</div></div> : null; }
export function DialogContent({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={className} {...props} />; }
export function DialogHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`mb-4 space-y-1 ${className}`} {...props} />; }
export function DialogTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h2 className={`text-xl font-extrabold ${className}`} {...props} />; }
export function DialogDescription({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={`text-sm text-slate-500 ${className}`} {...props} />; }
export function DialogFooter({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`mt-5 flex justify-end gap-2 ${className}`} {...props} />; }
