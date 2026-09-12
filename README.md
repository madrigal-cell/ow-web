# Web de On White (owmakers.com)

Web corporativa de **On White** (On White Makers, S.L.), productora audiovisual de Sevilla, dirigida a agencias de eventos y de comunicación.

- Stack: [Astro](https://astro.build) (sitio 100 % estático), CSS propio con tokens, vídeo en Vimeo embebido.
- Idiomas: español en `/` y English en `/en/`.
- Alojamiento: IONOS (subida por SFTP con `npm run deploy`, pendiente del paso 5).
- Toda la documentación de estrategia, decisiones y mockups está en [`docs/`](docs/). El punto de entrada es [`docs/04-handoff-claude-code.md`](docs/04-handoff-claude-code.md).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias (solo la primera vez o si cambia `package.json`). |
| `npm run dev` | Arranca la web en local en http://localhost:4321 con recarga automática. |
| `npm run build` | Genera la web final en `dist/` (HTML, CSS, fuentes e imágenes optimizadas). |
| `npm run preview` | Sirve `dist/` en local para revisar exactamente lo que se va a publicar. |

## Dónde está cada cosa

```
src/
  styles/tokens.css     Colores, tipografías, tamaños y espaciados. Cambiar aquí = cambia toda la web.
  styles/global.css     Reset, utilidades (.display, .label, .btn…) y movimiento.
  i18n/routes.ts        Mapa de rutas ES ↔ EN (nav, hreflang y selector de idioma salen de aquí).
  i18n/es.json, en.json Textos de interfaz en cada idioma.
  layouts/Base.astro    <head> común: SEO, hreflang, Open Graph, fuentes.
  components/           Piezas reutilizables (Nav, Hero, Showreel, Marquee, CaseCard, PromiseRow, Footer…).
  data/site.ts          Datos fijos de la empresa (teléfonos, dirección, redes, showreel).
  data/clientes.json    Marcas de la banda de logos.
  pages/                Una carpeta = una URL. pages/en/ replica la estructura en inglés.
  content/casos/        Un Markdown por caso e idioma (es/ y en/). Los marcados `pending: true` son de ejemplo.
public/                 Ficheros que se copian tal cual (robots.txt, favicon, imágenes OG).
docs/                   Briefing, benchmark, decisiones, handoff y mockups aprobados.
```

## Flujo de mantenimiento (resumen; se ampliará en el paso 5)

1. Editar o añadir el fichero de contenido que toque (por ejemplo un caso en `src/content/casos/`).
2. `npm run build` para generar `dist/`.
3. `npm run deploy` para subirlo a IONOS.

Las credenciales de IONOS van en `.env` (copiar de `.env.example`). `.env` nunca se sube al repositorio.

## Estado

- [x] Paso 1 · Scaffold Astro, tokens de diseño, i18n ES/EN, sitemap, layout base con SEO.
- [x] Paso 2 · Home fiel al mockup (desktop 1440 y móvil 390): Nav, Hero, Showreel, Marquee, CaseCard, PromiseRow, Footer.
- [ ] Paso 3 · Colecciones de contenido y páginas de caso, servicio, equipo.
- [ ] Paso 4 · SEO/GEO técnico, formulario PHP, `.htaccess` con 301.
- [ ] Paso 5 · Script de deploy a IONOS y README de mantenimiento.
- [ ] Paso 6 · Lighthouse móvil ≥ 90 en todas las páginas.
