"use client";

import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "../components/ui/moving-border";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const locale = pathname.split("/")[1] || "en";

  return (
    <header className="flex justify-between items-center p-6 bg-white dark:bg-black">
      <h1 className="text-xl font-bold">Nabous AI Guide</h1>
      <div className="flex gap-2 items-stretch">
        {pathname === "/en/profile" ? null : (
          <Button
            borderRadius="1rem"
            className="text-sm text-black dark:text-white border border-neutral-200 dark:border-slate-800"
            onClick={() => router.push(`/${locale}/profile`)}
          >
            {t("getStarted")}
          </Button>
        )}

        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
