"use client";

import { usePathname } from "next/navigation";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const english = usePathname().startsWith("/en");

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="display-type text-5xl text-accent">
        {english ? "Something went wrong" : "Ինչ-որ բան խափանվեց"}
      </h1>
      <p className="mt-4 font-serif text-lg text-ink-soft">
        {english ? "This page could not be shown." : "Էջը չհաջողվեց ցույց տալ։"}
      </p>
      <button type="button" className="btn mt-8" onClick={reset}>
        {english ? "Try again" : "Փորձել նորից"}
      </button>
    </div>
  );
}
