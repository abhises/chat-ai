"use client";

import { useTranslations } from "next-intl";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";

export default function HomePage() {
  const t = useTranslations("homepage");

  return (
    <main className="p-8 bg-white flex items-center justify-center dark:bg-black text-black dark:text-white min-h-screen">
      {/* <h1 className="text-3xl font-bold">{t("welcome")}</h1>
      <p>{t("greeting")}</p> */}
      <div>
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip text={`${t("headline")}`} words={t.raw("flip")} />
        </motion.div>
        <div className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          <TextGenerateEffect words={t("subHeadline")} />
        </div>
      </div>
    </main>
  );
}
