'use client';
import Image from 'next/image';
import { useState } from 'react';

// ── Header ──
const NAV_ITEMS = [
  { id: 'vender', label: 'Vender', href: '/vender' },
  { id: 'comprar', label: 'Comprar', href: '/comprar' },
  { id: 'broker', label: 'Soy Broker', href: '/broker' },
  { id: 'cuanto', label: '¿Cuánto cuesta mi vivienda?', href: '/cuanto-cuesta' },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between">
        <Image src="/logo-habi.png" alt="Habi" width={128} height={36} className="h-10 w-auto" priority />
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a key={item.id} href={item.href} className="px-4 py-2 rounded-full text-[15px] font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ── Product Cards ──
const PRODUCTS = [
  {
    icon: '⚡', title: 'Vende en 10 días', subtitle: 'Market Maker',
    description: 'Te compramos tu inmueble directamente. Recibe una oferta y ten tu dinero en efectivo en tiempo récord.',
    highlights: ['Pago en 10 días', 'Sin intermediarios', 'Oferta garantizada'],
    cta: 'Quiero vender rápido', href: '/vender', gradient: 'from-purple-600 to-purple-800',
  },
  {
    icon: '🏘️', title: 'Vende con +4,000 brokers', subtitle: 'Inmobiliaria',
    description: 'Publicamos tu inmueble en la red de brokers más grande del país. Tú pones el precio, nosotros encontramos al comprador.',
    highlights: ['Mejor precio del mercado', 'Red de +4,000 brokers', 'Acompañamiento completo'],
    cta: 'Quiero vender con Habi', href: '/vender', gradient: 'from-teal-500 to-teal-600',
  },
  {
    icon: '🔑', title: 'Compra tu inmueble ideal', subtitle: 'Inventario',
    description: 'Explora el mejor inventario inmobiliario del país. Apartamentos y casas verificados, con toda la información que necesitas.',
    highlights: ['Inventario verificado', 'Fotos profesionales', 'Asesoría gratuita'],
    cta: 'Ver propiedades', href: '/comprar', gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: '💬', title: 'Recibe asesoría inmobiliaria', subtitle: 'Asesoría',
    description: 'Nuestro equipo de expertos te acompaña en cada paso de tu decisión inmobiliaria. Sin compromiso.',
    highlights: ['Expertos certificados', 'Sin costo', 'Personalizada'],
    cta: 'Hablar con un asesor', href: '/asesoria', gradient: 'from-orange-400 to-orange-600',
  },
  {
    icon: '🏦', title: 'Encuentra tu crédito hipotecario', subtitle: 'Crédito',
    description: 'Comparamos las mejores opciones de crédito hipotecario para que encuentres la tasa y el plazo ideal.',
    highlights: ['Múltiples bancos', 'Mejores tasas', 'Pre-aprobación rápida'],
    cta: 'Simular crédito', href: '/credito', gradient: 'from-emerald-500 to-emerald-700',
  },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <a href={product.href} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 flex flex-col">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
        {product.icon}
      </div>
      <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{product.subtitle}</p>
      <h3 className="font-[family-name:var(--font-heading)] font-bold text-[20px] text-gray-900 mb-2 leading-tight">{product.title}</h3>
      <p className="text-[15px] text-gray-500 leading-relaxed mb-4 flex-1">{product.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {product.highlights.map(h => (
          <span key={h} className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{h}</span>
        ))}
      </div>
      <span className="inline-flex items-center text-[15px] font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
        {product.cta}
        <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </span>
    </a>
  );
}

// ── Stats ──
const STATS = [
  { value: '+500K', label: 'Inmuebles avaluados' },
  { value: '+4,000', label: 'Brokers en la red' },
  { value: '28', label: 'Ciudades en Colombia' },
  { value: '10 días', label: 'Tiempo de compra directa' },
];

// ── Testimonials (placeholder — will connect to CMS Strapi) ──
const TESTIMONIALS = [
  { name: 'María González', title: 'Vendió en Bogotá', text: 'Vendí mi apartamento en solo 12 días. El proceso fue transparente y el equipo de Habi me acompañó en cada paso.' },
  { name: 'Carlos Rodríguez', title: 'Vendió en Medellín', text: 'La oferta de Habi fue justa y el dinero llegó rapidísimo. No tuve que lidiar con intermediarios ni visitas eternas.' },
  { name: 'Ana Martínez', title: 'Compró en Cali', text: 'Encontré mi apartamento ideal en el inventario de Habi. Las fotos eran exactas y la asesoría fue increíble.' },
];

// ── Footer ──
const FOOTER_COLS = [
  { title: 'Vender', links: [{ label: 'Vende en 10 días', href: '/vender' }, { label: 'Vende con brokers', href: '/vender' }, { label: '¿Cuánto vale mi casa?', href: '/cuanto-cuesta' }, { label: 'Proceso de venta', href: '#' }] },
  { title: 'Comprar', links: [{ label: 'Ver propiedades', href: '/comprar' }, { label: 'Apartamentos en Bogotá', href: '/comprar' }, { label: 'Casas en Medellín', href: '/comprar' }, { label: 'Crédito hipotecario', href: '/credito' }] },
  { title: 'Empresa', links: [{ label: 'Sobre nosotros', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Trabaja con nosotros', href: '#' }, { label: 'Soy Broker', href: '/broker' }] },
  { title: 'Legal', links: [{ label: 'Términos y condiciones', href: '#' }, { label: 'Política de privacidad', href: '#' }, { label: 'Política de cookies', href: '#' }, { label: 'PQRS', href: '#' }] },
];
const CITIES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena', 'Pereira', 'Armenia', 'Soacha', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta', 'Chía'];

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
                  <li key={l.label}><a href={l.href} className="text-[14px] hover:text-white transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-white font-semibold text-[14px] mb-3">Ciudades donde operamos</h4>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(c => (<span key={c} className="text-[12px] px-3 py-1 rounded-full bg-gray-800 text-gray-400">{c}</span>))}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/logo-habi.png" alt="Habi" width={80} height={22} className="h-6 w-auto brightness-0 invert opacity-50" />
            <p className="text-[12px] text-gray-500">© {new Date().getFullYear()} Habi. Todos los derechos reservados.</p>
          </div>
          <div className="flex items-center gap-4">
            {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-[12px] text-gray-500 hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-gray-600 text-center mt-6">Los valores estimados se basan en datos del mercado y no constituyen un avalúo comercial certificado. Habi S.A.S. NIT 901.163.846-0.</p>
      </div>
    </footer>
  );
}

// ── Main Page ──
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#7C01FF] via-[#5A00CC] to-[#3D0099] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/10 translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 relative text-center max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Estás en el lugar correcto para tus decisiones inmobiliarias
          </h1>
          <p className="text-purple-200 text-lg sm:text-xl leading-relaxed">
            Según tus necesidades, tú decides lo que mejor se adapta a ti. Vende rápido, vende al mejor precio, compra tu próximo hogar o recibe asesoría experta.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 -mt-8 relative z-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.slice(0, 3).map(p => (<ProductCard key={p.title} product={p} />))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-[800px] mx-auto">
          {PRODUCTS.slice(3).map(p => (<ProductCard key={p.title} product={p} />))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl text-purple-600 mb-1">{s.value}</p>
                <p className="text-[15px] text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-[16px] text-gray-500 max-w-xl mx-auto">Miles de personas ya han confiado en Habi para tomar sus decisiones inmobiliarias.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <p className="text-[18px] text-gray-700 leading-relaxed mb-6 italic">&ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;</p>
              <p className="font-semibold text-[16px] text-gray-900">{TESTIMONIALS[activeTestimonial].name}</p>
              <p className="text-[14px] text-gray-400">{TESTIMONIALS[activeTestimonial].title}</p>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? 'bg-purple-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-white mb-4">¿Listo para dar el siguiente paso?</h2>
          <p className="text-purple-200 text-lg mb-8 max-w-xl mx-auto">Sea cual sea tu necesidad inmobiliaria, estamos aquí para ayudarte.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/vender" className="px-8 py-4 rounded-full bg-white text-purple-700 font-semibold text-[16px] hover:bg-purple-50 transition-all shadow-lg">Quiero vender</a>
            <a href="/comprar" className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-[16px] hover:bg-white/10 transition-all">Quiero comprar</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
