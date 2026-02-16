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
// import { Button } from "@/components/ui/moving-border";
import { Send ,Trash } from "lucide-react";
import Image from "next/image";
export default function HomePage() {
  const t = useTranslations("homepage");
  const p = useTranslations("profile");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ id: string; role: string; content: string }>
  >([]);

  const responseRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the AI response when generated
  useEffect(() => {
    if (responseText && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responseText]);

  // Generate AI response for selected profile or user message
  const generate = async (cardMessage?: string) => {
  setLoading(true);
  setResponseText("");

  // Scroll to loader immediately
  if (responseRef.current) {
    responseRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const finalMessage = cardMessage || userMessage;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        messages: finalMessage
          ? [{ role: "user", content: finalMessage }]
          : [],
      }),
    });

    const data = await res.json();

    setResponseText(data.reply || "No response received.");

    setChatHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: finalMessage || "",
      },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "No response received.",
      },
    ]);

    setUserMessage("");
  } catch (err) {
    console.error(err);
    setResponseText("Failed to generate response.");
  } finally {
    setLoading(false);
  }
};

const clearChat = () => {
  setChatHistory([]); // Clear chat history
  setResponseText(""); // Optional: clear current response
  setUserMessage(""); // Optional: clear input

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  // console.log("chathistory",chatHistory)
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
      <div className="mt-3">
        <div className="flex justify-center mb-20 rounded-full">
                        <Image
                          src="/logo.png"       // Place your logo in public/logo.png
                          alt="Logo"
                          width={150}           // Adjust size as needed
                          height={150}
                          className="object-contain"
                          priority               // Loads logo quickly
                        />
                      </div>
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
          <LayoutTextFlip text={`${t("headline")}`} />
        </motion.div>

        <div className="flex items-center justify-center">
          <EncryptedText text="By Seynabou Gueye" />
        </div>

        <div className="mt-10 text-center text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          <TextGenerateEffect words={t("subHeadline")} className="text-2xl" />
        </div>

        {/* Cards Grid */}
        <div className="lg:ml-60 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-3 md:gap-4 mt-4">
          <MovingCard
            className="hover:scale-110 cursor-pointer sm:aspect-square"
            onClick={() => generate(p("starter.messageone"))}
          >
            <div className="flex flex-col">
              <span>{p("starter.messageone")}</span>
            </div>
          </MovingCard>

          <MovingCard
            className="hover:scale-110 cursor-pointer sm:aspect-square"
            onClick={() => generate(p("starter.messagetwo"))}
          >
            <div className="flex flex-col">
              <span>{p("starter.messagetwo")}</span>
            </div>
          </MovingCard>

          <MovingCard
            className="hover:scale-110 cursor-pointer sm:aspect-square"
            onClick={() => generate(p("starter.messagethree"))}
          >
            <div className="flex flex-col">
              <span>{p("starter.messagethree")}</span>
            </div>
          </MovingCard>

          <MovingCard
            className="hover:scale-110 cursor-pointer sm:aspect-square"
            onClick={() => generate(p("starter.messagefour"))}
          >
            <div className="flex flex-col">
              <span>{p("starter.messagefour")}</span>
            </div>
          </MovingCard>
        </div>

        {/* Loader and Generated Response */}
        
        {chatHistory.length > 0 && (
          <div className="mt-4 max-w-full md:mx-5 lg:mx-40 flex flex-col gap-3">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 rounded-lg whitespace-pre-wrap wrap-break-words ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none max-w-xs"
                      : "bg-gray-200 dark:bg-slate-800 text-black dark:text-white rounded-bl-none w-full max-w-3xl"
                  }`}
                >
                  <TextGenerateEffect words={msg.content} className="text-sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          ref={responseRef}
          className="mt-8 flex max-w-full md:mx-5 lg:mx-40 items-center justify-center"
        >
          {loading && (
            <div className="text-blue-500 animate-pulse text-sm flex items-center gap-2">
              Generating response <LoaderOne />
            </div>
          )}
          {/* {!loading && responseText && (
            <TextGenerateEffect words={responseText} className="text-md" />
          )} */}
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
              className="mt-2 px-2 py-5 bg-blue-600 text-white rounded-md hover:bg-blue-800 cursor-pointer hover:-translate-y-1.5"
              onClick={() => generate()}
              disabled={!userMessage.trim()}
            >
              <Send />
            </button>
            <button
              className="mt-2 px-2 py-5 bg-red-500 text-white rounded-md hover:bg-red-800 cursor-pointer hover:-translate-y-1.5"
              onClick={clearChat} // <-- Add this

            >
              <Trash />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
