import "./Maps.css";
import {useState, useEffect} from "react";
import { useMapEvents, useMap } from 'react-leaflet/hooks'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

const Maps = (props) => {
  const [position, setPosition] = useState([-12.067, -75.2167]);
  const { addDB } = props;

  function MyComponent({ setPosition }) {
    const map = useMapEvents({
      click: async (e) => {
        await map.locate();
        setPosition([e.latlng.lat, e.latlng.lng]);
        console.log('Nueva posición:', [e.latlng.lat, e.latlng.lng]);
        console.log("almacenado:", position);
      },
    });
  
    return null;
  }

  // function LocationMarker() {
  //   const [position, setPosition] = useState(null);
  //   const [bbox, setBbox] = useState([]);

  //   const map = useMap();

  //   useEffect(() => {
  //     map.locate().on("locationfound", function (e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //       const radius = e.accuracy;
  //       const circle = L.circle(e.latlng, radius);
  //       circle.addTo(map);
  //       setBbox(e.bounds.toBBoxString().split(","));
  //     });
  //   }, [map]);

  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>
  //         You are here. <br />
  //         Map bbox: <br />
  //         <b>Southwest lng</b>: {bbox[0]} <br />
  //         <b>Southwest lat</b>: {bbox[1]} <br />
  //         <b>Northeast lng</b>: {bbox[2]} <br />
  //         <b>Northeast lat</b>: {bbox[3]}
  //       </Popup>
  //     </Marker>
  //   );
  // }

  return (
    <div className="mapa">
      <MapContainer
        center={position}
        zoom={13}
        className="leaflet-container"
      >
        {/* <LocationMarker/> */}
        <MyComponent setPosition={setPosition}/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Ubicacion Seleccionada</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
