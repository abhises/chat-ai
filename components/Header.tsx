"use client";

import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "../components/ui/moving-border";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const locale = pathname.split("/")[1] || "en";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-white dark:bg-black border-b-3 border-b-gray-200 dark:border-none">
      <h1 className="text-xl font-bold">Nabous AI Guide</h1>
      <div className="hidden sm:flex gap-2 ">
        {/* {pathname === "/en/profile" ? null : (
          <Button
            borderRadius="1rem"
            className="text-sm text-black dark:text-white border border-neutral-200 dark:border-slate-800 hover:scale-105"
            onClick={() => router.push(`/${locale}/profile`)}
          >
            {t("getStarted")}
          </Button>
        )} */}

        <LanguageSelector />
        <ThemeToggle />
      </div>
      <button
        className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-800 cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg
          className="w-6 h-6 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-70 bg-white dark:bg-black shadow-lg z-50 flex flex-col p-6 gap-4 transition-transform duration-300">
          {/* Close button */}

          {/* Sidebar items */}

          <div className="flex items-start gap-1">
            {/* {pathname === "/en/profile" ? null : (
              <Button
                borderRadius="1rem"
                className="text-sm text-black dark:text-white border border-neutral-200 dark:border-slate-800 hover:scale-105 w-full"
                onClick={() => {
                  router.push(`/${locale}/profile`);
                  setMobileMenuOpen(false);
                }}
              >
                {t("getStarted")}
              </Button>
            )} */}
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      )}
    </header>
  );
}
