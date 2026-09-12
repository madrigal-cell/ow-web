import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Casos (Trabajos). Un fichero Markdown por caso e idioma:
 *   src/content/casos/es/<slug>.md  y  src/content/casos/en/<slug>.md
 * Comparten `slug`; el cuerpo lleva Reto / Qué hicimos / Resultado.
 */
const casos = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/casos',
    // id = 'es/<slug>' | 'en/<slug>' (el mismo slug existe en los dos idiomas)
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      lang: z.enum(['es', 'en']),
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

export const collections = { casos };
