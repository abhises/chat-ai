"use client";

import { useState } from "react";
import { Button } from "@/components/ui/moving-border";
import { useTranslations } from "next-intl";

export function ProfileForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [device, setDevice] = useState("");
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const t =useTranslations("profile")

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder={`${t("location")}`}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder={`${t("hours")}`}
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder={`${t("device")}`}
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder={`${t("skill")}`}
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder={`${t("income")}`}
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="p-2 border rounded-md"
      />

      <Button
        borderRadius="1rem"
        onClick={() =>
          onSubmit({ location, hours, device, skills, goal })
        }
      >
        {`${t("button1")}`}
      </Button>
    </div>
  );
}
