// Mapa de rutas ES ↔ EN. Es la única fuente de verdad para nav, hreflang y selector de idioma.
// Si se añade una página, se añade aquí su pareja de rutas.
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Slugs de las páginas de servicio por clave (coinciden con `key` en src/content/servicios). */
export const serviceSlugs = {
  events:    { es: 'eventos-y-congresos', en: 'events' },
  brand:     { es: 'contenido-de-marca',  en: 'brand-content' },
  corporate: { es: 'institucional',       en: 'corporate' },
} as const;
export type ServiceKey = keyof typeof serviceSlugs;

export const routes = {
  home:             { es: '/',                                en: '/en/' },
  work:             { es: '/trabajos/',                       en: '/en/work/' },
  services:         { es: '/servicios/',                      en: '/en/services/' },
  servicesEvents:   { es: `/servicios/${serviceSlugs.events.es}/`,    en: `/en/services/${serviceSlugs.events.en}/` },
  servicesBrand:    { es: `/servicios/${serviceSlugs.brand.es}/`,     en: `/en/services/${serviceSlugs.brand.en}/` },
  servicesCorporate:{ es: `/servicios/${serviceSlugs.corporate.es}/`, en: `/en/services/${serviceSlugs.corporate.en}/` },
  agencies:         { es: '/para-agencias/',                  en: '/en/for-agencies/' },
  about:            { es: '/nosotros/',                       en: '/en/about/' },
  contact:          { es: '/contacto/',                       en: '/en/contact/' },
  legal:            { es: '/aviso-legal/',                    en: '/en/legal-notice/' },
  privacy:          { es: '/privacidad/',                     en: '/en/privacy/' },
  cookies:          { es: '/cookies/',                        en: '/en/cookies/' },
  thanks:           { es: '/gracias/',                        en: '/en/thanks/' },
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

/** Ruta de un servicio por clave. */
export function servicePath(key: ServiceKey, locale: Locale): string {
  return `${routes.services[locale]}${serviceSlugs[key][locale]}/`;
}

/** Devuelve la ruta equivalente en el otro idioma, o la home del otro idioma si no hay pareja. */
export function alternatePath(current: string, from: Locale, to: Locale): string {
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][from] === current) return routes[key][to];
  }
  // Casos: /trabajos/<slug>/ ↔ /en/work/<slug>/ (mismo slug en ambos idiomas)
  const workPrefix = routes.work[from];
  if (current.startsWith(workPrefix)) {
    return routes.work[to] + current.slice(workPrefix.length);
  }
  return routes.home[to];
}
