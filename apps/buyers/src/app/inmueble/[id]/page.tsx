'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { formatPrice } from '@/lib/api';
import type { Property } from '@/lib/api';

// TODO: Fetch from API
const PLACEHOLDER: Property = {
  id: '1000',
  titulo: 'Apartamento moderno en Chapinero',
  precio: 320_000_000,
  area: 72,
  habitaciones: 3,
  banos: 2,
  parqueaderos: 1,
  estrato: 4,
  direccion: 'Calle 53 # 13-42',
  barrio: 'Chapinero',
  conjunto: 'Edificio Torres del Parque',
  antiguedad: 5,
  images: [],
  ubicacion_lat: 4.6351,
  ubicacion_lng: -74.0703,
  inventory_type_id: 1,
};

// ── Header (simplified for detail page) ──
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo-habi.png" alt="Habi" width={128} height={36} className="h-10 w-auto" priority />
        </Link>
        <nav role="navigation" aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
          <a href="/vender" className="px-4 py-2 rounded-full text-[15px] font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">Vender</a>
          <a href="/" aria-current="page" className="px-4 py-2 rounded-full text-[15px] font-medium text-purple-700 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500">Comprar</a>
          <a href="/broker" className="px-4 py-2 rounded-full text-[15px] font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">Soy Broker</a>
        </nav>
      </div>
    </header>
  );
}

// ── Image Gallery ──
function ImageGallery({ images }: { images: Property['images'] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasImages = images.length > 0;

  if (!hasImages) {
    return (
      <div className="space-y-3">
        {/* Main placeholder */}
        <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-[14px] text-gray-400">Fotos próximamente</p>
          </div>
        </div>
        {/* Thumbnail placeholders */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-20 h-16 rounded-lg bg-gray-100 flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-2xl overflow-hidden">
        <Image
          src={images[activeIdx].url + '-765'}
          alt={images[activeIdx].title || 'Foto del inmueble'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                i === activeIdx ? 'border-purple-600' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image src={img.url + '-414'} alt={img.title || ''} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Detail Grid Item ──
function DetailItem({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-[15px] font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ── Contact Form ──
function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal-50 rounded-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-gray-800 mb-2">
          Recibimos tus datos
        </h3>
        <p className="text-[15px] text-gray-500">
          Un asesor se comunicará contigo pronto para ayudarte con este inmueble.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Nombre completo</label>
        <input
          type="text"
          required
          className={inputClass}
          placeholder="Tu nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Teléfono</label>
        <input
          type="tel"
          required
          className={inputClass}
          placeholder="300 123 4567"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Correo electrónico</label>
        <input
          type="email"
          required
          className={inputClass}
          placeholder="tu@correo.com"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
      >
        Quiero más información
      </button>
      <p className="text-[12px] text-gray-400 text-center">
        Al enviar, aceptas nuestra política de tratamiento de datos.
      </p>
    </form>
  );
}

// ── Main Page ──
export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;

  // TODO: Fetch from API using propertyId
  const property = { ...PLACEHOLDER, id: propertyId };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.titulo,
    description: `${property.inventory_type_id === 2 ? 'Casa' : 'Apartamento'} en ${property.barrio}. ${property.habitaciones} habitaciones, ${property.banos} baños, ${property.area} m².`,
    url: `https://habi.co/comprar/inmueble/${property.id}`,
    datePosted: new Date().toISOString(),
    offers: {
      '@type': 'Offer',
      price: property.precio,
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.direccion,
      addressLocality: property.barrio,
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.ubicacion_lat,
      longitude: property.ubicacion_lng,
    },
    numberOfRooms: property.habitaciones,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK',
    },
    ...(property.images.length > 0 && {
      image: property.images.map((img) => img.url + '-765'),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6 sm:py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-500 hover:text-purple-600 transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al listado
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left column: images + info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <ImageGallery images={property.images} />

            {/* Title & price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-3xl text-gray-900 mb-1">
                    {property.titulo}
                  </h1>
                  <p className="text-[15px] text-gray-500">
                    {property.barrio} &middot; {property.direccion}
                  </p>
                </div>
                <p className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-3xl text-purple-600 whitespace-nowrap">
                  {formatPrice(property.precio)}
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700">
                  {property.area} m&sup2;
                </span>
                <span className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700">
                  {property.habitaciones} habitaciones
                </span>
                <span className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700">
                  {property.banos} baños
                </span>
                {property.parqueaderos > 0 && (
                  <span className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700">
                    {property.parqueaderos} parqueaderos
                  </span>
                )}
                <span className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                  Estrato {property.estrato}
                </span>
                <span className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                  {property.inventory_type_id === 2 ? 'Casa' : 'Apartamento'}
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl mb-4">Detalles del inmueble</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <DetailItem
                  label="Área"
                  value={`${property.area} m²`}
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>}
                />
                <DetailItem
                  label="Habitaciones"
                  value={property.habitaciones}
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>}
                />
                <DetailItem
                  label="Baños"
                  value={property.banos}
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <DetailItem
                  label="Parqueaderos"
                  value={property.parqueaderos}
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V11.25c0-2.071 1.44-3.824 3.41-4.268A5.97 5.97 0 0112 6c1.26 0 2.437.39 3.41 1.082C17.31 7.576 18.75 9.329 18.75 11.4v1.85" /></svg>}
                />
                <DetailItem
                  label="Estrato"
                  value={property.estrato}
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-13.5L16.5 7.5m0 0L12 3m4.5 4.5V21" /></svg>}
                />
                <DetailItem
                  label="Antigüedad"
                  value={`${property.antiguedad} años`}
                  icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>}
                />
              </div>
              {property.conjunto && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Conjunto / Edificio</p>
                  <p className="text-[15px] font-medium text-gray-800">{property.conjunto}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl mb-3">Descripción</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Hermoso {property.inventory_type_id === 2 ? 'casa' : 'apartamento'} ubicado en el sector de {property.barrio}.
                Cuenta con {property.habitaciones} habitaciones, {property.banos} baños y {property.area} m&sup2; de área construida.
                {property.parqueaderos > 0 && ` Incluye ${property.parqueaderos} parqueadero${property.parqueaderos > 1 ? 's' : ''}.`}
                {' '}Excelente ubicación con fácil acceso a vías principales, centros comerciales y transporte público.
                Estrato {property.estrato}. Ideal para familias que buscan comodidad y calidad de vida.
              </p>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl mb-3">Ubicación</h2>
              <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-[14px] text-gray-400 font-medium">Mapa próximamente</p>
                  <p className="text-[13px] text-gray-400">{property.direccion}, {property.barrio}</p>
                </div>
              </div>
            </div>

            {/* Nearby places placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl mb-3">Lugares cercanos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Transporte público', icon: '🚌', distance: 'A 200m' },
                  { name: 'Supermercado', icon: '🛒', distance: 'A 400m' },
                  { name: 'Parque', icon: '🌳', distance: 'A 300m' },
                  { name: 'Centro comercial', icon: '🏬', distance: 'A 800m' },
                  { name: 'Colegios', icon: '🏫', distance: 'A 500m' },
                  { name: 'Hospital', icon: '🏥', distance: 'A 1.2km' },
                ].map(place => (
                  <div key={place.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-xl">{place.icon}</span>
                    <div>
                      <p className="text-[13px] font-medium text-gray-700">{place.name}</p>
                      <p className="text-[12px] text-gray-400">{place.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: contact & CTA */}
          <div className="space-y-6">
            {/* Sticky contact card */}
            <div className="lg:sticky lg:top-24">
              {/* CTA banner */}
              <div className="bg-gradient-to-br from-[#7C01FF] to-[#5A00CC] rounded-2xl p-6 text-white mb-5">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl mb-2">
                  ¿Te interesa este inmueble?
                </h3>
                <p className="text-purple-200 text-[14px] leading-relaxed">
                  Habla con un asesor Habi que te acompañará en todo el proceso de compra. Sin compromiso.
                </p>
              </div>

              {/* Contact form */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg mb-4">
                  Solicita más información
                </h3>
                <ContactForm />
              </div>

              {/* Quick contact */}
              <div className="bg-white rounded-2xl p-5 shadow-sm mt-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-400">Llámanos</p>
                    <p className="text-[15px] font-semibold text-gray-800">601 900 2835</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="bg-gray-900 text-gray-400 pt-12 pb-8 mt-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src="/logo-habi.png" alt="Habi" width={80} height={22} className="h-6 w-auto brightness-0 invert opacity-50" />
              <p className="text-[12px] text-gray-500">
                &copy; {new Date().getFullYear()} Habi. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
                <a key={s} href="#" aria-label={`Habi en ${s}`} className="text-[12px] text-gray-500 hover:text-white transition-colors">
                  {`Habi en ${s}`}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
