import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import coracao from '../assets/images/coracao-vermelho.svg';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useLocation } from 'react-router-dom';
import '../assets/styles/mapa-locais.css';

import Header from './Header';
import CardMapa from './CardMapa';
import { buscarRotaOSRM } from '../utils/buscarRotaOSRM';

const AjustarViewParaLocais = ({ locais, posicaoUsuario }) => {
  const map = useMap();

  useEffect(() => {
    const pontos = locais
      .filter(l => l.coordenadas?.latitude && l.coordenadas?.longitude)
      .map(l => [l.coordenadas.latitude, l.coordenadas.longitude]);

    if (posicaoUsuario?.lat && posicaoUsuario?.lng) {
      pontos.push([posicaoUsuario.lat, posicaoUsuario.lng]);
    }

    if (pontos.length > 0) {
      map.fitBounds(pontos, { padding: [50, 50] });
    }
  }, [map, locais, posicaoUsuario]);

  return null;
};

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const heartMarkerIcon = L.icon({
  iconUrl: coracao,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

function calcularDistanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const MapaLocais = () => {
  const [posicaoUsuario, setPosicaoUsuario] = useState(null);
  const [maisProximo, setMaisProximo] = useState(null);
  const [destinoAtual, setDestinoAtual] = useState(null);
  const [rotaReal, setRotaReal] = useState([]);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [locais, setLocais] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosicaoUsuario({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error('Erro ao obter localização:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (state?.locais?.length > 0) {
      setLocais(state.locais);
    } else {
      fetch('https://marago-backend.vercel.app/pontos/?limit=10')
        .then((res) => res.json())
        .then((data) => setLocais(data))
        .catch((err) => console.error('Erro ao buscar locais do banco:', err));
    }
  }, [state]);

  useEffect(() => {
    if (posicaoUsuario && locais.length > 0) {
      const locaisValidos = locais.filter(
        (l) => l.coordenadas?.latitude && l.coordenadas?.longitude
      );

      const maisProximoLocal = locaisValidos.reduce((maisProx, atual) => {
        const distAtual = calcularDistanciaKm(
          posicaoUsuario.lat,
          posicaoUsuario.lng,
          atual.coordenadas.latitude,
          atual.coordenadas.longitude
        );
        return !maisProx || distAtual < maisProx.distancia
          ? { local: atual, distancia: distAtual }
          : maisProx;
      }, null);

      const maisProximo = maisProximoLocal?.local || null;
      setMaisProximo(maisProximo);
      setDestinoAtual(maisProximo);
    }
  }, [posicaoUsuario, locais]);

  useEffect(() => {
    const carregarRota = async () => {
      if (posicaoUsuario && destinoAtual) {
        const coords = await buscarRotaOSRM(
          posicaoUsuario,
          {
            lat: destinoAtual.coordenadas.latitude,
            lng: destinoAtual.coordenadas.longitude,
          }
        );
        setRotaReal(coords);
      }
    };
    carregarRota();
  }, [posicaoUsuario, destinoAtual]);

  const distanciaKm =
    localSelecionado && posicaoUsuario
      ? calcularDistanciaKm(
          posicaoUsuario.lat,
          posicaoUsuario.lng,
          localSelecionado.coordenadas.latitude,
          localSelecionado.coordenadas.longitude
        ).toFixed(2)
      : null;

  const urlGoogleMaps =
    localSelecionado && posicaoUsuario
      ? `https://www.google.com/maps/dir/?api=1&origin=${posicaoUsuario.lat},${posicaoUsuario.lng}&destination=${localSelecionado.coordenadas.latitude},${localSelecionado.coordenadas.longitude}`
      : null;

  return (
    <div className="mapa-locais-container">
      <Header />
      <MapContainer
        center={[posicaoUsuario?.lat || 0, posicaoUsuario?.lng || 0]}
        zoom={14}
        style={{ height: 'calc(100vh - 60px)', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AjustarViewParaLocais locais={locais} posicaoUsuario={posicaoUsuario} />

        {posicaoUsuario && (
          <Marker position={[posicaoUsuario.lat, posicaoUsuario.lng]} icon={defaultIcon}>
            <Popup>📍 Você está aqui</Popup>
          </Marker>
        )}

        {locais
          .filter((local) => local.coordenadas?.latitude && local.coordenadas?.longitude)
          .map((local, i) => {
            const lat = local.coordenadas.latitude;
            const lng = local.coordenadas.longitude;
            const destaque = maisProximo?._id === local._id;

            return (
              <Marker
                key={i}
                position={[lat, lng]}
                icon={heartMarkerIcon}
                eventHandlers={{
                  click: () => {
                    setLocalSelecionado(local);
                    setDestinoAtual(local);
                  }
                }}
              >
                <Popup>
                  <strong>{local.nome}</strong><br />
                  {destaque
                    ? '🌟 Mais próximo de você!'
                    : `${local.cidade}, ${local.estado}`}
                </Popup>
              </Marker>
            );
          })}

        {rotaReal.length > 0 && (
          <Polyline
            positions={rotaReal}
            pathOptions={{ color: '#2c8be8', weight: 5 }}
          />
        )}
      </MapContainer>

      <CardMapa
        local={localSelecionado}
        distanciaKm={distanciaKm}
        urlGoogleMaps={urlGoogleMaps}
        onFechar={() => setLocalSelecionado(null)}
      />
    </div>
  );
};

export default MapaLocais;