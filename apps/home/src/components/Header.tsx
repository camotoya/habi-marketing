'use client';
import { useState } from 'react';

const BASE = '/habi-marketing';

const NAV_ITEMS = [
  { id: 'vender', label: 'Vender', href: `${BASE}/` },
  { id: 'comprar', label: 'Comprar', href: `${BASE}/` },
  { id: 'broker', label: 'Soy Broker', href: `${BASE}/broker` },
  { id: 'cuanto', label: '¿Cuánto cuesta mi vivienda?', href: `${BASE}/` },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg">
        Ir al contenido principal
      </a>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href={`${BASE}/`}>
          <img src={`${BASE}/logo-habi.png`} alt="Habi" className="h-10 w-auto" />
        </a>
        <nav role="navigation" aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a key={item.id} href={item.href} className="px-4 py-2 rounded-full text-[15px] font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
      {menuOpen && (
        <nav id="mobile-menu" role="navigation" aria-label="Navegación móvil" className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <a key={item.id} href={item.href} className="block px-4 py-2.5 rounded-lg text-[15px] font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
