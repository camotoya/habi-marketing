'use client';
import { useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useFormState } from '@/hooks/useFormState';
import * as api from '@/lib/api';

import ProgressBar from '@/components/layout/ProgressBar';
import StepsNav from '@/components/layout/StepsNav';

import PropertyTypeSelector from '@/components/form/PropertyTypeSelector';
import CityAndAddress from '@/components/form/CityAndAddress';
import StepCatastral from '@/components/form/StepCatastral';
import StepCharacteristics from '@/components/form/StepCharacteristics';
import StepDetails from '@/components/form/StepDetails';
import StepContact from '@/components/form/StepContact';
import StepComplementary from '@/components/form/StepComplementary';
import StepExitPoll from '@/components/form/StepExitPoll';

import ResultCards from '@/components/panel/ResultCards';

import ResultsHero from '@/components/results/ResultsHero';
import EligibilityCards from '@/components/results/EligibilityCards';
import PropertyTags from '@/components/results/PropertyTags';
const PriceChart = dynamic(() => import('@/components/results/PriceChart'), { ssr: false });
import CostsTable from '@/components/results/CostsTable';
import ResultsCTA from '@/components/results/ResultsCTA';

// Steps 1-4 are obligatory (before lead creation)
// Steps 5-6 are optional (after lead creation)
const STEPS = [
  { label: 'Ubicación' },
  { label: 'Características' },
  { label: 'Detalles' },
  { label: 'Tus datos' },
  { label: 'Complemento' },
  { label: 'Encuesta' },
];
const TOTAL_STEPS = 6;
const SUBMIT_STEP = 4; // Lead is created at step 4

export default function SellersPage() {
  const {
    formData, updateForm, apiState, updateApi,
    currentStep, setCurrentStep,
    loading, setLoading, loadingMsg, setLoadingMsg,
    showResults, setShowResults, reset,
  } = useFormState();

  const lastFetchedAddress = useRef('');
  const leadCreated = useRef(false);

  useEffect(() => {
    api.getCities().then(cities => updateApi({ cities })).catch(console.error);
  }, [updateApi]);

  // Step 1 validation
  const numRegex = /^\d{1,3}([a-zA-Z\s]*)?$/;
  const step1Valid = !!(formData.city && formData.tipoVia
    && formData.num1 && numRegex.test(formData.num1)
    && formData.num2 && numRegex.test(formData.num2)
    && formData.num3 && numRegex.test(formData.num3));

  // Step 1 complete → georef + catastral + POIs + DANE + median zone
  const onStep1Complete = useCallback(async () => {
    if (!formData.address || !formData.city) return;
    const addressKey = `${formData.city}|${formData.address}|${formData.propertyType}`;
    if (addressKey !== lastFetchedAddress.current) {
      updateApi({ georef: null, catastral: null, pois: null, daneCode: null, medianZone: null, discarded: null });
      lastFetchedAddress.current = addressKey;
    } else return;

    try {
      const georef = await api.getGeoref(formData.address, formData.city, formData.propertyType);
      updateApi({ georef });
      const promises: Promise<void>[] = [];
      if (georef.latitude && georef.longitude) {
        promises.push(api.getPlacesOfInterest(georef.latitude, georef.longitude).then(pois => updateApi({ pois })).catch(console.error));
        promises.push(api.getDaneCode(georef.latitude, georef.longitude).then(daneCode => updateApi({ daneCode })).catch(console.error));
      }
      if (georef.median_zone_id) {
        promises.push(api.getMedianZoneInfo(georef.median_zone_id).then(medianZone => updateApi({ medianZone })).catch(console.error));
      }
      promises.push(api.getPropertyGeoDetails(formData.address).then(raw => updateApi({ catastral: api.parseCatastral(raw) })).catch(console.error));
      await Promise.all(promises);
    } catch (e) { console.error('Georef failed:', e); }
  }, [formData.address, formData.city, formData.propertyType, updateApi]);

  // Step 2 complete → check discarded
  const onStep2Complete = useCallback(async () => {
    const geo = apiState.georef;
    if (!geo || !formData.area) return;
    try {
      const disc = await api.getDiscarded({
        area: String(formData.area), property_type_id: String(formData.propertyType),
        stratum: String(formData.stratum), city_id: String(formData.cityId || geo.city_id || ''),
        latitude: String(geo.latitude || ''), longitude: String(geo.longitude || ''),
        median_zone_id: String(geo.median_zone_id || ''), years_old: String(formData.age),
      });
      updateApi({ discarded: disc });
    } catch (e) { console.error('Discarded failed:', e); }
  }, [apiState.georef, formData, updateApi]);

  // Submit — creates lead + gets avalúo (step 4)
  const onSubmit = useCallback(async () => {
    setLoading(true);
    setLoadingMsg('Registrando tu inmueble...');
    const msgs = ['Analizando ubicación...', 'Consultando mercado...', 'Comparando inmuebles...', 'Calculando costos...', 'Generando reporte...'];
    let i = 0;
    const iv = setInterval(() => { if (++i < msgs.length) setLoadingMsg(msgs[i]); }, 800);
    try {
      const geo = apiState.georef || {} as Record<string, unknown>;
      const payload: Record<string, unknown> = {
        direccion: formData.address, primera_direccion_ingresada: formData.address,
        ciudad: formData.cityName || formData.city, pais: 'CO',
        area: formData.area || 80, banos: formData.bathrooms, estrato: formData.stratum,
        garajes: formData.garages, num_habitaciones: formData.rooms, anos_antiguedad: formData.age,
        fuente_id: 7, tipo_inmueble_id: formData.propertyType, tipo_negocio_id: 1,
        ask_price: formData.askPrice || 0, terms_accepted: true,
        blacklist: 0, fuera_de_la_zona: 0, descartado_por_inmueble: 0,
        descartado_por_ultimo_piso_sin_ascensor: 0, descartado_por_antiguedad: 0,
        nombre_o_inmobiliaria: formData.name || 'Habi User', telefono: formData.phone || '',
        correo: formData.email || '', agente: 'Habi Nuevo',
        num_ascensores: formData.elevator, num_piso: formData.floor || 0,
        balcon: formData.balcony, terraza: formData.terrace, deposito: formData.storage,
        porteria: formData.doorman, remodelado: formData.remodeled,
        vista_exterior: formData.view !== 'Interna' ? 1 : 0,
        conjunto_edificio: (geo as Record<string, unknown>).project || '',
        nombre_conjunto: (geo as Record<string, unknown>).project || '',
      };
      if (apiState.daneCode) payload.cod_sect = apiState.daneCode;
      if (apiState.pois) payload.places_of_interest = { result: apiState.pois, success: true };

      const postRes = await api.postHabimetro(payload);
      updateApi({ postResult: postRes });
      if (!postRes.negocio_id || !postRes.inmueble_id) throw new Error('POST habimetro sin IDs');
      const result = await api.getHabimetro(postRes.negocio_id, postRes.inmueble_id);
      updateApi({ habimetro: result });
      clearInterval(iv);
      setLoading(false);
      leadCreated.current = true;
      // Move to step 5 (complementary) instead of showing results
      setCurrentStep(5);
    } catch (e) {
      clearInterval(iv);
      setLoading(false);
      alert('El servicio no está disponible. Contacta al equipo de backend.\n\nError: ' + (e as Error).message);
    }
  }, [formData, apiState, updateApi, setLoading, setLoadingMsg, setCurrentStep]);

  // Navigation
  const goNext = async () => {
    if (currentStep === 1) await onStep1Complete();
    if (currentStep === 2) await onStep2Complete();
    if (currentStep < TOTAL_STEPS) setCurrentStep(currentStep + 1);
  };
  const goBack = () => {
    if (currentStep > 1) {
      if (currentStep === 2) lastFetchedAddress.current = '';
      // Don't go back past step 4 if lead was already created
      if (leadCreated.current && currentStep <= 5) return;
      setCurrentStep(currentStep - 1);
    }
  };
  const finishForm = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Button helpers
  const btnPrimary = "flex-1 py-3.5 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-200";
  const btnBack = "px-4 py-3 text-gray-500 hover:text-purple-600 font-medium";
  const btnSkip = "px-4 py-3 text-gray-400 hover:text-gray-600 font-medium text-[14px]";

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-5" />
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl mb-2">Analizando tu inmueble</h2>
        <p className="text-gray-500">{loadingMsg}</p>
      </div>
    </div>
  );

  // ── Results ──
  if (showResults && apiState.habimetro) {
    const hm = apiState.habimetro;
    const vH = api.normalizeHistoric(hm.historico_precio_venta || hm.historico_precios);
    const aH = api.normalizeHistoric(hm.historico_precio_arriendo || hm.historico_arriendos);
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <ResultsHero avaluo={hm.avaluo} pricing={hm.pricing} />
        <EligibilityCards discarded={apiState.discarded} georef={apiState.georef} />
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-heading)] font-bold mb-4">Tu inmueble</h3>
            <PropertyTags formData={formData} />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-heading)] font-bold mb-4">Histórico de precios</h3>
            <div className="h-[240px]"><PriceChart ventaData={vH} arriendoData={aH} /></div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-heading)] font-bold mb-4">Costos de venta estimados</h3>
            <CostsTable costs={hm.costos_transaccionales || []} totalValue={hm.avaluo?.venta_valorestimadototal || 0} />
          </div>
        </div>
        <ResultsCTA onRestart={reset} />
      </div>
    );
  }

  // ── Form ──
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">
        <ProgressBar step={currentStep} totalSteps={TOTAL_STEPS} />
        <StepsNav currentStep={currentStep} totalSteps={TOTAL_STEPS} steps={STEPS} />

        {/* Step 1: Ubicación */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[22px]">Cuéntanos sobre tu inmueble</h2>
            <PropertyTypeSelector value={formData.propertyType} onChange={v => updateForm({ propertyType: v })} />
            <CityAndAddress
              cities={apiState.cities} cityValue={formData.city}
              onCityChange={c => updateForm({ city: c.name, cityName: c.label, cityId: c.id })}
              tipoVia={formData.tipoVia} num1={formData.num1} num2={formData.num2} num3={formData.num3}
              address={formData.address} onAddressChange={(f, v) => updateForm({ [f]: v })}
            />
            <button onClick={goNext} disabled={!step1Valid} className={`w-full py-3.5 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200 disabled:shadow-none`}>Continuar</button>
          </div>
        )}

        {/* Step 2: Características */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[22px]">Características de tu inmueble</h2>
            {apiState.catastral && (formData.propertyType === 1 || formData.propertyType === 3) && (
              <StepCatastral catastral={apiState.catastral} propertyType={formData.propertyType} project={apiState.georef?.project || ''} onSelectUnit={(u, a) => updateForm({ unit: u, ...(a ? { area: a } : {}) })} />
            )}
            <StepCharacteristics formData={formData} onChange={(f, v) => updateForm({ [f]: v })} />
            <div className="flex gap-3">
              <button onClick={goBack} className={btnBack}>Atrás</button>
              <button onClick={goNext} className={btnPrimary}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 3: Detalles */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[22px]">Detalles adicionales</h2>
            <StepDetails formData={formData} onChange={(f, v) => updateForm({ [f]: v })} />
            <div className="flex gap-3">
              <button onClick={goBack} className={btnBack}>Atrás</button>
              <button onClick={goNext} className={btnPrimary}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 4: Datos de contacto → CREA EL LEAD */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[22px]">¿A dónde enviamos tu resultado?</h2>
            <StepContact formData={formData} onChange={(f, v) => updateForm({ [f]: v })} />
            <div className="flex gap-3">
              <button onClick={goBack} className={btnBack}>Atrás</button>
              <button onClick={onSubmit} className={btnPrimary}>Ver mi resultado</button>
            </div>
          </div>
        )}

        {/* Step 5: Complementarias (post-registro, opcional) */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-[22px]">Información complementaria</h2>
              <p className="text-[15px] text-gray-400 mt-1">Opcional — estos datos nos ayudan a darte un mejor servicio</p>
            </div>
            <StepComplementary formData={formData} onChange={(f, v) => updateForm({ [f]: v })} />
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(6)} className={btnSkip}>Omitir</button>
              <button onClick={() => setCurrentStep(6)} className={btnPrimary}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 6: Exit poll (post-registro, opcional) */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-[22px]">Una última pregunta</h2>
              <p className="text-[15px] text-gray-400 mt-1">Opcional — nos ayuda a entender mejor tus necesidades</p>
            </div>
            <StepExitPoll formData={formData} onChange={(f, v) => updateForm({ [f]: v })} />
            <div className="flex gap-3">
              <button onClick={finishForm} className={btnSkip}>Omitir y ver resultado</button>
              <button onClick={finishForm} className={btnPrimary}>Ver mi resultado</button>
            </div>
          </div>
        )}
      </div>

      {/* Result cards — always visible */}
      <ResultCards georef={apiState.georef} pois={apiState.pois} medianZone={apiState.medianZone} address={formData.address} />
    </main>
  );
}
