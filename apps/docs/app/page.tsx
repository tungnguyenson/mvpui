import Link from "next/link";
import { components, examples } from "./nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold text-fg tracking-tight">
            MVP UI
          </h1>
          <p className="mt-2 text-md text-fg-tertiary">
            Component workbench — Untitled UI design language
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-fg-tertiary mb-4">
            Components
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {components.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-bg
                  text-sm font-medium text-fg-secondary
                  hover:border-brand-300 hover:text-fg hover:bg-brand-25
                  transition-all duration-250 ease-[cubic-bezier(0.2,0,0,1)]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-fg-tertiary mb-4">
            Examples
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {examples.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-bg
                  text-sm font-medium text-fg-secondary
                  hover:border-brand-300 hover:text-fg hover:bg-brand-25
                  transition-all duration-250 ease-[cubic-bezier(0.2,0,0,1)]"
              >
                {e.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
