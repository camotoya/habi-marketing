import type { Metadata } from 'next';
import Script from 'next/script';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

const roboto = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Vende tu inmueble | Habi — Avalúo gratuito en minutos',
  description:
    'Vende tu casa o apartamento con Habi. Conoce el valor real de tu inmueble en minutos, gratis y en línea. Oferta de compra directa en 10 días.',
  keywords: ['vender casa', 'vender apartamento', 'avalúo gratis', 'compra directa', 'Habi', 'Colombia'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Habi',
    title: 'Vende tu inmueble | Habi — Avalúo gratuito en minutos',
    description: 'Vende tu casa o apartamento con Habi. Oferta de compra directa en 10 días.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${roboto.variable} antialiased`}>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className="min-h-screen font-[family-name:var(--font-sans)]" style={{ background: '#F0EFF2' }}>
        {children}
        <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
