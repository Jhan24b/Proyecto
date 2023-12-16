import { useState, useEffect } from "react";
import { MagicCard } from "react-magic-motion";
// import { PiWhatsappLogoDuotone } from "react-icons/pi";
import "react-magic-motion/card.css";
import { setDefaults, geocode, RequestType } from "react-geocode";
import { Geocoder } from "@googlemaps/react-wrapper";

setDefaults({
  key: "AIzaSyDLMWwyw7Y4HH3eHb6c-VVizg_kQUCW2-A", // Your API key here.
  language: "es", // Default language for responses.
  region: "es", // Default region for responses.
});

function CloseFullscreenSvg() {
  return (
    <>
      <rect
        x="1"
        y="16"
        width="14"
        height="15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M26 5L18 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 13H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 13V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  );
}

function OpenFullscreenSvg() {
  return (
    <>
      <rect
        x="1"
        y="8"
        width="21"
        height="23"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 24L15 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 16H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 16V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  );
}

const ExpandableAd = (props) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { datos, users, bc } = props;
  const { titulo, precio, foto, producto, usuario, descripcion } = datos;
  const userObject = users.find((u) => u.id === usuario) || {};
  const [lugar, setLugar] = useState("Lia Lover");
  const [coordenada, setCoordenada] = useState({
    lat: userObject.ubicacion[0],
    lng: userObject.ubicacion[1],
  });

  // const showDirection = () => {
  //   // Add logic for showing directions
  // };

  const contactarUsuario = (numero) => {
    const message = `Hola, ¿cómo estás?, me gustaría información sobre ${titulo}`;

    const whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappURL;
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await geocode(
    //       RequestType.LATLNG,
    //       "12.06513,75.20486",
    //       { language: "en", region: "sp", enable_address_descriptor: true, search_radius: 5000 }
    //     );
    //     setLatlngResponse(Object.entries(response));
    //     console.log("here");
    //     console.log(userObject.ubicacion,coordenada);
    //     console.log(latlngResponse);
    //     // setLugar(latlngResponse[1][1][0].formatted_address);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    // fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <MagicCard
      isCardExpanded={isCardExpanded}
      onBackgroundFadeClick={() => setIsCardExpanded(false)}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        style={{
          width: isCardExpanded ? "26rem" : "12rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          // padding: "1.8rem 0",
          margin: isCardExpanded ? "" : "10px",
          color: isCardExpanded ? "white" : "currentColor",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: "1.4em",
              width: "80%",
            }}
          >
            {titulo}
          </h3>

          <button
            style={{ position: "absolute", right: "5px", zIndex: 9999 }}
            onClick={() => setIsCardExpanded(!isCardExpanded)}
          >
            <svg
              key="exclude"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isCardExpanded ? <CloseFullscreenSvg /> : <OpenFullscreenSvg />}
            </svg>
          </button>
        </div>
        <div style={{ overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: isCardExpanded ? "center" : "",
            }}
          >
            <img
              style={{
                width: isCardExpanded ? "12rem" : "8.75rem",
                height: "auto",
              }}
              src={foto}
              alt="foto de anuncio"
            />
          </div>
          {isCardExpanded && (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: bc,
                  borderRadius: "8px",
                  height: "320px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4>{producto}</h4>
                    <h4>{descripcion}</h4>
                    <h4>{precio}</h4>
                    <h6>{lugar}</h6>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    padding: "12px 0px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "4px",
                    }}
                  >
                    <img src={userObject.foto} alt="fotoUsuario"></img>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4>{userObject.nombre}</h4>
                    <div>calificacion</div>
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <button
                      onClick={() => contactarUsuario(userObject.telefono)}
                      className="contactar"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </MagicCard>
  );
};

export default ExpandableAd;
