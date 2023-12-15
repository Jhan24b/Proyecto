import "./Maps.css";
import { useState, useEffect } from "react";
import { useMapEvents, useMap } from "react-leaflet/hooks";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import React from "react";
// import GoogleMapReact from "google-map-react";
import { Geocoder } from '@googlemaps/react-wrapper';

// const AnyReactComponent = ({ feature, text }) => {
//   const iconBase =
//     "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
//   const icons = {
//     parking: {
//       icon: iconBase + "parking_lot_maps.png",
//     },
//     library: {
//       icon: iconBase + "library_maps.png",
//     },
//     info: {
//       icon: iconBase + "info-i_maps.png",
//     },
//   };
//   <div>{text}</div>;
//   const marker = new google.maps.Marker({
//     position: feature.position,
//     icon: icons[feature.type].icon,
//     map: map,
//   });
// };

// const defaultProps = {
//   center: {
//     lat: -12.0686,
//     lng: -75.2103,
//   },
//   zoom: 14,
// };

// const map = () => {
//   <GoogleMapReact
//     bootstrapURLKeys={{ key: "" }}
//     defaultCenter={defaultProps.center}
//     defaultZoom={defaultProps.zoom}
//   >
//     <AnyReactComponent lat={-12.0686} lng={-75.2103} text="My Marker" />
//   </GoogleMapReact>;
// };

const Maps = (props) => {
  const [position, setPosition] = useState([-12.067, -75.2167]);
  const { addDB, register, general } = props;

  function MyComponent({ setPosition }) {
    const map = useMapEvents({
      click: async (e) => {
        await map.locate();
        setPosition([e.latlng.lat, e.latlng.lng]);
        register([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  function LocationMarker() {
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <div>
      {/* mapa con google */}
      {/* <div
        style={{
          height: "75vh",
          width: "80%",
          display: "flex",
          justifyContent: "center",
        }}
      ></div> */}

      {/* mapa con leaflet */}
      <div className="mapa">
        {general && (
          <MapContainer
            center={position}
            zoom={13}
            className="leaflet-container"
          >
            {register && <LocationMarker />}
            <MyComponent setPosition={setPosition} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Ubicacion Seleccionada</Popup>
            </Marker>
            {addDB &&
              addDB.map((dato, idx) => {
                return (
                  <Marker
                    key={idx}
                    position={[dato.ubicacion[0], dato.ubicacion[1]]}
                  >
                    <Popup>{dato.titulo}</Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        )}
        {register && (
          <MapContainer center={position} zoom={13} className="leaflet-profile">
            <LocationMarker />
            <MyComponent setPosition={setPosition} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Ubicacion Seleccionada</Popup>
            </Marker>
            {
          addDB && addDB.map((dato) => {
            return (
              <Marker
                position={dato.ubicacion}>
                  <Popup>{dato.titulo}</Popup>
              </Marker>
            );
          })
        }
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Maps;
