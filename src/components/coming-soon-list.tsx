import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type ComingSoonListProps = {
  soon: Dictionary["soon"];
};

const icons = {
  collection: CollectionIcon,
  models: ModelIcon,
  search: SearchIcon,
  chat: ChatIcon,
  library: LibraryIcon,
} as const;

export function ComingSoonList({ soon }: ComingSoonListProps) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-semibold tracking-wide text-accent">{soon.eyebrow}</p>
      <h1 className="display-type mt-2 text-5xl text-accent sm:text-6xl">{soon.title}</h1>
      <p className="mt-5 font-serif text-xl leading-relaxed text-ink-soft">{soon.intro}</p>
      <ol className="mt-10 divide-y divide-line border-y border-line">
        {soon.features.map((feature, index) => {
          const Icon = icons[feature.id as keyof typeof icons] ?? CollectionIcon;
          return (
            <li key={feature.id} className="grid grid-cols-[auto_1fr] gap-4 py-6 sm:grid-cols-[auto_auto_1fr] sm:items-start">
              <span className="pt-1 text-sm font-semibold tracking-widest text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="grid size-11 place-items-center rounded-full bg-surface text-accent ring-1 ring-line">
                <Icon />
              </span>
              <div className="col-span-2 sm:col-span-1">
                <h2 className="font-serif text-2xl">{feature.title}</h2>
                <p className="mt-2 font-serif text-lg leading-relaxed text-ink-soft">{feature.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      {children}
    </svg>
  );
}

function CollectionIcon() {
  return (
    <IconFrame>
      <circle cx="8" cy="9" r="2.2" />
      <circle cx="15.5" cy="8" r="1.6" />
      <circle cx="14" cy="15" r="2.4" />
      <path d="M4 19c1.2-3 3-4.5 5.2-4.5 1.4 0 2.5.5 3.4 1.4" strokeLinecap="round" />
    </IconFrame>
  );
}

function ModelIcon() {
  return (
    <IconFrame>
      <path d="M12 3.5l2.2 4.6 5 .7-3.6 3.5.9 5.1L12 15.1 7.5 17.4l.9-5.1L4.8 8.8l5-.7L12 3.5Z" strokeLinejoin="round" />
    </IconFrame>
  );
}

function SearchIcon() {
  return (
    <IconFrame>
      <circle cx="11" cy="11" r="5.5" />
      <path d="M15.5 15.5L20 20" strokeLinecap="round" />
    </IconFrame>
  );
}

function ChatIcon() {
  return (
    <IconFrame>
      <path d="M5 6.5h14v9H9l-4 3.5V6.5Z" strokeLinejoin="round" />
    </IconFrame>
  );
}

function LibraryIcon() {
  return (
    <IconFrame>
      <path d="M5 16V8M9 16V6M13 16V9M17 16V7M4 16.5h16" strokeLinecap="round" />
    </IconFrame>
  );
}
