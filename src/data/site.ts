// Datos fijos de la empresa. Una sola fuente para pie, contacto, JSON-LD y llms.txt.
export const site = {
  name: 'On White',
  legalName: 'On White Makers, S.L.',
  cif: 'B05300363',
  url: 'https://owmakers.com',
  email: 'hola@owmakers.com',
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
  /** Showreel de la home. vimeoId en null hasta que exista el Showreel 2026. */
  showreel: {
    vimeoId: null as string | null,
    year: 2026,
    duration: '00:48',
  },
} as const;
