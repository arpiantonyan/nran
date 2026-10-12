import { notFound } from "next/navigation";
import { AboutSection } from "@/components/about-section";
import { Hero } from "@/components/hero";
import { MapSection } from "@/components/map-section";
import { getDictionary } from "@/lib/dictionaries";
import { loadDialects, localizeDialect } from "@/lib/dialects";
import { isLocale } from "@/lib/locales";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const catalog = loadDialects();
  const dialects =
    catalog.status === "ready"
      ? catalog.dialects.map((dialect) => localizeDialect(dialect, locale))
      : [];

  return (
    <>
      <Hero locale={locale} hero={dict.hero} />
      <AboutSection locale={locale} about={dict.about} />
      <MapSection
        locale={locale}
        eyebrow={dict.map.eyebrow}
        title={dict.map.title}
        copy={dict.map}
        status={catalog.status}
        dialects={dialects}
        soonLabel={dict.map.next}
      />
    </>
  );
}
