"use client";

import { useTranslations } from "next-intl";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
// import { Button } from "@/components/ui/moving-border";
import { useRouter, usePathname } from "next/navigation";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { MovingCard } from "@/components/MovingCard";

export default function HomePage() {
  const t = useTranslations("homepage");
  const q = useTranslations("header");
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname)
  const locale = pathname.split("/")[1] || "en";
  const generateKey = () => {};

  return (
    <main className="p-8 bg-white flex  justify-center dark:bg-black text-black dark:text-white min-h-screen">
      {/* <h1 className="text-3xl font-bold">{t("welcome")}</h1>
      <p>{t("greeting")}</p> */}
      <div className="mt-15">
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip
            text={`${t("headline")}`}
            // words={t.raw("flip")}
          />
        </motion.div>
        <div className="flex items-center justify-center">
          <EncryptedText text="By Seynabou Gueye" />
        </div>

        <div className="mt-10 text-center text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          <TextGenerateEffect words={t("subHeadline")} />
        </div>

        <div className="flex items-center justify-center mt-4 ">
          {/* <Button className="hover:scale-110" onClick={() => router.push(`/${locale}/profile`)}>{q("getStarted")}</Button> */}
          {/* <EncryptedText text={t.raw("description")}/> */}
          <div className="grid grid-cols-4 gap-4">
            <MovingCard
              className="hover:scale-120 cursor-pointer h-40 w-50"
              onClick={() => generateKey()}
            >
              Test
            </MovingCard>
            <MovingCard
              className="hover:scale-120 cursor-pointer"
              onClick={() => generateKey()}
            >
              Test
            </MovingCard>
            <MovingCard
              className="hover:scale-120 cursor-pointer"
              onClick={() => generateKey()}
            >
              Test
            </MovingCard>
            <MovingCard
              className="hover:scale-120 cursor-pointer"
              onClick={() => generateKey()}
            >
              Test
            </MovingCard>
          </div>
        </div>
      </div>
    </main>
  );
}
