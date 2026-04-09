import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asesoría Inmobiliaria Gratuita | Habi',
  description:
    'Recibe asesoría inmobiliaria personalizada y gratuita. Expertos certificados te acompañan en cada decisión de compra o venta.',
  openGraph: {
    title: 'Asesoría Inmobiliaria Gratuita | Habi',
    description: 'Recibe asesoría inmobiliaria personalizada y gratuita.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
