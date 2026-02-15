"use client";

import { useTranslations } from "next-intl";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { MovingCard } from "@/components/MovingCard";
import { useState, useRef, useEffect } from "react";
import { LoaderOne } from "@/components/ui/loader";

export default function HomePage() {
  const t = useTranslations("homepage");
  const p = useTranslations("profile");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [userMessage, setUserMessage] = useState("");
const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; content: string }[]>([]);

  const responseRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the AI response when generated
  useEffect(() => {
    if (responseText && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responseText]);

  // Generate AI response for selected profile or user message
  const generate = async (cardProfile?: Record<string, any>) => {
    setLoading(true);
    setResponseText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          profile: cardProfile || {},
          messages: userMessage
            ? [{ role: "user", content: userMessage }]
            : [],
        }),
      });

      const data = await res.json();
      setResponseText(data.reply || "No response received.");
      setUserMessage("");
    } catch (err) {
      console.error(err);
      setResponseText("Failed to generate response.");
    } finally {
      setLoading(false);
    }
  };

  // Explicitly read translation strings to fix INSUFFICIENT_PATH error
  const getProfileFromCard = (key: string) => {
    switch (key) {
      case "canada":
        return {
          title: p("canada.title"),
          type: p("canada.type"),
          device: p("canada.device"),
          language: p("canada.language"),
          availability: p("canada.availability"),
        };
      case "senegal":
        return {
          title: p("senegal.title"),
          age: p("senegal.age"),
          device: p("senegal.device"),
          language: p("senegal.language"),
          availability: p("senegal.availability"),
          budget: p("senegal.budget"),
        };
      case "france":
        return {
          title: p("france.title"),
          type: p("france.type"),
          device: p("france.device"),
          language: p("france.language"),
          availability: p("france.availability"),
        };
      case "germany":
        return {
          title: p("germany.title"),
          type: p("germany.type"),
          device: p("germany.device"),
          language: p("germany.language"),
          availability: p("germany.availability"),
        };
      default:
        return {};
    }
  };

  return (
    <main className="p-8 bg-white flex justify-center dark:bg-black text-black dark:text-white min-h-screen">
      <div className="mt-15">
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip text={`${t("headline")}`} />
        </motion.div>

        <div className="flex items-center justify-center">
          <EncryptedText text="By Seynabou Gueye" />
        </div>

        <div className="mt-10 text-center text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          <TextGenerateEffect words={t("subHeadline")} />
        </div>

        {/* Cards Grid */}
        <div className="lg:ml-60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mt-4">
          <MovingCard
            className="hover:scale-110 cursor-pointer aspect-square"
            onClick={() => generate(getProfileFromCard("canada"))}
          >
            <div className="flex flex-col">
              <span>🇨🇦 {p("canada.title")}</span>
              <ul>
                <li className="text-center">{p("canada.type")}</li>
                <li className="text-center">{p("canada.device")}</li>
                <li className="text-center">{p("canada.language")}</li>
                <li className="text-center">{p("canada.availability")}</li>
              </ul>
            </div>
          </MovingCard>

          <MovingCard
            className="hover:scale-110 cursor-pointer aspect-square"
            onClick={() => generate(getProfileFromCard("senegal"))}
          >
            <div className="flex flex-col">
              <span>🇸🇳 {p("senegal.title")}</span>
              <ul>
                <li className="text-center">{p("senegal.age")}</li>
                <li className="text-center">{p("senegal.device")}</li>
                <li className="text-center">{p("senegal.language")}</li>
                <li className="text-center">{p("senegal.availability")}</li>
                <li className="text-center">{p("senegal.budget")}</li>
              </ul>
            </div>
          </MovingCard>

          <MovingCard
            className="hover:scale-110 cursor-pointer aspect-square"
            onClick={() => generate(getProfileFromCard("france"))}
          >
            <div className="flex flex-col">
              <span>🇫🇷 {p("france.title")}</span>
              <ul>
                <li className="text-center">{p("france.type")}</li>
                <li className="text-center">{p("france.device")}</li>
                <li className="text-center">{p("france.language")}</li>
                <li className="text-center">{p("france.availability")}</li>
              </ul>
            </div>
          </MovingCard>

          <MovingCard
            className="hover:scale-110 cursor-pointer aspect-square"
            onClick={() => generate(getProfileFromCard("germany"))}
          >
            <div className="flex flex-col">
              <span>🇩🇪 {p("germany.title")}</span>
              <ul>
                <li className="text-center">{p("germany.type")}</li>
                <li className="text-center">{p("germany.device")}</li>
                <li className="text-center">{p("germany.language")}</li>
                <li className="text-center">{p("germany.availability")}</li>
              </ul>
            </div>
          </MovingCard>
        </div>

        {/* Loader and Generated Response */}
        <div
          ref={responseRef}
          className="mt-8 flex max-w-full md:mx-5 lg:mx-40 items-center justify-center"
        >
          {loading && (
            <div className="text-blue-500 animate-pulse text-sm flex items-center gap-2">
              Generating response <LoaderOne />
            </div>
          )}
          {!loading && responseText && (
            <TextGenerateEffect words={responseText} className="text-sm" />
          )}
        </div>

        {/* CHAT TEXTAREA — ONLY SHOW AFTER RESPONSE */}
        {!loading && responseText && (
          <div className="mt-6 max-w-full flex gap-2  md:mx-5 lg:mx-40  items-center">
            <textarea
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:text-white text-sm"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={2}
            />
            <button
              className="mt-2 px-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => generate()}
              disabled={!userMessage.trim()}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
