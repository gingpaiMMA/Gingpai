import { createRouter, Link } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-7xl tracking-wide text-accent">404</p>
      <h1 className="font-display text-4xl tracking-[0.08em]">Round encerrado</h1>
      <p className="max-w-sm text-sm text-muted">
        Essa página não existe — ou foi nocauteada. Volta para a loja.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-11 items-center bg-fg px-5 text-sm font-medium text-bg"
      >
        Voltar ao início
      </Link>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
