# Web de On White (owmakers.com)

Web corporativa de **On White** (On White Makers, S.L.), productora audiovisual de Sevilla, dirigida a agencias de eventos y de comunicación.

- Stack: [Astro](https://astro.build) (sitio 100 % estático), CSS propio con tokens, vídeo en Vimeo embebido.
- Idiomas: español en `/` y English en `/en/`.
- Alojamiento: IONOS. Se publica con `npm run deploy` (ver "Cómo se publica").
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
  content/servicios/    Un Markdown por servicio e idioma, unidos por `key`.
  content/equipo/       Una persona por fichero, con el cargo en ES y EN.
  content/testimonios/  Una cita por fichero, en ES y EN.
  data/faq.json         Preguntas frecuentes de Para agencias (ES y EN).
  layouts/Page.astro    Página interior: Nav + contenido + Footer.
  components/pages/     Una plantilla por tipo de página; las rutas de pages/ solo la llaman.
public/                 Ficheros que se copian tal cual (robots.txt, favicon, imágenes OG).
docs/                   Briefing, benchmark, decisiones, handoff y mockups aprobados.
```

## Formularios, analítica y legales

- Los formularios de Contacto y Para agencias envían por POST a `public/api/contacto.php` y `public/api/brief.php`, que se ejecutan en IONOS (PHP 8.0 o superior). El buzón de destino y el remitente se cambian en las constantes de `public/api/_mail.php`. Llevan honeypot y filtro de velocidad contra bots.
- La analítica (GA4) solo se activa si `PUBLIC_GA4_ID` tiene valor en `.env` al compilar. Sin valor no hay aviso de cookies ni cookies.
- Los textos legales viven en `src/content/legal/` (ES y EN). Mientras tengan `draft: true` se muestran con aviso de borrador y no se indexan; al validarlos, poner `draft: false`.

## Cómo se publica (paso 5)

La web se publica en IONOS con un solo comando. Sube únicamente los ficheros que han cambiado y borra en el servidor los que ya no existen en `dist/`.

```bash
npm run deploy
```

- `npm run deploy:dry` enseña qué se subiría sin subir nada.
- La configuración está en `.env` (copiar de `.env.example`): servidor, carpeta remota y dirección pública para comprobar. El acceso al servidor va por clave SSH ya instalada en el Mac; no hay contraseñas en el proyecto.
- La web vive en el servidor en `htdocs/owmakers-web/`, separada del WordPress antiguo (`htdocs/clickandbuilds/owmakers/`). Ninguna publicación toca el WordPress ni OW PROGRESS (`htdocs/progress/`).
- Lanzamiento: en el panel de IONOS, cambiar el destino del dominio owmakers.com a la carpeta `owmakers-web`. Vuelta atrás: apuntarlo de nuevo a `clickandbuilds/owmakers`.
- Dirección de pruebas: subdominio `nueva.owmakers.com` apuntando a `owmakers-web` (se crea en el panel de IONOS).

## Mantenimiento en lenguaje llano

Cada cambio sigue el mismo camino: editar → `npm run build` (o directamente `npm run deploy`, que compila antes de subir) → comprobar en el navegador.

**Añadir o cambiar un trabajo (caso).** Crear dos ficheros con el mismo nombre en `src/content/casos/es/` y `src/content/casos/en/`, copiando uno existente. Rellenar la cabecera: título, cliente, agencia (si se puede nombrar), tipo (`evento`, `marca`, `institucional`, `foto`), año, `vimeoId` (el número del vídeo en Vimeo), duración, `date` (fecha de publicación), portada (`cover`, una imagen en `src/assets/casos/`), galería, entregables, `lead` (una frase), `featured: true` si va en la home y `order` para el orden. Debajo, los apartados Reto / Qué hicimos / Resultado. Quitar `pending: true` cuando el caso esté listo.

**Cambiar un texto de la web.** Los textos de interfaz (menú, hero, promesas, formularios, avisos) están en `src/i18n/es.json` y `src/i18n/en.json`. Buscar la frase y cambiarla en los dos idiomas.

**Servicios, equipo, testimonios y preguntas frecuentes.** Un fichero por elemento en `src/content/servicios/`, `src/content/equipo/`, `src/content/testimonios/` y la lista de `src/data/faq.json`. Para añadir una persona: copiar una ficha de `src/content/equipo/`, cambiar nombre, cargo en ES y EN y añadir la foto en `photo`.

**Marcas de la banda de logos.** Lista en `src/data/clientes.json`.

**Showreel.** Cuando exista el vídeo, poner su número de Vimeo en `showreel.vimeoId` dentro de `src/data/site.ts`.

**Datos de contacto, redes y buzón de formularios.** En `src/data/site.ts`. El buzón que recibe los formularios se cambia también en `public/api/_mail.php` (constante `OW_TO`).

**Textos legales.** En `src/content/legal/` (ES y EN). Cuando estén revisados, cambiar `draft: true` por `draft: false` y quitar las tres rutas legales del filtro del sitemap en `astro.config.mjs`.

**Analítica.** Poner el identificador de GA4 en `PUBLIC_GA4_ID` dentro de `.env` y publicar. Aparece el aviso de cookies y solo se mide si el visitante acepta.

**Volver a una versión anterior.** El historial está en Git. Para recuperar la versión anterior: `git log --oneline` para ver los cambios, `git checkout <código> -- .` para restaurar los ficheros de esa versión y `npm run deploy`.

**Colores, tipografías y tamaños.** Todo en `src/styles/tokens.css`. Cambiar un valor ahí cambia toda la web.

## Estado

- [x] Paso 1 · Scaffold Astro, tokens de diseño, i18n ES/EN, sitemap, layout base con SEO.
- [x] Paso 2 · Home fiel al mockup (desktop 1440 y móvil 390): Nav, Hero, Showreel, Marquee, CaseCard, PromiseRow, Footer.
- [x] Paso 3 · Colecciones (casos, servicios, equipo, testimonios) y páginas: Trabajos con filtro, ficha de caso, Servicios (índice + 3), Para agencias (proceso, FAQ, brief), Nosotros, Contacto y legales, en ES y EN. Datos de ejemplo marcados `pending`.
- [x] Paso 4 · SEO/GEO técnico (JSON-LD Organization/LocalBusiness/WebSite/BreadcrumbList/Service/FAQPage/Person/VideoObject, `llms.txt`, favicon e imagen OG con el logo real), formularios con PHP (`public/api/`, envían a produccion@owmakers.com), páginas de gracias, `.htaccess` con https, sin www y 301 desde la web antigua, aviso de cookies (solo si hay GA4), borradores legales en `src/content/legal/`.
- [x] Paso 5 · Publicación en IONOS con `npm run deploy` (rsync por SSH a `htdocs/owmakers-web/`) y guía de mantenimiento en este README.
- [ ] Paso 6 · Lighthouse móvil ≥ 90 en todas las páginas.
