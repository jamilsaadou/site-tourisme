"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Locale } from "@/lib/locales";

type DestinationPoint = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  lat: number;
  lng: number;
};

type DestinationMapProps = {
  locale: Locale;
};

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function DestinationMap({ locale }: DestinationMapProps) {
  const [points, setPoints] = useState<DestinationPoint[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/map/destinations?locale=${locale}`);
      const data = (await response.json()) as { points: DestinationPoint[] };
      setPoints(data.points);
    };

    load().catch(() => setPoints([]));
  }, [locale]);

  const center = useMemo<[number, number]>(() => {
    if (points.length === 0) {
      return [13.5116, 2.1254];
    }

    return [points[0].lat, points[0].lng];
  }, [points]);

  return (
    <div className="glass-surface relative overflow-hidden rounded-3xl p-3">
      <div className="texture-overlay" />
      <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-3 px-2">
        <p className="section-kicker">Cartographie OSM</p>
        <p className="text-xs font-semibold tracking-[0.12em] text-[#2f6d4a] uppercase">{points.length} points</p>
      </div>

      <MapContainer center={center} zoom={5} className="relative z-10 h-[350px] w-full rounded-2xl">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={icon}>
            <Popup>
              <p className="font-semibold">{point.title}</p>
              <p>{point.summary}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
