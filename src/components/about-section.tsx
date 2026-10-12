import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";
import { team } from "@/content/team";

const tones = ["#7A1B34", "#8E3048", "#641428", "#A24B55"];

type AboutSectionProps = {
  locale: Locale;
  about: Dictionary["about"];
};

export function AboutSection({ locale, about }: AboutSectionProps) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-accent">{about.eyebrow}</p>
        <h2 className="display-type mt-2 text-5xl text-accent sm:text-6xl">{about.title}</h2>
        <p className="mt-6 border-s-2 border-accent ps-4 font-serif text-lg text-ink">{about.award}</p>
        <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">{about.body}</p>
      </div>

      <div className="mt-12">
        <h3 className="font-serif text-2xl">{about.teamTitle}</h3>
        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {team.map((member, index) => (
            <li key={member.id} className="team-card">
              <div className="mx-auto size-28 overflow-hidden rounded-full" style={{ background: tones[index] }}>
                {member.imageSrc ? (
                  <Image
                    src={member.imageSrc}
                    alt=""
                    width={112}
                    height={112}
                    className="size-full object-cover"
                  />
                ) : (
                  <Portrait />
                )}
              </div>
              <p className="mt-4 font-serif text-lg">{member.name[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <svg viewBox="0 0 112 112" className="size-full" aria-hidden="true">
      <circle cx="56" cy="44" r="16" fill="#F6F1E7" />
      <path d="M28 96c4-18 14-28 28-28s24 10 28 28" fill="#F6F1E7" />
    </svg>
  );
}
