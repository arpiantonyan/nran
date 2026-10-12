import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/dictionaries";
import { display, sans, serif } from "@/lib/fonts";
import { isLocale } from "@/lib/locales";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export function generateStaticParams() {
  return [{ locale: "hy" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.siteName,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    alternates: {
      languages: {
        hy: "/hy",
        en: "/en",
        "x-default": "/hy",
      },
    },
    openGraph: {
      title: dict.meta.siteName,
      description: dict.meta.description,
      locale: locale === "hy" ? "hy_AM" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#content">
          {dict.skip}
        </a>
        <SiteHeader locale={locale} siteName={dict.meta.siteName} labels={dict.nav} />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} siteName={dict.meta.siteName} footer={dict.footer} nav={dict.nav} />
      </body>
    </html>
  );
}
