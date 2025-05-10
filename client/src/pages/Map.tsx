import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SubmitButton from "../components/SubmitButton";
import MarkerClusterGroup from "react-leaflet-cluster"
import { useModalStore } from "../store/modalStore";
import { PostModal } from "../components/PostModal";
import { useAuthStore } from "../store/authStore";

const Map: React.FC = () => {
  const turkeyBounds: L.LatLngBoundsExpression = [
    [35.0, 25.0],
    [43.0, 45.0],
  ];

  const markers = [
    {
    geocode: [39.92, 32.85],
    popUp: "Ankara'dan yardım talebi",
    },
    {
    geocode: [39.9736832, 30.5136511],
    popUp: "Ankara'dan yardım talebi",
    },
    {
    geocode: [41.01, 28.97],
    popUp: "İstanbul'dan yardım talebi",
    },
    {
    geocode: [40.98, 29.20],
    popUp: "İstanbul'dan yardım talebi",
    },
    {
    geocode: [41.02, 28.79],
    popUp: "İstanbul'dan yardım talebi",
    },
  ];

  const open = useModalStore((state) => state.open);
  
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <PostModal></PostModal>
      <div className="flex flex-col gap-4 items-center justify-center p-4">
        <SubmitButton onClick={open} style={{width: "150px"}} disabled={!isLoggedIn}>Yardım Talebi</SubmitButton>
        <MapContainer
        center={[39.92, 32.85]}
        zoom={6}
        minZoom={6}
        maxBounds={turkeyBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "70vh", width: "70%", borderRadius: "16px", zIndex: "10"}}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers.map((marker, idx) => (
            <Marker key={idx} position={marker.geocode as [number, number]}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
       </MapContainer>
      </div>
    </div>
  );
};

export default Map;
