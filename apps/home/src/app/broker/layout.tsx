import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Únete a la Red de Brokers Más Grande de Colombia | Habi',
  description:
    'Más de 4,000 brokers confían en Habi. Accede a inventario exclusivo, comisiones competitivas y herramientas digitales.',
  openGraph: {
    title: 'Únete a la Red de Brokers | Habi',
    description: 'Más de 4,000 brokers confían en Habi.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
