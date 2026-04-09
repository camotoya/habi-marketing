'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { formatPrice } from '@/lib/api';
import type { Property } from '@/lib/api';

// ── Placeholder data ──
// TODO: Connect to real API when key is verified
const PLACEHOLDER_PROPERTIES: Property[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(1000 + i),
  titulo: [
    'Apartamento moderno en Chapinero',
    'Casa familiar en Suba',
    'Apartaestudio en Usaquén',
    'Apartamento con vista en Chicó',
    'Casa esquinera en Cedritos',
    'Apartamento remodelado en Rosales',
    'Penthouse en Santa Bárbara',
    'Apartamento acogedor en Colina',
    'Casa de dos pisos en Niza',
    'Apartamento amplio en Country',
    'Studio moderno en Virrey',
    'Casa con jardín en Spring',
  ][i],
  precio: [320, 480, 195, 650, 550, 420, 890, 275, 510, 380, 230, 620][i] * 1_000_000,
  area: [72, 120, 42, 95, 140, 85, 160, 58, 130, 88, 38, 110][i],
  habitaciones: [3, 4, 1, 3, 4, 2, 3, 2, 4, 3, 1, 3][i],
  banos: [2, 3, 1, 2, 3, 2, 3, 1, 3, 2, 1, 2][i],
  parqueaderos: [1, 2, 0, 2, 2, 1, 2, 1, 2, 1, 0, 2][i],
  estrato: [4, 3, 5, 6, 4, 5, 6, 3, 4, 4, 5, 4][i],
  direccion: `Calle ${10 + i * 7} # ${20 + i * 3}-${15 + i * 2}`,
  barrio: [
    'Chapinero', 'Suba', 'Usaquén', 'Chicó', 'Cedritos', 'Rosales',
    'Santa Bárbara', 'Colina', 'Niza', 'Country', 'Virrey', 'Spring',
  ][i],
  conjunto: `Conjunto Residencial ${i + 1}`,
  antiguedad: [5, 12, 2, 8, 15, 3, 1, 10, 20, 7, 4, 6][i],
  images: [],
  ubicacion_lat: 4.6 + i * 0.01,
  ubicacion_lng: -74.08 + i * 0.005,
  inventory_type_id: i % 3 === 0 ? 2 : 1,
}));

// ── Header ──
const NAV_ITEMS = [
  { id: 'vender', label: 'Vender', href: '/vender' },
  { id: 'comprar', label: 'Comprar', href: '/' },
  { id: 'broker', label: 'Soy Broker', href: '/broker' },
  { id: 'cuanto', label: '¿Cuánto cuesta mi vivienda?', href: '/cuanto-cuesta' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo-habi.png" alt="Habi" width={128} height={36} className="h-10 w-auto" priority />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={item.href}
              className={`px-4 py-2 rounded-full text-[15px] font-medium transition-all ${
                item.id === 'comprar'
                  ? 'text-purple-700 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={item.href}
              className="block px-4 py-2.5 rounded-lg text-[15px] font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ── Footer ──
const FOOTER_COLS = [
  {
    title: 'Vender',
    links: [
      { label: 'Vende en 10 días', href: '/vender' },
      { label: 'Vende con brokers', href: '/vender' },
      { label: '¿Cuánto vale mi casa?', href: '/cuanto-cuesta' },
    ],
  },
  {
    title: 'Comprar',
    links: [
      { label: 'Ver propiedades', href: '/' },
      { label: 'Apartamentos en Bogotá', href: '/' },
      { label: 'Casas en Medellín', href: '/' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre nosotros', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Soy Broker', href: '/broker' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones', href: '#' },
      { label: 'Política de privacidad', href: '#' },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-[15px] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/logo-habi.png" alt="Habi" width={80} height={22} className="h-6 w-auto brightness-0 invert opacity-50" />
            <p className="text-[12px] text-gray-500">
              &copy; {new Date().getFullYear()} Habi. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-[12px] text-gray-500 hover:text-white transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Property Card ──
function PropertyCard({ property }: { property: Property }) {
  const hasImage = property.images.length > 0;

  return (
    <Link
      href={`/inmueble/${property.id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {hasImage ? (
          <Image
            src={property.images[0].url + '-765'}
            alt={property.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
        )}
        {/* Type badge */}
        <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 backdrop-blur-sm">
          {property.inventory_type_id === 2 ? 'Casa' : 'Apartamento'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="font-[family-name:var(--font-heading)] font-bold text-[20px] text-purple-600 mb-1">
          {formatPrice(property.precio)}
        </p>
        <p className="text-[14px] text-gray-500 mb-3 truncate">
          {property.barrio} &middot; Estrato {property.estrato}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-[13px] text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
            {property.area} m&sup2;
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            {property.habitaciones} hab
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {property.banos} ba
          </span>
          {property.parqueaderos > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V11.25c0-2.071 1.44-3.824 3.41-4.268A5.97 5.97 0 0112 6c1.26 0 2.437.39 3.41 1.082C17.31 7.576 18.75 9.329 18.75 11.4v1.85" /></svg>
              {property.parqueaderos} parq
            </span>
          )}
        </div>

        {/* CTA */}
        <span className="mt-auto inline-flex items-center text-[14px] font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
          Ver detalle
          <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Filters ──
const CITIES = ['Todas', 'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena'];
const PROPERTY_TYPES = ['Todos', 'Apartamento', 'Casa'];
const BEDROOM_OPTIONS = ['Todos', '1', '2', '3', '4', '5+'];

interface Filters {
  city: string;
  type: string;
  bedrooms: string;
  priceMin: string;
  priceMax: string;
  areaMin: string;
}

function FiltersBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const selectClass =
    'bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all';
  const inputClass =
    'bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-[14px] text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400';

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* City */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Ciudad</label>
          <select
            className={selectClass}
            value={filters.city}
            onChange={e => onChange({ ...filters, city: e.target.value })}
          >
            {CITIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Tipo</label>
          <select
            className={selectClass}
            value={filters.type}
            onChange={e => onChange({ ...filters, type: e.target.value })}
          >
            {PROPERTY_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Habitaciones</label>
          <select
            className={selectClass}
            value={filters.bedrooms}
            onChange={e => onChange({ ...filters, bedrooms: e.target.value })}
          >
            {BEDROOM_OPTIONS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Price min */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Precio mín</label>
          <input
            type="number"
            className={inputClass}
            placeholder="Ej: 200000000"
            value={filters.priceMin}
            onChange={e => onChange({ ...filters, priceMin: e.target.value })}
          />
        </div>

        {/* Price max */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Precio máx</label>
          <input
            type="number"
            className={inputClass}
            placeholder="Ej: 800000000"
            value={filters.priceMax}
            onChange={e => onChange({ ...filters, priceMax: e.target.value })}
          />
        </div>

        {/* Area min */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Área mín (m&sup2;)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="Ej: 50"
            value={filters.areaMin}
            onChange={e => onChange({ ...filters, areaMin: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// ── Pagination ──
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 pt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-[14px] font-medium text-gray-500 hover:bg-white hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Anterior
      </button>
      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-lg text-[14px] font-medium transition-all ${
              p === currentPage
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-white hover:text-purple-600'
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-[14px] font-medium text-gray-500 hover:bg-white hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Siguiente
      </button>
    </div>
  );
}

// ── Main Page ──
export default function BuyersListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    city: 'Todas',
    type: 'Todos',
    bedrooms: 'Todos',
    priceMin: '',
    priceMax: '',
    areaMin: '',
  });

  // TODO: Connect to real API when key is verified
  // For now, client-side filter the placeholder data
  const filtered = useMemo(() => {
    return PLACEHOLDER_PROPERTIES.filter(p => {
      if (filters.type === 'Apartamento' && p.inventory_type_id === 2) return false;
      if (filters.type === 'Casa' && p.inventory_type_id !== 2) return false;
      if (filters.bedrooms !== 'Todos') {
        const beds = filters.bedrooms === '5+' ? 5 : Number(filters.bedrooms);
        if (filters.bedrooms === '5+' ? p.habitaciones < 5 : p.habitaciones !== beds) return false;
      }
      if (filters.priceMin && p.precio < Number(filters.priceMin)) return false;
      if (filters.priceMax && p.precio > Number(filters.priceMax)) return false;
      if (filters.areaMin && p.area < Number(filters.areaMin)) return false;
      return true;
    });
  }, [filters]);

  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#7C01FF] via-[#5A00CC] to-[#3D0099] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/10 translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative text-center">
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Encuentra tu próximo hogar
          </h1>
          <p className="text-purple-200 text-[16px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explora inmuebles verificados en las principales ciudades de Colombia. Apartamentos y casas con toda la información que necesitas para tomar la mejor decisión.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 -mt-6 relative z-10 pb-16">
        {/* Filters */}
        <FiltersBar filters={filters} onChange={f => { setFilters(f); setCurrentPage(1); }} />

        {/* Results count */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <p className="text-[14px] text-gray-500">
            <span className="font-semibold text-gray-700">{filtered.length}</span> inmuebles encontrados
          </p>
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-gray-700 mb-2">
              No encontramos resultados
            </h3>
            <p className="text-[15px] text-gray-400">
              Intenta ajustar los filtros para ver más propiedades.
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>

      <Footer />
    </>
  );
}
