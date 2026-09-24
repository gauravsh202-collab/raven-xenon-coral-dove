import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        suppressHydrationWarning
        className={cn(
          "h-12 w-full rounded-md bg-transparent px-4 text-base text-fg outline-none placeholder:text-subtle",
          className,
        )}
        {...props}
      />
    );
  },
);
