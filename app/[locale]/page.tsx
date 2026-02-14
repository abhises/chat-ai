"use client";

import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="p-8 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold">{t("welcome")}</h1>
      <p>{t("greeting")}</p>
    </main>
  );
}
