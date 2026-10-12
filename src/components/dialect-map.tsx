"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { DialectCard } from "@/components/dialect-card";
import type { DialectPin, MapCopy } from "@/lib/types";
import "leaflet/dist/leaflet.css";

type DialectMapProps = {
  dialects: DialectPin[];
  copy: MapCopy;
};

const armeniaCenter: L.LatLngExpression = [40.15, 44.9];

export function DialectMap({ dialects, copy }: DialectMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selected = dialects.find((dialect) => dialect.id === selectedId) ?? null;

  function closeCard() {
    const id = selectedId;
    setSelectedId(null);
    if (id) chipRefs.current[id]?.focus();
  }

  if (dialects.length === 0) {
    return <p className="rounded-3xl bg-surface px-5 py-10 text-center font-serif text-lg">{copy.empty}</p>;
  }

  return (
    <div>
      <div className="nran-map relative h-[28rem] overflow-hidden rounded-3xl border border-line sm:h-[34rem]">
        <MapContainer
          center={armeniaCenter}
          zoom={7}
          minZoom={4}
          maxZoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FixSize />
          {selected ? (
            <FlyTo latitude={selected.latitude} longitude={selected.longitude} token={selected.id} />
          ) : null}
          {dialects.map((dialect) => (
            <DialectMarker
              key={dialect.id}
              dialect={dialect}
              selected={dialect.id === selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </MapContainer>
        {selected ? <DialectCard dialect={selected} copy={copy} onClose={closeCard} /> : null}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label={copy.listLabel}>
        {dialects.map((dialect) => (
          <li key={dialect.id}>
            <button
              ref={(node) => {
                chipRefs.current[dialect.id] = node;
              }}
              type="button"
              aria-pressed={dialect.id === selectedId}
              className="min-h-11 rounded-full border border-line bg-surface px-4 font-semibold aria-pressed:bg-accent aria-pressed:text-white"
              onClick={() => setSelectedId(dialect.id)}
            >
              {dialect.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DialectMarker({
  dialect,
  selected,
  onSelect,
}: {
  dialect: DialectPin;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "dialect-pin",
        html: `<span class="dialect-pin__dot${selected ? " is-active" : ""}"></span>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      }),
    [selected],
  );

  return (
    <Marker
      position={[dialect.latitude, dialect.longitude]}
      icon={icon}
      keyboard
      alt={dialect.name}
      title={dialect.name}
      eventHandlers={{ click: () => onSelect(dialect.id) }}
    />
  );
}

function FixSize() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

function FlyTo({
  latitude,
  longitude,
  token,
}: {
  latitude: number;
  longitude: number;
  token: string;
}) {
  const map = useMap();
  useEffect(() => {
    const zoom = Math.max(map.getZoom(), 9);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) map.setView([latitude, longitude], zoom);
    else map.flyTo([latitude, longitude], zoom, { duration: 0.65 });
  }, [latitude, longitude, token, map]);
  return null;
}
