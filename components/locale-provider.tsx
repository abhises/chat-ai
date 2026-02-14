"use client";

import { IntlProvider } from "next-intl";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  messages: Record<string, string>;
  locale: string;
}

export function LocaleProvider({ children, messages, locale }: Props) {
  return <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>;
}
