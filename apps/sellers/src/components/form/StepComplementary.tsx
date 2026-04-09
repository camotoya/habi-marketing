'use client';
import { cn } from '@/lib/utils';

interface Props {
  formData: {
    askPrice: number;
    mortgaged: number;
    parkingType: string;
    greenZone: number;
    childrenZone: number;
    bbq: number;
    pool: number;
    gym: number;
    laundryRoom: number;
    wetZones: number;
    communalRoom: number;
  };
  onChange: (field: string, value: number | string) => void;
}

const AMENITIES = [
  { field: 'greenZone', label: 'Zona verde' },
  { field: 'childrenZone', label: 'Zona niños' },
  { field: 'bbq', label: 'Zona BBQ' },
  { field: 'pool', label: 'Piscina' },
  { field: 'gym', label: 'Gimnasio' },
  { field: 'laundryRoom', label: 'Zona lavandería' },
  { field: 'wetZones', label: 'Zonas húmedas' },
  { field: 'communalRoom', label: 'Salón comunal' },
];

export default function StepComplementary({ formData, onChange }: Props) {
  return (
    <div className="space-y-5">
      {/* Precio esperado */}
      <div>
        <label className="block text-[16px] font-medium text-gray-600 mb-1">¿Cuánto esperas recibir por tu inmueble?</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[16px]">$</span>
          <input
            type="number"
            value={formData.askPrice || ''}
            onChange={e => onChange('askPrice', Number(e.target.value))}
            placeholder="Ej: 350000000"
            aria-label="Precio esperado en pesos"
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl text-[16px] outline-none transition-colors focus:border-purple-600"
          />
        </div>
        <p className="text-[13px] text-gray-400 mt-1">Si no estás seguro, puedes dejarlo en blanco</p>
      </div>

      {/* Hipoteca */}
      <div>
        <label className="block text-[16px] font-medium text-gray-600 mb-2" id="mortgage-label">¿Tu inmueble tiene hipoteca vigente?</label>
        <div className="flex gap-2" role="group" aria-labelledby="mortgage-label">
          {[{ label: 'Sí', value: 1 }, { label: 'No', value: 0 }].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('mortgaged', opt.value)}
              className={cn(
                'flex-1 py-3 rounded-xl border-2 text-[16px] font-medium transition-all',
                formData.mortgaged === opt.value
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de parqueadero */}
      <div>
        <label className="block text-[16px] font-medium text-gray-600 mb-2" id="parking-label">Tipo de parqueadero</label>
        <div className="flex gap-2" role="group" aria-labelledby="parking-label">
          {[{ label: 'Privado', value: 'privado' }, { label: 'Comunal', value: 'comunal' }, { label: 'Sin parqueadero', value: 'sin' }].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('parkingType', opt.value)}
              className={cn(
                'flex-1 py-3 rounded-xl border-2 text-[16px] font-medium transition-all',
                formData.parkingType === opt.value
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenidades */}
      <div>
        <label className="block text-[16px] font-medium text-gray-600 mb-2">Amenidades del conjunto</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {AMENITIES.map(a => {
            const val = (formData as Record<string, unknown>)[a.field] as number;
            return (
              <button
                key={a.field}
                type="button"
                onClick={() => onChange(a.field, val === 1 ? 0 : 1)}
                className={cn(
                  'py-2.5 px-3 rounded-xl border-2 text-[14px] font-medium transition-all',
                  val === 1
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                )}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
