"use client";

import { useTranslations } from "next-intl";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { Button } from "@/components/ui/moving-border";
import { useRouter, usePathname } from "next/navigation";

export default function HomePage() {
  const t = useTranslations("homepage");
  const q = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname)
  const locale = pathname.split("/")[1] || "en";

  return (
    <main className="p-8 bg-white flex  justify-center dark:bg-black text-black dark:text-white min-h-screen">
      {/* <h1 className="text-3xl font-bold">{t("welcome")}</h1>
      <p>{t("greeting")}</p> */}
      <div className="mt-20">
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip text={`${t("headline")}`} words={t.raw("flip")} />
        </motion.div>
        <div className="mt-10 text-center text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          <TextGenerateEffect words={t("subHeadline")} />
        </div>

        <div className="flex items-center justify-center mt-4 max-w-5xl">
          <Button className="hover:scale-110" onClick={() => router.push(`/${locale}/profile`)}>{q("getStarted")}</Button>
        </div>
      </div>
    </main>
  );
}
