import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const byLangId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');
const lang = z.enum(['es', 'en']);

/**
 * Casos (Trabajos). Un Markdown por caso e idioma: casos/es/<slug>.md y casos/en/<slug>.md.
 * Comparten `slug`; el cuerpo lleva Reto / Qué hicimos / Resultado.
 */
const casos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casos', generateId: byLangId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      lang,
      client: z.string(),
      agency: z.string().optional(),
      type: z.enum(['evento', 'marca', 'institucional', 'foto']),
      year: z.number().int().optional(),
      vimeoId: z.string().optional(),
      duration: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Color del hueco mientras no hay imagen de portada. */
      coverTone: z.enum(['accent', 'ink', 'paper']).default('ink'),
      gallery: z.array(image()).default([]),
      deliverables: z.array(z.string()).default([]),
      lead: z.string(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      /** true = datos de ejemplo, pendientes de confirmar. */
      pending: z.boolean().default(false),
    }),
});

/** Servicios: servicios/es/<slug>.md y servicios/en/<slug>.md, unidos por `key`. */
const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios', generateId: byLangId }),
  schema: z.object({
    key: z.enum(['events', 'brand', 'corporate']),
    lang,
    title: z.string(),
    /** Titular H1 orientado a la búsqueda objetivo. */
    headline: z.string(),
    lead: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    /** Qué incluye. */
    items: z.array(z.string()),
    /** Tipo de caso relacionado. */
    caseType: z.enum(['evento', 'marca', 'institucional', 'foto']),
    order: z.number().default(99),
  }),
});

/** Equipo: un fichero por persona, con el cargo en los dos idiomas. */
const equipo = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/equipo' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.object({ es: z.string(), en: z.string() }),
      photo: image().optional(),
      founder: z.boolean().default(false),
      order: z.number().default(99),
      linkedin: z.string().url().optional(),
      pending: z.boolean().default(false),
    }),
});

/** Testimonios de agencias, con la cita en los dos idiomas. */
const testimonios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/testimonios' }),
  schema: z.object({
    quote: z.object({ es: z.string(), en: z.string() }),
    name: z.string(),
    role: z.object({ es: z.string(), en: z.string() }),
    agency: z.string(),
    order: z.number().default(99),
    pending: z.boolean().default(false),
  }),
});

export const collections = { casos, servicios, equipo, testimonios };
