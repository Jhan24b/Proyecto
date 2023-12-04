import "./expandableAd.css";
import { useState, useEffect } from "react";
import { MagicCard } from "react-magic-motion";
// import { PiWhatsappLogoDuotone } from "react-icons/pi";
import "react-magic-motion/card.css";


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

export default function ExpandableAd(props) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { titulo, precio, foto, producto, usuario } = props.datos;
  const { users } = props;
  const userObject = users && users.find((u) => u.id === usuario);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=myKey&libraries=places`;
    script.async = true;
    script.onload = () => {
      const geocoder = new window.google.maps.Geocoder();
  
      // Use the geocoder to get address details asynchronously
      geocoder.geocode({
        location: {
          lat: userObject.ubicacion[0],
          lng: userObject.ubicacion[1],
        },
      }, (results, status) => {
        if (status === 'OK') {
          // Check if results and addressComponents exist before accessing them
          if (results && results[0] && results[0].address_components) {
            const addressComponents = results[0].address_components;
            // Assuming that city and district are the first and second components respectively
            setCity(addressComponents[0].long_name);
            setDistrict(addressComponents[1].long_name);
          } else {
            console.error('No address components found in the geocoding response.');
          }
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    };
  
    document.head.appendChild(script);
  
    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [userObject]); // Dependency on userObject to trigger the effect when it changes  

  const contactarUsuario = (numero) => {
    const message = `Hola, ¿cómo estás?, me gustaria informacion sobre ${titulo}`; // Reemplaza esto con el mensaje que deseas enviar

    const whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappURL;
  };

  return (
    <MagicCard
      isCardExpanded={isCardExpanded}
      onBackgroundFadeClick={() => setIsCardExpanded(false)}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        style={{
          width: isCardExpanded ? "40rem" : "17rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          padding: "1.35rem 0",
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
            }}
          >
            Mona Lisa
          </h3>

          <button
            style={{ position: "absolute", right: 0, zIndex: 9999 }}
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
          <img
            style={{
              width: isCardExpanded ? "24rem" : "17.5rem",
              height: "auto",
            }}
            alt="Mona Lisa"
            src="https://react-magic-motion.nyc3.cdn.digitaloceanspaces.com/examples/expandable-card/mona-lisa.jpg"
          />
          {isCardExpanded && (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div className="anuncio" style={{ backgroundColor: props.bc }}>
                <div className="anuncio--titulo">{titulo}</div>
                <div className="anuncio--contenido">
                  <div className="contenido--detalles">
                    <h4>{producto}</h4>
                    <h4>{precio}</h4>
                    <h6>{ district + ", " + city}</h6>
                  </div>
                  <div className="contenido--foto">
                    <img src={foto} alt="foto de anuncio"></img>
                  </div>
                </div>
                <div className="usuariomini">
                  <div className="foto-mini">
                    <img src={userObject.foto} alt="fotoUsuario"></img>
                  </div>
                  <div className="detalles">
                    <h4>{userObject.nombre}</h4>
                    <div>calificacion</div>
                  </div>
                  <div className="contacto">
                    {/* <PiWhatsappLogoDuotone
                      onClick={() => contactarUsuario(userObject.telefono)}
                      className="contactar"
                    /> */}
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
}
