"use client";

import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { Button } from "@/components/ui/moving-border";
import { usePathname } from "next/navigation";
import { getSystemPrompt } from "@/lib/systemPrompt";
import { LoaderOne } from "@/components/ui/loader";
import { useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function AIProfileChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("profile");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const systemPrompt = getSystemPrompt(locale);

  const handleProfileSubmit = async (profile: any) => {
    const newMessages: Message[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: JSON.stringify(profile) },
    ];

    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Failed to get response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      {/* If loading, show loader instead of form or previous messages */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <LoaderOne />
          <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
            Generating plan...
          </p>
        </div>
      ) : messages.length === 0 ? (
        <ProfileForm onSubmit={handleProfileSubmit} />
      ) : (
        <div className="flex flex-col gap-4">
          {messages
            .filter((msg) => msg.role !== "system")
            .map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-md max-w-full wrap-break-words whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end"
                    : "bg-gray-200 dark:bg-gray-800 self-start text-black dark:text-white"
                }`}
              >
                {msg.content}
              </div>
            ))}
        </div>
      )}

      {/* Reset / Ask new question button */}
      {messages.length > 0 && !loading && (
        <div className="mt-4 flex justify-center">
          <Button
            borderRadius="1rem"
            onClick={() => setMessages([])}
            className="text-sm text-black dark:text-white border border-neutral-200 dark:border-slate-800"
          >
            {`${t("button2")}`}
          </Button>
        </div>
      )}
    </div>
  );
}
