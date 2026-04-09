'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ── FAQ data ── */
const FAQS = [
  { q: '¿La asesoría tiene algún costo?', a: 'No. Nuestro servicio de asesoría inmobiliaria es completamente gratuito. Nuestro equipo te acompaña sin compromiso para que tomes la mejor decisión.' },
  { q: '¿Cuánto tarda el proceso?', a: 'Normalmente asignamos un asesor en menos de 24 horas hábiles. La duración total depende de tu situación particular, pero nuestro equipo trabaja para darte respuestas lo más rápido posible.' },
  { q: '¿Qué tipo de temas puedo consultar?', a: 'Puedes consultar sobre compra, venta, avalúos, crédito hipotecario, documentación legal, inversión inmobiliaria y cualquier duda relacionada con bienes raíces en Colombia.' },
  { q: '¿Los asesores están certificados?', a: 'Sí. Todos nuestros asesores son profesionales certificados con experiencia en el mercado inmobiliario colombiano y reciben capacitación continua.' },
];

export default function AsesoriaPage() {
  useEffect(() => { document.title = 'Asesoría Inmobiliaria | Habi'; }, []);

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl sm:text-5xl leading-tight text-gray-900 mb-4">
            Asesoría inmobiliaria personalizada
          </h1>
          <p className="text-[18px] text-gray-600 max-w-2xl mx-auto">
            Nuestro equipo de expertos te acompaña en cada decisión para que compres, vendas o inviertas con total confianza.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '\uD83C\uDF93', title: 'Expertos certificados', text: 'Nuestros asesores son profesionales con amplia experiencia en el mercado inmobiliario colombiano, certificados y en constante formación.' },
            { icon: '\uD83D\uDCB0', title: 'Sin costo', text: 'No pagas nada por recibir orientación. Nuestro servicio de asesoría es 100% gratuito y sin compromiso.' },
            { icon: '\uD83C\uDFAF', title: 'Personalizada', text: 'Analizamos tu situación particular y te brindamos recomendaciones a la medida, ya sea que quieras comprar, vender o invertir.' },
          ].map(b => (
            <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <span className="text-4xl block mb-4">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-[20px] text-gray-900 mb-2">{b.title}</h3>
              <p className="text-[16px] text-gray-500 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: 1, title: 'Cuéntanos tu situación', text: 'Llena el formulario con tus datos y cuéntanos qué necesitas.' },
              { step: 2, title: 'Te asignamos un asesor', text: 'En menos de 24 horas un experto se pondrá en contacto contigo.' },
              { step: 3, title: 'Recibe orientación', text: 'Tu asesor te guiará paso a paso para que tomes la mejor decisión.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-purple-600 text-white font-bold text-[24px] flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[18px] text-gray-900 mb-2">{s.title}</h3>
                <p className="text-[16px] text-gray-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16">
        <div className="mx-auto max-w-[600px] px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">&#10003;</span>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[24px] text-gray-900 mb-2">
                  ¡Gracias por contactarnos!
                </h3>
                <p className="text-[16px] text-gray-500">Un asesor se comunicará contigo muy pronto.</p>
              </div>
            ) : (
              <>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-[24px] text-gray-900 mb-6 text-center">
                  Solicita tu asesoría
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Nombre completo" required aria-label="Nombre completo"
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                  <input type="email" placeholder="Correo electrónico" required aria-label="Correo electrónico"
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                  <input type="tel" placeholder="Teléfono" required aria-label="Teléfono"
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                  <textarea placeholder="¿En qué podemos ayudarte?" rows={4} aria-label="¿En qué podemos ayudarte?"
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none" />
                  <button type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-[16px] hover:bg-purple-700 transition-colors">
                    Solicitar asesoría
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[700px] px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-10">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-[16px] text-gray-900">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-[16px] text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
