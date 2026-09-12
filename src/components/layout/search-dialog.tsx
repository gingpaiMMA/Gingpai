import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchProducts } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";
import { useUi } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SearchDialog() {
  const open = useUi((s) => s.searchOpen);
  const setOpen = useUi((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQ("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]",
        "transition-opacity duration-200",
        open
          ? "bg-bg/70 opacity-100 backdrop-blur-sm"
          : "pointer-events-none invisible opacity-0",
      )}
      onClick={() => setOpen(false)}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "w-full max-w-lg overflow-hidden border border-border bg-surface shadow-border",
          "origin-top transition-[transform,opacity] duration-200 ease-out",
          open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Busca"
      >
        <form
          className="flex items-center gap-2 border-b border-border px-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!q.trim()) return;
            setOpen(false);
            navigate({ to: "/busca", search: { q: q.trim() } });
          }}
        >
          <Search className="size-4 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar luvas, caneleiras, kits…"
            className="h-14 flex-1 bg-transparent text-sm text-fg placeholder:text-subtle outline-none"
          />
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label="Fechar busca"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
          </button>
        </form>
        <div className="max-h-80 overflow-y-auto">
          {q.trim() && results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted">
              Nada encontrado para “{q}”.
            </p>
          ) : (
            results.map((p) => (
              <Link
                key={p.slug}
                to="/produto/$slug"
                params={{ slug: p.slug }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-elevated"
              >
                <img src={p.image} alt="" className="size-14 object-cover bg-elevated" />
                <div className="min-w-0">
                  <p className="truncate text-sm">{p.name}</p>
                  <p className="tab-nums text-xs text-muted">{formatBRL(p.price)}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
