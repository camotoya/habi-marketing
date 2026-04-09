import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Comprar inmueble | Habi',
  description:
    'Encuentra casas y apartamentos verificados en las principales ciudades de Colombia. Compra tu próximo hogar con Habi.',
  keywords: [
    'comprar casa',
    'comprar apartamento',
    'inmuebles Colombia',
    'propiedades Bogotá',
    'propiedades Medellín',
    'Habi',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Habi',
    title: 'Comprar inmueble | Habi',
    description:
      'Encuentra casas y apartamentos verificados en las principales ciudades de Colombia.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${roboto.variable} antialiased`}>
      <body className="min-h-screen bg-[#F0EFF2] font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
