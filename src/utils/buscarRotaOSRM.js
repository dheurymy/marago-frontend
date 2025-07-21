export async function buscarRotaOSRM(origem, destino) {
  const coordsOrigem = `${origem.lng},${origem.lat}`;
  const coordsDestino = `${destino.lng},${destino.lat}`;

  const url = `https://router.project-osrm.org/route/v1/driving/${coordsOrigem};${coordsDestino}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes || data.routes.length === 0) return [];

  const rota = data.routes[0].geometry.coordinates;

  // GeoJSON usa [lng, lat] — Leaflet espera [lat, lng]
  return rota.map(([lng, lat]) => [lat, lng]);
}