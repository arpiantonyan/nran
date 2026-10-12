import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locales";

type SiteFooterProps = {
  locale: Locale;
  siteName: string;
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
};

export function SiteFooter({ locale, siteName, footer, nav }: SiteFooterProps) {
  const home = `/${locale}`;
  const links = [
    { href: `${home}#about`, label: nav.about },
    { href: `${home}#map`, label: nav.map },
    { href: `${home}/coming-soon`, label: nav.soon },
  ];

  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
        <div>
          <p className="display-type text-4xl text-accent">{siteName}</p>
          <p className="mt-2 max-w-sm font-serif text-lg text-ink-soft">{footer.blurb}</p>
        </div>
        <nav aria-label={nav.footer}>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-semibold hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="max-w-xs font-serif text-ink-soft">{footer.award}</p>
      </div>
    </footer>
  );
}
