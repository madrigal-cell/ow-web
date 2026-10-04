import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';

/**
 * Casos de un idioma: todos y los destacados ya ordenados por `order`.
 * Lo usan las tres presentaciones de Trabajos de la home (lista, índice y bandas).
 */
export async function featuredCases(locale: Locale, limit = 8) {
  const all = await getCollection('casos', ({ data }) => data.lang === locale);
  const featured = all
    .filter((c) => c.data.featured)
    .sort((a, b) => a.data.order - b.data.order)
    .slice(0, limit);
  return { all, featured };
}

export type Caso = Awaited<ReturnType<typeof featuredCases>>['all'][number];
