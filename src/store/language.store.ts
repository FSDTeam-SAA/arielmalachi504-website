import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "he";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  dir: "ltr" | "rtl";
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "he",
      dir: "rtl",
      setLanguage: (language: Language) =>
        set({
          language,
          dir: language === "he" ? "rtl" : "ltr",
        }),
    }),
    {
      name: "language-storage",
    },
  ),
);
