import { useLanguageStore } from "@/store/language.store";
import { en } from "./en";
import { he } from "./he";

export const translations = {
  en,
  he,
};

export type Locale = keyof typeof translations;
export type Dictionary = typeof en;

export const useTranslation = () => {
  const { language } = useLanguageStore();
  const t = translations[language];
  return { t, language };
};
