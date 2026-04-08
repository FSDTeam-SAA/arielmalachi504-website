"use client";

import { useLanguageStore } from "@/store/language.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

export default function MainProviders({ children }: { children: ReactNode }) {
  // important: useState ensures QueryClient is not recreated on every render
  const [queryClient] = useState(() => new QueryClient());
  const { language, dir } = useLanguageStore();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
