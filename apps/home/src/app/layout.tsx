import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import Script from 'next/script';
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
  title: {
    default: 'Habi — Tu mejor decisión inmobiliaria',
    template: '%s | Habi',
  },
  description: 'Vende, compra o conoce el valor de tu inmueble con Habi. Compra directa en 10 días, red de +4,000 brokers, o el mejor inventario inmobiliario de Colombia.',
  keywords: ['inmobiliaria', 'vender casa', 'comprar apartamento', 'avalúo', 'Colombia', 'Bogotá', 'Medellín'],
  authors: [{ name: 'Habi' }],
  creator: 'Habi',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Habi',
    title: 'Habi — Tu mejor decisión inmobiliaria',
    description: 'Vende, compra o conoce el valor de tu inmueble con Habi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habi — Tu mejor decisión inmobiliaria',
    description: 'Vende, compra o conoce el valor de tu inmueble con Habi.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Habi',
              url: 'https://habi.co',
              logo: 'https://habi.co/logo-habi.png',
              description: 'Plataforma inmobiliaria líder en Colombia. Compra directa, red de brokers y el mejor inventario.',
              areaServed: { '@type': 'Country', name: 'Colombia' },
              sameAs: [
                'https://www.instagram.com/haboratorio/',
                'https://www.facebook.com/Haboratorio/',
                'https://www.youtube.com/@haboratorio',
                'https://www.linkedin.com/company/haboratorio/',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F0EFF2] font-[family-name:var(--font-sans)] antialiased text-gray-900">
        {children}
        <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
