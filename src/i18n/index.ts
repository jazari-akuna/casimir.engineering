import en from './en.json';
import fr from './fr.json';

export const languages = {
  en: { translations: en, name: 'English', flag: '🇬🇧' },
  fr: { translations: fr, name: 'Français', flag: '🇫🇷' }
} as const;

export type Lang = keyof typeof languages;

export function getTranslations(lang: Lang) {
  return languages[lang].translations;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'fr' : 'en';
}

export function getLanguageInfo(lang: Lang) {
  return languages[lang];
}
