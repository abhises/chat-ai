import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "../components/ui/moving-border";

export default function Header() {
  return (
   <header className="flex justify-between items-center p-4 bg-white dark:bg-black">
  <h1 className="text-xl font-bold">My App</h1>
  <div className="flex gap-2 items-stretch">
    <Button
      borderRadius="1rem"
      className="text-sm text-black dark:text-white border border-neutral-200 dark:border-slate-800"
    >
      Get Started
    </Button>
    <LanguageSelector />
    <ThemeToggle />
  </div>
</header>

  );
}
