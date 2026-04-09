'use client';
import Image from 'next/image';

const NAV_ITEMS = [
  { id: 'vender', label: 'Vender', href: '/vender' },
  { id: 'comprar', label: 'Comprar', href: '/comprar' },
  { id: 'broker', label: 'Soy Broker', href: '/broker' },
  { id: 'cuanto', label: '¿Cuánto cuesta mi vivienda?', href: '/cuanto-cuesta' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/">
          <Image src="/logo-habi.png" alt="Habi" width={128} height={36} className="h-10 w-auto" priority />
        </a>
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
