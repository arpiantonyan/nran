"use client";

import { useEffect, useRef, useState } from "react";
import type { DialectPin, MapCopy } from "@/lib/types";

type DialectCardProps = {
  dialect: DialectPin;
  copy: MapCopy;
  onClose: () => void;
};

export function DialectCard({ dialect, copy, onClose }: DialectCardProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const titleId = `dialect-${dialect.id}-title`;

  useEffect(() => {
    closeRef.current?.focus();
  }, [dialect.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setAudioError(true);
    }
  }

  return (
    <article
      role="dialog"
      aria-labelledby={titleId}
      className="absolute inset-x-3 bottom-3 z-[800] max-h-[70%] overflow-auto rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow)] sm:inset-x-auto sm:end-3 sm:top-3 sm:bottom-auto sm:w-[22rem]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-accent">{copy.testBadge}</p>
          <h3 id={titleId} className="mt-1 font-serif text-2xl">
            {dialect.name}
          </h3>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line"
          onClick={onClose}
        >
          <span className="sr-only">{copy.closeCard}</span>
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>
      </div>

      <p className="mt-3 text-sm text-ink-soft">
        <span className="font-semibold text-ink">{copy.region}. </span>
        {dialect.region}
      </p>
      <p className="mt-3 font-serif text-lg leading-relaxed">{dialect.description}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">{copy.speaker}. </span>
        {dialect.speaker}
      </p>

      <div className="mt-4">
        {dialect.audioAvailable ? (
          <>
            <button
              type="button"
              className="btn"
              aria-pressed={playing}
              onClick={togglePlayback}
            >
              <PlayIcon playing={playing} />
              {playing ? copy.pause : copy.play}
            </button>
            <audio
              ref={audioRef}
              src={dialect.audioSrc}
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => setAudioError(true)}
            />
            {audioError ? <p className="mt-2 text-sm text-accent">{copy.audioError}</p> : null}
          </>
        ) : (
          <p className="text-sm text-accent">{copy.audioMissing}</p>
        )}
      </div>
    </article>
  );
}

function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
      {playing ? (
        <path d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" />
      ) : (
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      )}
    </svg>
  );
}
