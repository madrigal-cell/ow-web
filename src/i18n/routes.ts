// Mapa de rutas ES ↔ EN. Es la única fuente de verdad para nav, hreflang y selector de idioma.
// Si se añade una página, se añade aquí su pareja de rutas.
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export const routes = {
  home:             { es: '/',                                en: '/en/' },
  work:             { es: '/trabajos/',                       en: '/en/work/' },
  services:         { es: '/servicios/',                      en: '/en/services/' },
  servicesEvents:   { es: '/servicios/eventos-y-congresos/',  en: '/en/services/events/' },
  servicesBrand:    { es: '/servicios/contenido-de-marca/',   en: '/en/services/brand-content/' },
  servicesCorporate:{ es: '/servicios/institucional/',        en: '/en/services/corporate/' },
  agencies:         { es: '/para-agencias/',                  en: '/en/for-agencies/' },
  about:            { es: '/nosotros/',                       en: '/en/about/' },
  contact:          { es: '/contacto/',                       en: '/en/contact/' },
  legal:            { es: '/aviso-legal/',                    en: '/en/legal-notice/' },
  privacy:          { es: '/privacidad/',                     en: '/en/privacy/' },
  cookies:          { es: '/cookies/',                        en: '/en/cookies/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Ruta de una página en un idioma. */
export function path(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

/** Ruta de un caso individual (/trabajos/slug/ · /en/work/slug/). */
export function casePath(slug: string, locale: Locale): string {
  return `${routes.work[locale]}${slug}/`;
}

/** Devuelve la ruta equivalente en el otro idioma, o la home del otro idioma si no hay pareja. */
export function alternatePath(current: string, from: Locale, to: Locale): string {
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][from] === current) return routes[key][to];
  }
  // Casos: /trabajos/<slug>/ ↔ /en/work/<slug>/
  const workPrefix = routes.work[from];
  if (current.startsWith(workPrefix)) {
    return routes.work[to] + current.slice(workPrefix.length);
  }
  return routes.home[to];
}
