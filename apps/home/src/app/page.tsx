'use client';
import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ── Product Cards ──
const PRODUCTS = [
  {
    icon: '⚡', title: 'Vende en 10 días', subtitle: 'Market Maker',
    description: 'Te compramos tu inmueble directamente. Recibe una oferta y ten tu dinero en efectivo en tiempo récord.',
    highlights: ['Pago en 10 días', 'Sin intermediarios', 'Oferta garantizada'],
    cta: 'Quiero vender rápido', href: '/habi-marketing/', gradient: 'from-purple-600 to-purple-800',
  },
  {
    icon: '🏘️', title: 'Vende con +4,000 brokers', subtitle: 'Inmobiliaria',
    description: 'Publicamos tu inmueble en la red de brokers más grande del país. Tú pones el precio, nosotros encontramos al comprador.',
    highlights: ['Mejor precio del mercado', 'Red de +4,000 brokers', 'Acompañamiento completo'],
    cta: 'Quiero vender con Habi', href: '/habi-marketing/', gradient: 'from-teal-500 to-teal-600',
  },
  {
    icon: '🔑', title: 'Compra tu inmueble ideal', subtitle: 'Inventario',
    description: 'Explora el mejor inventario inmobiliario del país. Apartamentos y casas verificados, con toda la información que necesitas.',
    highlights: ['Inventario verificado', 'Fotos profesionales', 'Asesoría gratuita'],
    cta: 'Ver propiedades', href: '/habi-marketing/', gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: '💬', title: 'Recibe asesoría inmobiliaria', subtitle: 'Asesoría',
    description: 'Nuestro equipo de expertos te acompaña en cada paso de tu decisión inmobiliaria. Sin compromiso.',
    highlights: ['Expertos certificados', 'Sin costo', 'Personalizada'],
    cta: 'Hablar con un asesor', href: '/habi-marketing/asesoria', gradient: 'from-orange-400 to-orange-600',
  },
  {
    icon: '🏦', title: 'Encuentra tu crédito hipotecario', subtitle: 'Crédito',
    description: 'Comparamos las mejores opciones de crédito hipotecario para que encuentres la tasa y el plazo ideal.',
    highlights: ['Múltiples bancos', 'Mejores tasas', 'Pre-aprobación rápida'],
    cta: 'Simular crédito', href: '/habi-marketing/credito', gradient: 'from-emerald-500 to-emerald-700',
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

// ── Testimonials ──
// TODO: Connect to CMS Strapi when available (endpoint: components?component_name=venta_testimonials)
const TESTIMONIALS_VENTA = [
  { name: 'María González', title: 'Vendió su apartamento en Bogotá', text: 'Vendí mi apartamento en solo 12 días. El proceso fue transparente y el equipo de Habi me acompañó en cada paso. Nunca pensé que vender fuera tan fácil.', city: 'Bogotá' },
  { name: 'Carlos Rodríguez', title: 'Vendió su casa en Medellín', text: 'La oferta de Habi fue justa y el dinero llegó rapidísimo. No tuve que lidiar con intermediarios ni visitas eternas. 100% recomendado.', city: 'Medellín' },
  { name: 'Laura Sánchez', title: 'Vendió con la red de brokers', text: 'Decidí vender con la red de brokers de Habi y en menos de un mes ya tenía comprador. El acompañamiento fue excepcional de principio a fin.', city: 'Barranquilla' },
  { name: 'Andrés Mejía', title: 'Vendió su apartamento en Envigado', text: 'Habi me dio una oferta en 48 horas. El proceso de venta fue impecable, desde la evaluación hasta la escrituración. Muy profesionales.', city: 'Envigado' },
];
const TESTIMONIALS_COMPRA = [
  { name: 'Ana Martínez', title: 'Compró en Cali', text: 'Encontré mi apartamento ideal en el inventario de Habi. Las fotos eran exactas, la información completa y la asesoría fue increíble.', city: 'Cali' },
  { name: 'Diego Torres', title: 'Compró en Bogotá', text: 'El proceso de compra fue muy ágil. Habi me ayudó con todo el papeleo y encontré exactamente lo que buscaba en mi presupuesto.', city: 'Bogotá' },
  { name: 'Valentina Ruiz', title: 'Compró en Soacha', text: 'Gracias a Habi conseguí mi primer apartamento. El crédito hipotecario que me ayudaron a gestionar tenía la mejor tasa del mercado.', city: 'Soacha' },
];


// ── Main Page ──
export default function Home() {
  const [testimonialTab, setTestimonialTab] = useState<'venta' | 'compra'>('venta');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = testimonialTab === 'venta' ? TESTIMONIALS_VENTA : TESTIMONIALS_COMPRA;

  // Auto-advance testimonials
  const nextTestimonial = useCallback(() => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  // Reset index when switching tabs
  useEffect(() => { setActiveTestimonial(0); }, [testimonialTab]);

  return (
    <>
      <Header />

      {/* Hero */}
      <main id="main-content" role="main">
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
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-[16px] text-gray-500 max-w-xl mx-auto">Miles de personas ya han confiado en Habi para tomar sus decisiones inmobiliarias.</p>
          </div>

          {/* Tabs venta/compra */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setTestimonialTab('venta')}
              className={`px-6 py-2.5 rounded-full text-[15px] font-medium transition-all ${testimonialTab === 'venta' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Vendedores
            </button>
            <button
              onClick={() => setTestimonialTab('compra')}
              className={`px-6 py-2.5 rounded-full text-[15px] font-medium transition-all ${testimonialTab === 'compra' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Compradores
            </button>
          </div>

          {/* Testimonial card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center relative overflow-hidden">
              <div className="text-5xl text-purple-100 font-serif absolute top-4 left-6">&ldquo;</div>
              <p className="text-[18px] text-gray-700 leading-relaxed mb-6 relative z-10">
                {testimonials[activeTestimonial]?.text}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-[16px]">
                  {testimonials[activeTestimonial]?.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[16px] text-gray-900">{testimonials[activeTestimonial]?.name}</p>
                  <p className="text-[13px] text-gray-400">{testimonials[activeTestimonial]?.title}</p>
                </div>
              </div>
            </div>

            {/* Dots + arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                aria-label="Testimonio anterior"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} aria-label={`Ver testimonio ${i + 1} de ${testimonials.length}`} className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${i === activeTestimonial ? 'bg-purple-600 w-8' : 'bg-gray-300 hover:bg-gray-400 w-2.5'}`} />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                aria-label="Siguiente testimonio"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
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
            <a href="/habi-marketing/" className="px-8 py-4 rounded-full bg-white text-purple-700 font-semibold text-[16px] hover:bg-purple-50 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700">Quiero vender</a>
            <a href="/habi-marketing/" className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-[16px] hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700">Quiero comprar</a>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
