"use client";
import { usePathname } from "next/navigation";
import { AIProfileChat } from "@/components/AIProfileChat";
import { useTranslations } from "next-intl";

const Profile = () => {
  const pathname = usePathname();
  const t=useTranslations("profile")
  //   console.log(pathname)

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-start p-8">
      <p className="text-center mb-8 max-w-2xl">
        {t("header")}
      </p>
      <AIProfileChat />
    </main>
  );
};

export default Profile;
