'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CITIES_LIST = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena',
  'Pereira', 'Armenia', 'Manizales', 'Ibagué', 'Villavicencio', 'Santa Marta',
  'Soacha', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta', 'Chía',
  'Neiva', 'Pasto', 'Montería', 'Valledupar', 'Cúcuta', 'Tunja',
  'Popayán', 'Rionegro', 'Girardot', 'Zipaquirá',
];

export default function BrokerPage() {
  useEffect(() => { document.title = 'Portal de Brokers | Habi'; }, []);

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-4xl sm:text-5xl leading-tight mb-4">
            Únete a la red de brokers más grande del país
          </h1>
          <p className="text-[18px] text-orange-100 max-w-2xl mx-auto">
            Más de 4,000 brokers ya ganan comisiones vendiendo el inventario exclusivo de Habi. Regístrate y empieza a cerrar negocios hoy.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { value: '+4,000', label: 'Brokers activos' },
            { value: '+28', label: 'Ciudades con cobertura' },
            { value: '+$50,000M', label: 'En comisiones pagadas' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl text-orange-500 mb-1">{s.value}</p>
              <p className="text-[15px] text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16">
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-10">
          ¿Por qué ser broker Habi?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '\uD83C\uDFE0', title: 'Inventario exclusivo', text: 'Accede a cientos de inmuebles verificados y listos para la venta. Fotos profesionales, documentación al día y precios competitivos.' },
            { icon: '\uD83D\uDCB8', title: 'Comisiones competitivas', text: 'Gana comisiones atractivas por cada negocio cerrado. Pagamos puntualmente y sin complicaciones.' },
            { icon: '\uD83D\uDCBB', title: 'Herramientas digitales', text: 'Usa nuestra plataforma para gestionar leads, compartir inmuebles y hacer seguimiento de tus negocios en tiempo real.' },
          ].map(b => (
            <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <span className="text-4xl block mb-4">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-[20px] text-gray-900 mb-2">{b.title}</h3>
              <p className="text-[16px] text-gray-500 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to join */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-gray-900 text-center mb-12">
            ¿Cómo unirte?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: 1, title: 'Regístrate', text: 'Llena el formulario con tus datos y los de tu inmobiliaria.' },
              { step: 2, title: 'Accede al inventario', text: 'Recibe acceso a nuestra plataforma con todo el inventario disponible.' },
              { step: 3, title: 'Cierra negocios', text: 'Conecta compradores con inmuebles y gana comisiones por cada venta.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-500 text-white font-bold text-[24px] flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[18px] text-gray-900 mb-2">{s.title}</h3>
                <p className="text-[16px] text-gray-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section className="py-16">
        <div className="mx-auto max-w-[600px] px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">&#10003;</span>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-[24px] text-gray-900 mb-2">
                  ¡Registro recibido!
                </h3>
                <p className="text-[16px] text-gray-500">Nuestro equipo revisará tu solicitud y te contactará pronto para darte acceso.</p>
              </div>
            ) : (
              <>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-[24px] text-gray-900 mb-6 text-center">
                  Regístrate como broker
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Nombre completo" required
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
                  <input type="email" placeholder="Correo electrónico" required
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
                  <input type="tel" placeholder="Teléfono" required
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
                  <input type="text" placeholder="Nombre de tu inmobiliaria o empresa"
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" />
                  <select required defaultValue=""
                    className="w-full px-4 py-3 text-[16px] border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-500">
                    <option value="" disabled>Selecciona tu ciudad</option>
                    {CITIES_LIST.map(c => (
                      <option key={c} value={c} className="text-gray-900">{c}</option>
                    ))}
                  </select>
                  <button type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-[16px] hover:bg-purple-700 transition-colors">
                    Quiero ser broker Habi
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
