"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonStar,Sun } from "lucide-react";
import { Button } from "../components/ui/moving-border";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 h-full rounded-md bg-gray-200 dark:bg-gray-800 text-sm flex items-center justify-center cursor-pointer"
    >
     {theme === "dark" ?<Sun /> : <MoonStar /> } 
    </button>
  );
}
