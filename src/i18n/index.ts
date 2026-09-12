import es from './es.json';
import en from './en.json';
import { defaultLocale, type Locale } from './routes';

export * from './routes';

const dictionaries = { es, en } as const;
export type Dictionary = typeof es;

/** Diccionario completo de un idioma. */
export function dict(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Traductor con interpolación simple: t('work.seeAll', { n: 12 }). */
export function useTranslations(locale: Locale) {
  const d = dict(locale) as unknown as Record<string, Record<string, string>>;
  return function t(key: string, vars?: Record<string, string | number>): string {
    const [group, name] = key.split('.');
    let value = d[group]?.[name] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) value = value.replaceAll(`{${k}}`, String(v));
    }
    return value;
  };
}

/** Idioma actual a partir de Astro.currentLocale (con fallback seguro). */
export function resolveLocale(current: string | undefined): Locale {
  return current === 'en' ? 'en' : 'es';
}

/** Código BCP 47 para <html lang> y hreflang. */
export const htmlLang: Record<Locale, string> = { es: 'es-ES', en: 'en' };
