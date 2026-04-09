import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crédito Hipotecario — Simula y Compara | Habi',
  description:
    'Encuentra el mejor crédito hipotecario. Compara tasas de múltiples bancos, simula tu cuota mensual y obtén pre-aprobación rápida.',
  openGraph: {
    title: 'Crédito Hipotecario — Simula y Compara | Habi',
    description: 'Encuentra el mejor crédito hipotecario.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
