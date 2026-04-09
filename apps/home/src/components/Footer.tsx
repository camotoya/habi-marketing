'use client';
import Image from 'next/image';

const FOOTER_COLS = [
  { title: 'Vender', links: [{ label: 'Vende en 10 días', href: '/vender' }, { label: 'Vende con brokers', href: '/vender' }, { label: '¿Cuánto vale mi casa?', href: '/cuanto-cuesta' }, { label: 'Proceso de venta', href: '#' }] },
  { title: 'Comprar', links: [{ label: 'Ver propiedades', href: '/comprar' }, { label: 'Apartamentos en Bogotá', href: '/comprar' }, { label: 'Casas en Medellín', href: '/comprar' }, { label: 'Crédito hipotecario', href: '/credito' }] },
  { title: 'Empresa', links: [{ label: 'Sobre nosotros', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Trabaja con nosotros', href: '#' }, { label: 'Soy Broker', href: '/broker' }] },
  { title: 'Legal', links: [{ label: 'Términos y condiciones', href: '#' }, { label: 'Política de privacidad', href: '#' }, { label: 'Política de cookies', href: '#' }, { label: 'PQRS', href: '#' }] },
];

const CITIES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena', 'Pereira', 'Armenia', 'Soacha', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta', 'Chía'];

export default function Footer() {
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
            <p className="text-[12px] text-gray-500">&copy; {new Date().getFullYear()} Habi. Todos los derechos reservados.</p>
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
