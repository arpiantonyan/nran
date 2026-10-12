"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/locales";
import type { NavLabels } from "@/lib/types";

type SiteHeaderProps = {
  locale: Locale;
  siteName: string;
  labels: NavLabels;
};

export function SiteHeader({ locale, siteName, labels }: SiteHeaderProps) {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;

  function closeMenu() {
    setOpenPath(null);
  }

  function toggleMenu() {
    setOpenPath((current) => (current === pathname ? null : pathname));
  }

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const home = `/${locale}`;
  const links = [
    { href: `${home}#about`, label: labels.about },
    { href: `${home}#map`, label: labels.map },
    { href: `${home}/coming-soon`, label: labels.soon, current: pathname === `${home}/coming-soon` },
  ];

  function localeHref(nextLocale: Locale) {
    const rest = pathname.replace(/^\/(hy|en)/, "") || "";
    return `/${nextLocale}${rest}${hash}`;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="h-1 bg-accent" />
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link href={home} className="flex min-h-11 min-w-0 items-center gap-2.5 text-accent">
          <Logo className="size-9 shrink-0" />
          <span className="display-type truncate text-2xl leading-none sm:text-3xl">{siteName}</span>
        </Link>

        <nav className="ms-auto hidden items-center gap-1 md:flex" aria-label={labels.primary}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              onClick={closeMenu}
              className="rounded-full px-3 py-2 text-[0.98rem] font-semibold text-ink hover:text-accent aria-[current=page]:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-2">
          <nav aria-label={labels.language} className="hidden rounded-full border border-line bg-surface p-1 md:flex">
            {(["hy", "en"] as const).map((item) => (
              <Link
                key={item}
                href={localeHref(item)}
                hrefLang={item}
                lang={item}
                aria-current={locale === item ? "true" : undefined}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2.5 text-sm font-semibold text-ink-soft aria-[current=true]:bg-accent aria-[current=true]:text-white"
              >
                {item === "hy" ? "Հայ" : "EN"}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "site-menu" : undefined}
            onClick={toggleMenu}
          >
            <span className="sr-only">{menuOpen ? labels.closeMenu : labels.openMenu}</span>
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="site-menu" className="border-t border-line px-5 py-3 md:hidden" aria-label={labels.primary}>
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center font-semibold aria-[current=page]:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div role="group" aria-label={labels.language} className="mt-2 flex gap-2 border-t border-line pt-3">
            {(["hy", "en"] as const).map((item) => (
              <Link
                key={item}
                href={localeHref(item)}
                hrefLang={item}
                lang={item}
                aria-current={locale === item ? "true" : undefined}
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-semibold aria-[current=true]:border-accent aria-[current=true]:bg-accent aria-[current=true]:text-white"
              >
                {item === "hy" ? "Հայերեն" : "English"}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  );
}
