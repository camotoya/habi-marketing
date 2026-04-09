'use client';

interface Props {
  formData: {
    saleReason: string;
    saleTimeMonths: number;
  };
  onChange: (field: string, value: string | number) => void;
}

export default function StepExitPoll({ formData, onChange }: Props) {
  return (
    <div className="space-y-5">
      {/* Razón de venta */}
      <div>
        <label className="block text-[16px] font-medium text-gray-600 mb-1">¿Por qué quieres vender tu inmueble?</label>
        <textarea
          value={formData.saleReason}
          onChange={e => onChange('saleReason', e.target.value)}
          placeholder="Ej: Necesito mudarme a otra ciudad, quiero una propiedad más grande..."
          maxLength={100}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-[16px] outline-none transition-colors focus:border-purple-600 resize-none"
        />
        <p className="text-[13px] text-gray-400 mt-1">{formData.saleReason.length}/100 caracteres</p>
      </div>

      {/* Tiempo esperado de venta */}
      <div>
        <label className="block text-[16px] font-medium text-gray-600 mb-1" id="sale-time-label">¿En cuánto tiempo esperas vender?</label>
        <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="sale-time-label">
          {[
            { label: '1 mes', value: 1 },
            { label: '3 meses', value: 3 },
            { label: '6 meses', value: 6 },
            { label: '12 meses', value: 12 },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('saleTimeMonths', opt.value)}
              className={`py-3 rounded-xl border-2 text-[15px] font-medium transition-all ${
                formData.saleTimeMonths === opt.value
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-[13px] text-gray-400 mt-2">O ingresa un número específico de meses:</p>
        <input
          type="number"
          value={formData.saleTimeMonths || ''}
          onChange={e => onChange('saleTimeMonths', Number(e.target.value))}
          placeholder="Meses"
          min={0}
          max={120}
          aria-label="Número de meses para vender"
          className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl text-[16px] outline-none transition-colors focus:border-purple-600 mt-1"
        />
      </div>
    </div>
  );
}
