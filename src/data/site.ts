// Datos fijos de la empresa. Una sola fuente para pie, contacto, JSON-LD y llms.txt.
import showreelPoster from '../assets/showreel-2026.jpg';

export const site = {
  name: 'On White',
  legalName: 'On White Makers, S.L.',
  cif: 'B05300363',
  url: 'https://owmakers.com',
  email: 'hola@owmakers.com',
  /** Buzón que recibe los formularios de la web. */
  formsEmail: 'produccion@owmakers.com',
  phone: { display: '955 295 612', href: 'tel:+34955295612', e164: '+34955295612' },
  mobile: { display: '678 641 862', href: 'tel:+34678641862', e164: '+34678641862' },
  whatsapp: 'https://wa.me/34678641862',
  address: {
    street: 'Calle Barrena 5',
    postalCode: '41008',
    city: 'Sevilla',
    region: 'Andalucía',
    country: 'ES',
  },
  social: {
    linkedin: 'https://es.linkedin.com/company/onwhite-makers',
    instagram: 'https://www.instagram.com/onwhiteproductora/',
    vimeo: 'https://vimeo.com/owmakers',
  },
  /** Imágenes para datos estructurados y redes. */
  logo: '/img/icon-512.png',
  ogImage: '/img/og-default.jpg',
  /** Showreel de la home (para cambiarlo: vimeoId, year, duration, date, title y poster). */
  showreel: {
    vimeoId: '1232333762' as string | null,
    year: 2026,
    duration: '00:41',
    date: '2026-10-02',
    title: 'On White Makers · Reel 2026',
    poster: showreelPoster,
  },
} as const;
