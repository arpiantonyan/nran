import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonList } from "@/components/coming-soon-list";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.soon.title,
    description: dict.soon.intro,
    alternates: {
      canonical: `/${locale}/coming-soon`,
      languages: {
        hy: "/hy/coming-soon",
        en: "/en/coming-soon",
      },
    },
  };
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <ComingSoonList soon={getDictionary(locale).soon} />;
}
