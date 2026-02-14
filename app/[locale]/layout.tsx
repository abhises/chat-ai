"use client";

import { usePathname } from "next/navigation";
import { LocaleProvider } from "@/components/locale-provider";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";
import Header from "@/components/Header";

const LOCALES: Record<string, any> = { en, fr, de };

interface Props {
  children: React.ReactNode;
}

export default function LocaleLayout({ children }: Props) {
  const pathname = usePathname(); // e.g., /fr/page
  const locale = pathname.split("/")[1] || "en";
  const messages = LOCALES[locale] || LOCALES["en"];

  return (
    <LocaleProvider locale={locale} messages={messages} timeZone="utc">
      <Header />

      {children}
    </LocaleProvider>
  );
}
