'use client';
import { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
}

export default function CreditoPage() {
  useEffect(() => { document.title = 'Crédito Hipotecario | Habi'; }, []);

  /* ── Simulator state ── */
  const [propertyValue, setPropertyValue] = useState(300_000_000);
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [termYears, setTermYears] = useState(15);

  const monthlyPayment = useMemo(() => {
    const loanAmount = propertyValue * (1 - downPaymentPct / 100);
    const monthlyRate = 0.008; // 0.8%
    const months = termYears * 12;
    if (loanAmount <= 0 || months <= 0) return 0;
    // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + monthlyRate, months);
    return loanAmount * (monthlyRate * factor) / (factor - 1);
  }, [propertyValue, downPaymentPct, termYears]);

  /* ── Contact form state ── */
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 text-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl sm:text-5xl leading-tight mb-4">
            Encuentra tu crédito hipotecario ideal
          </h1>
          <p className="text-[18px] text-teal-100 max-w-2xl mx-auto">
            Comparamos las mejores opciones del mercado para que financies tu vivienda con la tasa y el plazo que mejor se ajusten a ti.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '\uD83C\uDFE6', title: 'Múltiples bancos', text: 'Trabajamos con las principales entidades financieras del país para ofrecerte variedad de opciones en un solo lugar.' },
            { icon: '\uD83D\uDCC9', title: 'Mejores tasas', text: 'Negociamos condiciones preferenciales para que accedas a tasas competitivas que se ajusten a tu presupuesto.' },
            { icon: '\u26A1', title: 'Pre-aprobación rápida', text: 'Conoce tu capacidad de endeudamiento en minutos y avanza con confianza en la búsqueda de tu vivienda.' },
          ].map(b => (
            <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <span className="text-4xl block mb-4">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-[20px] text-gray-900 mb-2">{b.title}</h3>
              <p className="text-[16px] text-gray-500 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[600px] px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-10">
            Simula tu crédito
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Property value */}
            <label className="block mb-6">
              <span className="text-[14px] font-semibold text-gray-700 mb-2 block">Valor del inmueble</span>
              <input
                type="number"
                value={propertyValue}
                onChange={e => setPropertyValue(Number(e.target.value))}
                min={50_000_000}
                step={10_000_000}
                className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
              />
              <span className="text-[13px] text-gray-400 mt-1 block">{formatCurrency(propertyValue)}</span>
            </label>

            {/* Down payment */}
            <label className="block mb-6">
              <span className="text-[14px] font-semibold text-gray-700 mb-2 block">Cuota inicial: {downPaymentPct}%</span>
              <input
                type="range"
                min={10}
                max={50}
                value={downPaymentPct}
                onChange={e => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-[12px] text-gray-400 mt-1">
                <span>10%</span>
                <span>{formatCurrency(propertyValue * downPaymentPct / 100)}</span>
                <span>50%</span>
              </div>
            </label>

            {/* Term */}
            <label className="block mb-8">
              <span className="text-[14px] font-semibold text-gray-700 mb-2 block">Plazo: {termYears} años</span>
              <input
                type="range"
                min={5}
                max={30}
                value={termYears}
                onChange={e => setTermYears(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-[12px] text-gray-400 mt-1">
                <span>5 años</span>
                <span>30 años</span>
              </div>
            </label>

            {/* Result */}
            <div className="bg-teal-50 rounded-xl p-6 text-center">
              <p className="text-[14px] text-teal-700 font-medium mb-1">Cuota mensual estimada</p>
              <p className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl text-teal-700">
                {formatCurrency(monthlyPayment)}
              </p>
              <p className="text-[12px] text-teal-600 mt-2">*Cálculo referencial con tasa del 0.8% mensual. No constituye una oferta formal de crédito.</p>
            </div>
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
                  ¡Gracias por tu interés!
                </h3>
                <p className="text-[16px] text-gray-500">Un especialista en crédito te contactará pronto.</p>
              </div>
            ) : (
              <>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-[24px] text-gray-900 mb-6 text-center">
                  Recibe asesoría de crédito
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Nombre completo" required
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors" />
                  <input type="email" placeholder="Correo electrónico" required
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors" />
                  <input type="tel" placeholder="Teléfono" required
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors" />
                  <input type="number" placeholder="Valor del inmueble que buscas" min={0}
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors" />
                  <button type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-[16px] hover:bg-purple-700 transition-colors">
                    Solicitar asesoría de crédito
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
