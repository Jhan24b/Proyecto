import "./MiniUser.css";
import { PiWhatsappLogoDuotone } from "react-icons/pi";

const MiniUser = (props) => {
  const {user, users} = props;
  const titulo = props.title;
  var foto ="", nombre="", telefono="";

  const userObject = users && users.find(u => u.id === user);

  const contactarUsuario = (numero) => {
    const message = `Hola, ¿cómo estás?, me gustaria informacion sobre ${titulo}`; // Reemplaza esto con el mensaje que deseas enviar

    const whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappURL;
  };

  if (userObject) {
    telefono = userObject.telefono;
    foto = userObject.foto;
    nombre = userObject.nombre;
  }

  return (

    <div className="usuariomini">
      <div className="foto-mini">
        <img src={foto} alt="fotoUsuario"></img>
      </div>
      <div className="detalles">
        <h4>{nombre}</h4>
        <div>calificacion</div>
      </div>
      <div className="contacto">
        <PiWhatsappLogoDuotone
          onClick={() => contactarUsuario(telefono)}
          className="contactar"
        />
      </div>
    </div>
  );
};

export default MiniUser;
