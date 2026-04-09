# Habi Marketing — Plataforma Inmobiliaria

Monorepo para la nueva plataforma web de Habi. Reemplaza habi.co con una experiencia unificada multiproducto.

## Estructura

```
habi-marketing/
├── apps/
│   ├── home/          Landing multiproducto (Next.js)
│   ├── sellers/       Formulario de venta — cero incompletos (Next.js)
│   └── buyers/        Listing de propiedades + ficha de detalle (Next.js)
├── packages/
│   ├── ui/            Design system compartido
│   ├── api/           API layer tipado (endpoints Habi)
│   └── config/        Tailwind, TypeScript configs
└── turbo.json         Turborepo config
```

## Apps

### Home (`apps/home`)
- Landing con hero multiproducto (5 cards: MM, Inmo, Comprar, Asesoría, Crédito)
- Testimoniales (pendiente CMS Strapi)
- Páginas informativas: `/asesoria`, `/credito`, `/broker`
- Footer completo, SEO, accesibilidad

### Sellers (`apps/sellers`)
- Formulario de 6 pasos con flujo cero incompletos
- Pasos 1-4 obligatorios ANTES de crear lead
- Pasos 5-6 opcionales (complementarias + exit poll)
- APIs: georef, catastral, DANE, POIs, zona mediana, habimetro
- Resultados: avalúo, eligibilidad MM/Inmo, histórico precios, costos

### Buyers (`apps/buyers`)
- Listing de propiedades con filtros y paginación
- Ficha de detalle individual (`/inmueble/[id]`)
- Schema.org RealEstateListing structured data
- Formulario de contacto

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build**: Turborepo
- **Maps**: Leaflet (CDN)
- **Charts**: Chart.js + react-chartjs-2
- **Fonts**: Montserrat (headings) + Roboto (body)

## Desarrollo

```bash
# Instalar dependencias
npm install

# Dev de una app específica
npm run dev:home
npm run dev:sellers
npm run dev:buyers

# Build de todo
npm run build
```

## Deploy

GitHub Pages (staging): https://camotoya.github.io/habi-marketing/

## Pendientes

- [ ] API key POST habimetro (producción)
- [ ] Verificar API CMS Sales (listing compradores)
- [ ] Conectar testimoniales a CMS Strapi
- [ ] Configurar subdominio staging (nuevo.habi.co)
