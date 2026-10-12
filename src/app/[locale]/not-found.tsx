import Link from "next/link";
import { locale as localeParam } from "next/root-params";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/locales";

export default async function NotFound() {
  const value = await localeParam();
  const locale = isLocale(value) ? value : "hy";
  const copy = getDictionary(locale).notFound;

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="display-type text-5xl text-accent">{copy.title}</h1>
      <p className="mt-4 font-serif text-lg text-ink-soft">{copy.body}</p>
      <Link href={`/${locale}`} className="btn mt-8">
        {copy.home}
      </Link>
    </div>
  );
}
