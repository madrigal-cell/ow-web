// Datos fijos de la empresa. Una sola fuente para pie, contacto, JSON-LD y llms.txt.
import showreelPoster from '../assets/showreel-2020.jpg';

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
    linkedin: 'https://www.linkedin.com/company/on-white-makers',
    instagram: 'https://www.instagram.com/owmakers/',
    vimeo: 'https://vimeo.com/owmakers',
  },
  /** Imágenes para datos estructurados y redes. */
  logo: '/img/icon-512.png',
  ogImage: '/img/og-default.jpg',
  /** Showreel de la home. Provisional: Reel 2020 hasta que exista el Showreel 2026 (cambiar vimeoId, year, duration y poster). */
  showreel: {
    vimeoId: '483190847' as string | null,
    year: 2020,
    duration: '01:25',
    date: '2020-11-24',
    title: 'On White Makers · Reel 2020',
    poster: showreelPoster,
  },
} as const;
