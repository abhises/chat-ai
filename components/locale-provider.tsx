"use client";

import { IntlProvider } from "next-intl";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  messages: Record<string, string>;
  locale: string;
    timeZone?: string;

}

export function LocaleProvider({ children, messages, locale, timeZone}: Props) {
  return <IntlProvider locale={locale} messages={messages} timeZone={timeZone}>{children}</IntlProvider>;
}
