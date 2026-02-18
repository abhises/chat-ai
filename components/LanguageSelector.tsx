"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../components/ui/moving-border";


const languages = [
  { code: "en", label: "En", flag: "🇺🇸" },
  { code: "fr", label: "Fr", flag: "🇫🇷" },
  { code: "de", label: "De", flag: "🇩🇪" },
];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang; // /[locale]/page
    router.push(segments.join("/"));
    setOpen(false); // close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to open dropdown */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 h-full bg-gray-200 dark:bg-gray-800 rounded-md flex items-center gap-1 cursor-pointer text-sm"
      >
        <span>
          {languages.find((l) => pathname.split("/")[1] === l.code)?.flag ||
            "🌐"}
        </span>
        <span>
          {languages.find((l) => pathname.split("/")[1] === l.code)?.label ||
            "Language"}
        </span>
        <svg
          className="w-4 h-4 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md z-10 cursor-pointer">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer"
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
