# Web On White — guía para Claude Code

Lee primero `docs/04-handoff-claude-code.md`. Ahí están el stack, la identidad visual, los textos decididos, la arquitectura de rutas, el modelo de contenido y los requisitos SEO/GEO. `docs/03-decisiones.md` recoge lo ya decidido: no reabrir esas decisiones.

## Reglas del proyecto

- Marca: "On White" en toda la web. "On White Makers, S.L." solo en pie y textos legales.
- Claim ES: "On White. Lo único en blanco es el nombre." · EN: "On White. Black, white and everything in colour."
- CTA único: "Cuéntanos tu proyecto" / "Tell us about your project".
- Tono: directo, irreverente sin pasarse, primera persona del plural. Prohibido: "craft", "storytelling", "contamos historias".
- Diseño: brutalista. Sin radios, líneas de 3 px, un solo acento (#ff4d00). Tokens en `src/styles/tokens.css`; no hardcodear colores ni tamaños en componentes.
- Iconos SVG inline de trazo. Nunca emoji.
- Vídeo siempre embebido de Vimeo dentro de la web. Nunca enlazar fuera para ver un vídeo.
- Rutas ES/EN: añadir siempre la pareja en `src/i18n/routes.ts`. Textos de interfaz en `src/i18n/*.json`.
- Toda página usa `src/layouts/Base.astro` y pasa `title` y `description` únicos.
- Imágenes con `astro:assets`, `alt` obligatorio, `loading="lazy"` salvo el hero.
- Respetar `prefers-reduced-motion`.
- No mencionar "marca blanca" ni permisos de agencias como aviso: en el gremio es lo normal.
- Antes de inventar, mirar cómo lo resuelven los referentes (`docs/02-benchmark-claims-productoras.md`).

## Desarrollo

Servidor de desarrollo en segundo plano:

```
astro dev --background
```

Gestión: `astro dev stop`, `astro dev status`, `astro dev logs`. Build: `npm run build`. Revisar `dist/` con `npm run preview`.

Documentación de Astro: https://docs.astro.build (routing, componentes, content collections, styling, i18n).
