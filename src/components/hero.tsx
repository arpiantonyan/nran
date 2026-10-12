import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export function Hero({ locale, hero }: HeroProps) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:py-20">
      <div>
        <p className="text-sm font-semibold tracking-wide text-accent">{hero.eyebrow}</p>
        <h1 className="display-type mt-3 text-6xl text-accent sm:text-7xl">{hero.title}</h1>
        <p className="mt-5 max-w-xl font-serif text-xl leading-relaxed text-ink sm:text-2xl">{hero.lead}</p>
        <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">{hero.body}</p>
        <Link href={`/${locale}#map`} className="btn mt-8">
          {hero.cta}
        </Link>
      </div>
      <Pomegranate />
    </section>
  );
}

function Pomegranate() {
  return (
    <svg viewBox="0 0 360 360" className="mx-auto w-full max-w-sm" aria-hidden="true">
      <circle cx="180" cy="196" r="132" fill="#7A1B34" />
      <circle cx="180" cy="196" r="118" fill="#8E2340" />
      <path d="M180 42c8 28 6 42 0 54-6-12-8-26 0-54Z" fill="#5C1226" />
      <path d="M180 78c28-30 62-20 74 8-32 12-52 14-74-8Z" fill="#5C1226" />
      <path d="M180 78c-28-30-62-20-74 8 32 12 52 14 74-8Z" fill="#5C1226" />
      {[
        [128, 150, 16],
        [164, 132, 12],
        [206, 146, 18],
        [244, 176, 13],
        [118, 196, 14],
        [156, 188, 20],
        [198, 196, 22],
        [236, 214, 15],
        [140, 236, 16],
        [182, 242, 18],
        [220, 248, 12],
        [168, 274, 11],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#F3C7C4" opacity="0.92" />
      ))}
      <circle cx="176" cy="168" r="7" fill="#7A1B34" opacity="0.35" />
      <circle cx="214" cy="188" r="6" fill="#7A1B34" opacity="0.28" />
      <circle cx="160" cy="220" r="5" fill="#7A1B34" opacity="0.3" />
    </svg>
  );
}
