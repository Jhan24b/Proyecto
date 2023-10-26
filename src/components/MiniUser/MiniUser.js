import "./MiniUser.css";
import {PiWhatsappLogoDuotone} from "react-icons/pi"

const MiniUser = (props) => {
    const {nombre, foto, telefono} = props.user;
    const titulo = props.title;

    const contactarUsuario = (numero) =>{
        const message = `Hola, ¿cómo estás?, me gustaria informacion sobre ${titulo}`; // Reemplaza esto con el mensaje que deseas enviar
      
        const whatsappURL = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappURL;
    }

    return (<div className="usuariomini">
        <div className="foto-mini">
            <img src={foto} alt="fotoUsuario"></img>
        </div>
        <div className="detalles">
            <h3>{nombre}</h3>
            <div>calificacion</div>
            <div className="contacto">
            <PiWhatsappLogoDuotone onClick={() => contactarUsuario(telefono)} className="contactar"/>
            </div>
        </div>
    </div>);
}

export default MiniUser;