import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass rounded-2xl p-6 sm:p-8", className)} {...props}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
