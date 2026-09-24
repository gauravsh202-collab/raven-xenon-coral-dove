import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none outline-none disabled:pointer-events-none disabled:opacity-40 transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] min-h-11",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-[0_1px_0_color-mix(in_oklab,white_28%,transparent)_inset] hover:opacity-90",
        ghost:
          "bg-transparent text-fg hover:bg-glass/10",
        glass:
          "glass glass-compact text-fg hover:bg-glass/10",
        danger:
          "bg-danger text-fg hover:opacity-90",
      },
      size: {
        md: "h-12 px-5 text-sm rounded-md",
        lg: "h-12 px-6 text-sm rounded-lg",
        icon: "size-11 rounded-md px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
