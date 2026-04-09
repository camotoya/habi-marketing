const CFG = {
  base: 'https://apiv2.habi.co/habi-cms-sales-api',
  globalCms: 'https://apiv2.habi.co/habi-global-cms-api',
  key: 'K0XAid6g1y3EOOzEByGK78WpMcK4HJlf8uIL8CIS',
};

export interface PropertyImage {
  type_img: number;
  url: string;
  title: string;
  orden: number;
}

export interface Property {
  id: string;
  titulo: string;
  precio: number;
  area: number;
  habitaciones: number;
  banos: number;
  parqueaderos: number;
  estrato: number;
  direccion: string;
  barrio: string;
  conjunto: string;
  antiguedad: number;
  images: PropertyImage[];
  ubicacion_lat: number;
  ubicacion_lng: number;
  inventory_type_id: number;
}

export interface ListResponse {
  data: Property[];
  total: number;
  page: number;
  limit: number;
}

const headers = {
  'x-api-key': CFG.key,
  'Content-Type': 'application/json',
};

/**
 * Fetch a paginated list of properties from the sales API.
 */
export async function getProperties(
  page = 1,
  limit = 12,
  country = 'CO',
): Promise<ListResponse> {
  try {
    const url = new URL(`${CFG.base}/api_read_list_property`);
    url.searchParams.set('country', country);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(limit));

    const res = await fetch(url.toString(), { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();

    return {
      data: json.data ?? json.results ?? [],
      total: json.total ?? json.count ?? 0,
      page,
      limit,
    };
  } catch (err) {
    console.error('[getProperties]', err);
    return { data: [], total: 0, page, limit };
  }
}

/**
 * Fetch a single property by its ID.
 */
export async function getProperty(
  id: string,
  country = 'CO',
): Promise<Property | null> {
  try {
    const url = new URL(`${CFG.globalCms}/api_global_cms_property_card`);
    url.searchParams.set('property_id', id);
    url.searchParams.set('country', country);

    const res = await fetch(url.toString(), { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();

    return (json.data ?? json) as Property;
  } catch (err) {
    console.error('[getProperty]', err);
    return null;
  }
}

/**
 * Format a number as Colombian pesos.
 */
export function formatPrice(n: number): string {
  return '$' + new Intl.NumberFormat('es-CO').format(n);
}

/**
 * Get the resized image URL for a property image.
 */
export function getImageUrl(
  image: PropertyImage,
  size: 'mobile' | 'desktop' = 'desktop',
): string {
  const suffix = size === 'mobile' ? '-414' : '-765';
  return image.url + suffix;
}
