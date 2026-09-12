import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex flex-col leading-none text-fg", className)}>
      <span className="font-display text-[1.55em] tracking-[0.14em]">GINGPAI</span>
      {!compact ? (
        <span className="mt-0.5 flex items-center gap-1.5 text-[0.52em] font-medium tracking-[0.42em] text-muted">
          BOXING
          <span className="flex gap-[3px]" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="size-1 rounded-full bg-accent" />
            ))}
          </span>
        </span>
      ) : null}
    </span>
  );
}
