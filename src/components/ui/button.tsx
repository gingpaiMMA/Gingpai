import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,border-color,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-bg hover:bg-bone",
        accent:
          "bg-accent text-accent-fg hover:brightness-110",
        outline:
          "border border-fg/25 bg-transparent text-fg hover:border-fg/60 hover:bg-fg/5",
        ghost:
          "bg-transparent text-fg hover:bg-fg/8",
        inverse:
          "bg-bg text-fg hover:bg-elevated",
      },
      size: {
        sm: "h-10 px-3.5 text-xs tracking-wide",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-sm tracking-wide",
        icon: "size-11",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  width,
  asChild,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, width }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
