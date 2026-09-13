/**
 * Datos estructurados (JSON-LD) de la web. Una sola función por tipo de bloque.
 * Google los usa para entender la empresa y las IAs para citarla con datos correctos.
 */
import { site } from '../data/site';
import type { Locale } from '../i18n';

const abs = (p: string) => new URL(p, site.url).href;
export const ORG_ID = `${site.url}/#organization`;
export const LOCAL_ID = `${site.url}/#localbusiness`;
export const SITE_ID = `${site.url}/#website`;

const description: Record<Locale, string> = {
  es: 'Productora audiovisual en Sevilla especializada en eventos corporativos, congresos, spots, contenido de marca y vídeo institucional para agencias de eventos y comunicación.',
  en: 'Video production company in Seville, Spain, specialising in corporate events, conferences, commercials, branded content and corporate video for event and communication agencies.',
};

/** Bloques presentes en todas las páginas. */
export function baseGraph(locale: Locale) {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  };
  return [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: site.name,
      legalName: site.legalName,
      taxID: site.cif,
      url: site.url,
      logo: { '@type': 'ImageObject', url: abs(site.logo) },
      image: abs(site.ogImage),
      description: description[locale],
      email: site.email,
      telephone: site.phone.e164,
      address,
      sameAs: [site.social.linkedin, site.social.instagram, site.social.vimeo],
      contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: site.email, telephone: site.phone.e164, availableLanguage: ['es', 'en'] }],
      knowsAbout: locale === 'es'
        ? ['producción audiovisual', 'eventos corporativos', 'congresos', 'aftermovie', 'streaming', 'spots publicitarios', 'contenido de marca', 'vídeo institucional', 'fotografía de eventos']
        : ['video production', 'corporate events', 'conferences', 'aftermovie', 'live streaming', 'commercials', 'branded content', 'corporate video', 'event photography'],
    },
    {
      '@type': 'LocalBusiness',
      '@id': LOCAL_ID,
      name: site.name,
      url: site.url,
      image: abs(site.ogImage),
      telephone: site.phone.e164,
      email: site.email,
      address,
      areaServed: ['ES', 'PT'],
      priceRange: '€€',
      parentOrganization: { '@id': ORG_ID },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: site.url,
      name: site.name,
      inLanguage: locale === 'es' ? 'es-ES' : 'en',
      publisher: { '@id': ORG_ID },
    },
  ];
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

/** "02:06" → "PT2M6S" */
export function isoDuration(mmss?: string) {
  if (!mmss) return undefined;
  const [m, s] = mmss.split(':').map((n) => parseInt(n, 10));
  return `PT${m || 0}M${s || 0}S`;
}

export function videoObject(o: { name: string; description: string; vimeoId: string; vimeoHash?: string; thumbnail?: string; uploadDate?: string; duration?: string; pageUrl: string }) {
  return {
    '@type': 'VideoObject',
    name: o.name,
    description: o.description,
    thumbnailUrl: [abs(o.thumbnail ?? site.ogImage)],
    uploadDate: o.uploadDate ?? '2024-01-01',
    duration: isoDuration(o.duration),
    embedUrl: `https://player.vimeo.com/video/${o.vimeoId}${o.vimeoHash ? `?h=${o.vimeoHash}` : ``}`,
    contentUrl: `https://vimeo.com/${o.vimeoId}${o.vimeoHash ? `/${o.vimeoHash}` : ``}`,
    url: abs(o.pageUrl),
    publisher: { '@id': ORG_ID },
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
  };
}

export function service(o: { name: string; description: string; pageUrl: string; items: string[]; locale: Locale }) {
  return {
    '@type': 'Service',
    name: o.name,
    description: o.description,
    url: abs(o.pageUrl),
    serviceType: o.items,
    provider: { '@id': ORG_ID },
    areaServed: o.locale === 'es' ? 'España' : 'Spain',
  };
}

export function people(list: { name: string; role: string; photo?: string }[]) {
  return list.map((p) => ({
    '@type': 'Person',
    name: p.name,
    jobTitle: p.role,
    image: p.photo ? abs(p.photo) : undefined,
    worksFor: { '@id': ORG_ID },
  }));
}
