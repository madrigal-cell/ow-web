# Nueva web On White — Handoff para Claude Code

Fecha: 12 sep 2026. Este documento es el punto de entrada para construir la web. Los demás docs del Proyecto amplían: `01-estrategia-y-briefing-nueva-web.md` (por qué y para quién), `02-benchmark-claims-productoras.md` (referentes), `03-decisiones.md` (todo lo decidido), `05-mockup-home-desktop.html` y `06-mockup-home-movil.html` (código fuente del mockup aprobado, formato Design Component: el HTML/CSS de dentro de `<x-dc>` es reutilizable tal cual; `{{accent}}` = #ff4d00).

Regla de trabajo de Madri: "lo malo no es copiar, lo malo es copiar mal" — antes de inventar, mirar cómo lo resuelven los referentes del sector y adaptarlo.

Cosa que NO hay que hacer: mencionar ni plantear "marca blanca"/permisos de agencias como aviso. En el gremio es lo normal y a Madri le molesta que se le repita.

---

## 1. Qué se construye

Web corporativa de **On White** (razón social On White Makers, S.L.), productora audiovisual de Sevilla, dirigida a **agencias de eventos y de comunicación** (y en segundo plano a marcas). Bodas NO entra.

Objetivo: que una agencia que no nos conoce entienda en dos minutos qué hacemos y nos escriba. Prioridad máxima: posicionar en Google y aparecer en las respuestas de IAs (ChatGPT, Gemini, Perplexity, Claude) cuando alguien busca productora audiovisual.

## 2. Stack y despliegue (decidido)

- **Astro** (sitio estático, salida HTML puro). Sin CMS externo, sin WordPress, sin SaaS de pago.
- Alojamiento: **IONOS**, hosting web ya contratado (plan exacto pendiente de confirmar; asumir webspace con PHP; si hubiera Node, mejor pero no necesario).
- Despliegue: build local → subida por SFTP a IONOS (script `npm run deploy` con `lftp`/`rsync` o similar, credenciales en `.env`, nunca en el repo). Redirecciones 301 desde las URLs actuales (`/`, `/contacto/`) vía `.htaccess`.
- Vídeo: **Vimeo** embebido (cuenta propia, ya pagada). Nunca enviar al usuario fuera de la web para ver un vídeo.
- Formulario de contacto: script PHP en IONOS que envía a hola@owmakers.com (+ honeypot y validación). Opcional fase 2: enviar también a Holded CRM.
- Idiomas: **ES (por defecto) y EN**, rutas `/` y `/en/`, hreflang.
- Analítica: GA4 + Search Console desde el día uno. Respetar consentimiento de cookies (banner mínimo, sin cookies hasta aceptar).
- Mantenimiento: lo hará Madri con Claude Code. Cada caso/servicio/persona es un fichero Markdown o JSON en `src/content/`. Flujo objetivo: "añade el caso X" → editar fichero → build → deploy. Documentar esto en el README del repo.

## 3. Identidad visual (decidida)

- Dirección: **brutalista gamberro**. Blanco y negro duros, tipografía condensada gigante, un único acento eléctrico, composición asimétrica, bordes rectos (sin radios), líneas de 3 px.
- Colores: fondo `#f4f4f1`, tinta `#0b0b0b`, acento `#ff4d00` (naranja eléctrico), gris texto secundario `#4b4b46`, gris etiquetas `#7a7a72`, gris placeholder `#d9d9d2`, líneas sobre negro `#3a3a36`, texto secundario sobre negro `#c9c9c2`.
- Tipografías (Google Fonts): **Anton** para titulares en mayúsculas (fallback Impact, "Arial Narrow Bold"); **Archivo** 400/500/700 para texto y etiquetas (fallback "Helvetica Neue", Arial). Etiquetas: 11-12 px, 700, letter-spacing .14em, mayúsculas.
- Iconos: SVG inline de trazo, nunca emoji.
- Logo: carpeta Drive "LOGO OWM" (versiones horizontal, cuadrado, icono, blanco/negro, EPS editable). En la web, el logotipo textual "On White" en Anton funciona como marca; usar el icono para favicon/OG.
- Movimiento: contenido, una sola idea por sección (marquee de marcas, aparición del hero). Respetar `prefers-reduced-motion`.

## 4. Claim y textos clave (decididos)

- Claim ES: **On White. Lo único en blanco es el nombre.**
- Claim EN: **On White. Black, white and everything in colour.**
- Subtítulo hero: "Productora audiovisual para agencias de eventos y comunicación. Sevilla, Madrid y donde haga falta."
- Servicios (línea): "Spots · Contenido de marca · Eventos y congresos · Fotografía"
- Showreel: "Dale al play. Es lo que hay."
- Bloque agencias: titular "Tú vendes la idea. Nosotros la rodamos." Tres promesas: **Brief 24 h** (presupuesto cerrado, plan de rodaje y quién va, en un día laborable) · **Sin dobles tomas** (preproducción de verdad, equipo propio, redundancia técnica) · **Entrega rápida** (same-day edit, aftermovie en 24-48 h, fotos el mismo día; el plazo lo marca tu campaña).
- Nosotros: "Sevilla. Plató propio. Cámaras propias. Cabezonería propia." + "Con criterio de publicidad, no de vídeo de comunión."
- Footer: "Dale al play." en acento. CTA único en toda la web: **"Cuéntanos tu proyecto"**.
- Tono: profesional, directo, irreverente sin pasarse, primera persona del plural, sin jerga creativa ("craft", "storytelling", "contamos historias" prohibidos).

## 5. Arquitectura y rutas

| Ruta ES | Ruta EN | Contenido |
|---|---|---|
| `/` | `/en/` | Home según mockup: nav · hero · showreel · marquee marcas · 5 casos · Para agencias · Nosotros (strip) · footer |
| `/trabajos/` | `/en/work/` | Grid filtrable (eventos y congresos · contenido de marca · institucional · fotografía), 8-12 casos |
| `/trabajos/[slug]/` | `/en/work/[slug]/` | Caso: cliente, agencia (si autorizada), reto, qué hicimos, entregables y plazos, vídeo Vimeo embebido, 6-10 fotos, CTA |
| `/servicios/` | `/en/services/` | Índice de servicios |
| `/servicios/eventos-y-congresos/` | `/en/services/events/` | Multicámara, streaming, same-day edit, aftermovie, fotografía, entrevistas en el evento |
| `/servicios/contenido-de-marca/` | `/en/services/brand-content/` | Spots, piezas para redes, píldoras, motion, plató propio 100 m² |
| `/servicios/institucional/` | `/en/services/corporate/` | Vídeo corporativo, testimoniales, cobertura fotográfica |
| `/para-agencias/` | `/en/for-agencies/` | Proceso paso a paso, qué necesitamos de la agencia, FAQ, formulario de brief rápido (fecha, ciudad, tipo, entregables, plazo) |
| `/nosotros/` | `/en/about/` | Madri y Joaquín (fundadores) + todo el equipo con nombre, cargo y foto; plató; equipamiento; dónde operamos |
| `/contacto/` | `/en/contact/` | Formulario corto, tel 955 295 612 / 678 641 862, hola@owmakers.com, WhatsApp, Calle Barrena 5, 41008 Sevilla, LinkedIn, Instagram, Vimeo |
| `/aviso-legal/`, `/privacidad/`, `/cookies/` | idem EN | Legal |

Fuera de alcance v1: blog, bodas, tienda/presupuestador.

## 6. Modelo de contenido (`src/content/`)

- `casos/*.md` — frontmatter: `title`, `slug`, `client`, `agency` (opcional), `type` (evento|marca|institucional|foto), `year`, `vimeoId`, `duration`, `cover`, `gallery[]`, `deliverables[]`, `lead`, `featured` (bool), `order`, `lang`. Cuerpo: reto / qué hicimos / resultado.
- `servicios/*.md`, `equipo/*.md` (`name`, `role`, `photo`, `order`), `testimonios/*.md` (`quote`, `name`, `role`, `agency`), `clientes.json` (marcas del marquee), `faq.json`.
- Textos de interfaz en `src/i18n/es.json` y `en.json`.

## 7. SEO + GEO (requisitos, no opcionales)

- Core Web Vitals en verde en móvil: vídeo hero con póster estático y carga diferida; en móvil, solo póster + botón play. Imágenes AVIF/WebP con `astro:assets`, `loading="lazy"`, `alt` en todas.
- Una página por servicio orientada a una búsqueda: "productora audiovisual eventos Sevilla", "cobertura audiovisual eventos corporativos", "aftermovie evento", "streaming evento corporativo", "fotógrafo evento corporativo Sevilla", "productora vídeo Andalucía", "productora audiovisual Sevilla".
- `<title>` y meta description únicos por página; OG/Twitter cards con imagen; canonical; `sitemap-index.xml` (@astrojs/sitemap); `robots.txt`.
- JSON-LD: `Organization` + `LocalBusiness` (nombre, dirección, teléfono, geo, horario, sameAs LinkedIn/Instagram/Vimeo), `VideoObject` en cada caso (nombre, descripción, thumbnail, uploadDate, duration, embedUrl), `BreadcrumbList`, `FAQPage` en Para agencias, `Person` para el equipo.
- GEO (visibilidad en IAs): párrafo factual y citable en la home y en Nosotros ("On White es una productora audiovisual con sede en Sevilla especializada en…, trabaja para agencias como Nanook, Inusual, Santa Jarana, Marco de Comunicación y BeSpain y para marcas como Xiaomi, JTI o Mastercard"); FAQ con preguntas tal como las hace la gente; fichero `/llms.txt` con resumen de la empresa y enlaces; datos consistentes (nombre, dirección, teléfono) con Google Business y directorios (Sortlist, eventoplus, Madrid Film Office).
- Accesibilidad: contraste AA, foco visible, navegación por teclado, `lang` correcto por idioma.

## 8. Material disponible

- Vimeo: 1.576 vídeos, 18 showcases. Casos candidatos (por reproducciones y relevancia): JTI Iberia Annual Convention 2023 · Xiaomi Captura la grandeza · Auditorio Nissan Cartuja "Vuelve el ruido" · Premios FRACE 2024 (Mastercard) · POCO Pit y Pol · Xiaomi Fan Fan · EPSAR 30 años · Iturri "Your safety matters" · Hacienda Guzmán · EMASESA Resiliencia hídrica · Cruz Roja (showcase) · IDAE (showcase) · Consum. Casi ningún vídeo tiene descripción/etiquetas en Vimeo: ordenarlos antes de embeber.
- Marcas propuestas para el marquee (confirmar con Madri): Xiaomi, JTI, Mastercard, Nissan, TCL, LG, Emasesa, Cruz Roja, IDAE, Iturri, Consum, JRC.
- Agencias autorizadas para nombrar: **Nanook, Inusual, Santa Jarana, Marco de Comunicación, BeSpain**.
- Datos de empresa: On White Makers, S.L., CIF B05300363. Web actual: Calle Barrena 5, 41008 Sevilla · 955 295 612 · 678 641 862 · hola@owmakers.com. (Domicilio social en documentos: Calle Sol 104, 41003 Sevilla; usar Barrena 5 como dirección de contacto salvo que Madri diga otra cosa.) Plató propio de 100 m².
- Web actual: WordPress + Elementor en owmakers.com (2 páginas). Se sustituye entera.

## 9. Pendiente de Madri (no bloquea el arranque)

- Confirmar lista de marcas con logo.
- Elegir 2-3 agencias para testimonio (Claude redacta la petición).
- Nombre del plan de IONOS y credenciales SFTP (en `.env`, fuera del repo).
- Showreel 2026 (por producir; mientras, póster estático).
- Fotos del equipo y del plató; nombres y cargos del equipo.
- Textos legales (aviso legal, privacidad, cookies).

## 10. Orden de trabajo sugerido para Claude Code

1. Scaffold Astro + Tailwind (o CSS propio con tokens) + i18n + sitemap; tokens de diseño según §3.
2. Home pixel-fiel al mockup (desktop 1440 y móvil 390), con componentes reutilizables (Nav, Hero, Showreel, Marquee, CaseCard, PromiseRow, Footer).
3. Colecciones de contenido y páginas de caso/servicio/equipo con datos de ejemplo claramente marcados como pendientes.
4. SEO/GEO técnico (§7), formulario PHP, `.htaccess` con 301.
5. Script de deploy a IONOS y README con el flujo de mantenimiento en lenguaje llano.
6. Revisión Lighthouse móvil ≥ 90 en todo antes de publicar.
