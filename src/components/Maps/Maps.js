import "./Maps.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Maps = () => {
  return (
    <div className="mapa">
      <MapContainer center={[-12.066666666667, -75.216666666667]} zoom={13} scrollWheelZoom={false} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-12.0667, -75.2167]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
