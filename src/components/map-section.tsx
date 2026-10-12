"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/locales";
import type { DialectPin, MapCopy } from "@/lib/types";

const DialectMap = dynamic(() => import("@/components/dialect-map").then((mod) => mod.DialectMap), {
  ssr: false,
  loading: () => <MapLoading />,
});

type MapSectionProps = {
  locale: Locale;
  title: string;
  eyebrow: string;
  copy: MapCopy;
  status: "ready" | "error";
  dialects: DialectPin[];
  soonLabel: string;
};

export function MapSection({ locale, title, eyebrow, copy, status, dialects, soonLabel }: MapSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section id="map" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="text-sm font-semibold tracking-wide text-accent">{eyebrow}</p>
      <h2 className="display-type mt-2 text-5xl text-accent sm:text-6xl">{title}</h2>
      <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-ink-soft">{copy.lead}</p>

      {open ? (
        <div className="map-stage mt-8">
          <div className="mb-4 flex justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              {copy.close}
            </button>
          </div>
          {status === "error" ? (
            <p className="rounded-3xl bg-surface px-5 py-10 text-center font-serif text-lg" role="alert">
              {copy.error}
            </p>
          ) : (
            <DialectMap dialects={dialects} copy={copy} />
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-line bg-surface/80 px-6 py-12 text-center sm:px-10">
          <ClosedMarks />
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-soft">{copy.closed}</p>
          <button
            type="button"
            className="btn mt-6"
            aria-expanded={false}
            onClick={() => setOpen(true)}
          >
            {copy.open}
          </button>
          <noscript>
            <p className="mt-4 text-sm">{copy.noscript}</p>
          </noscript>
        </div>
      )}

      <p className="mt-8">
        <Link href={`/${locale}/coming-soon`} className="font-semibold text-accent underline decoration-accent/40 underline-offset-4">
          {soonLabel}
        </Link>
      </p>
    </section>
  );
}

function MapLoading() {
  const label =
    typeof document !== "undefined" && document.documentElement.lang === "hy"
      ? "Քարտեզը բեռնվում է…"
      : "The map is loading…";

  return (
    <div
      role="status"
      className="grid h-[28rem] place-items-center rounded-3xl bg-bg-deep font-serif text-lg text-ink-soft sm:h-[34rem]"
    >
      {label}
    </div>
  );
}

function ClosedMarks() {
  return (
    <svg viewBox="0 0 220 80" className="mx-auto h-16 w-52 text-accent" aria-hidden="true">
      <path d="M16 58c28-24 48-24 70-6 18 16 36 18 62 2 16-10 32-10 56 6" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
      <path d="M28 66c24-16 42-14 62 0 16 12 34 12 54-2 14-10 28-8 48 8" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.3" />
      {[
        [70, 40],
        [112, 28],
        [154, 36],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="7" fill="currentColor" />
          <circle cx={cx} cy={cy} r="2.4" fill="#F6F1E7" />
        </g>
      ))}
    </svg>
  );
}
