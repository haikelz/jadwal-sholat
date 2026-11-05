"use client";

import useGlobalStore from "@/store";
import "leaflet-defaulticon-compatibility";
import iconCss from "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css?url";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import searchCss from "leaflet-geosearch/dist/geosearch.css?url";
import leafletCss from "leaflet/dist/leaflet.css?url";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

function SearchField() {
  const provider = useMemo(() => new OpenStreetMapProvider(), []);

  const map = useMap();

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, provider]);

  return null;
}

function DetectPosition() {
  const { setPosition, setIsOpenMap } = useGlobalStore((state) => ({
    setPosition: state.setPosition,
    setIsOpenMap: state.setIsOpenMap,
  }));

  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      setIsOpenMap(false);
    },
  });

  return null;
}

export function Map() {
  // set default position to Kota Bandung
  const { position } = useGlobalStore((state) => ({
    position: state.position,
  }));

  // Linked here rather than imported, so the homepage's <head> doesn't wait on
  // the map's CSS before first paint; React loads it with the map and the
  // dialog's Suspense fallback shows until it has.
  return (
    <>
      <link rel="stylesheet" href={leafletCss} precedence="default" />
      <link rel="stylesheet" href={iconCss} precedence="default" />
      <link rel="stylesheet" href={searchCss} precedence="default" />
      <MapContainer
        preferCanvas={true}
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-75 w-full md:h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchField />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            Latitude: {position.lat} <br />
            Longitude: {position.lng}
          </Popup>
        </Marker>
        <DetectPosition />
      </MapContainer>
    </>
  );
}
