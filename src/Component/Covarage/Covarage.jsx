import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Covarage = () => {
  const position = [23.6850, 90.3563];
  return (
    <div>
      <div className="border w-full h-[800px]">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="h-[800px]">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Covarage;
