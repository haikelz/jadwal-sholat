"use client";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import useGlobalStore from "~store";

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

export default function Map() {
  // set default position to Kota Bandung
  const { position, setPosition } = useGlobalStore((state) => ({
    position: state.position,
    setPosition: state.setPosition,
  }));

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          lat: position.coords.latitude as number,
          lng: position.coords.longitude as number,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [setPosition]);

  return (
    <MapContainer
      preferCanvas={true}
      center={[position.lat, position.lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="md:h-[620px] w-full h-[300px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.lat, position.lng]}>
        <Popup>
          Latitude: {position.lat} <br />
          Longitude: {position.lng}
        </Popup>
      </Marker>
      <DetectPosition />
    </MapContainer>
  );
}
