import "./formAnuncio.css";
import Campo from "../Campo/Campo";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import Boton from "../Boton/boton";
import { useState } from "react";
import {v4 as uuid} from "uuid";


function FormAnuncio (props) {
    const [titulo, actualizarTitulo] = useState("");
    const [foto, actualizarFoto] = useState("");
    const [telefono, actualizarTelefono] = useState("");
    const [equipo, actualizarEquipo] = useState("");
    // const [color, actualizarColor] = useState("");
    const [usuario, actualizarUsuario] = useState("");
    const [ubicacion, actualizarUbicacion] = useState("");

    const {registrarAnuncio, establecerUser} = props;

    const manejarEnvio = (event) =>{
        event.preventDefault();
        const datosEnviar = {
            id: uuid(),
            titulo: titulo,
            foto: foto,
            usuario: usuario,
            telefono: telefono,
            equipo: equipo,
            ubicacion: ubicacion,
            fav: false
        }
        registrarAnuncio(datosEnviar);
    }


    return (
        <form onSubmit={manejarEnvio}>
            <h2>Registrarse</h2>
            <Campo titulo="Titulo" placeholder="Ingrese el titulo" required valor={titulo} actualizarValor={actualizarTitulo}/>
            <Campo titulo="Foto" placeholder="Ingrese enlace de foto" required valor={foto} actualizarValor={actualizarFoto}/>
            <Campo titulo="Telefono" placeholder="Ingrese numero de telefono" required valor={telefono} actualizarValor={actualizarTelefono}/>
            <Campo titulo="Ubicacion" placeholder="Ingrese enlace de la ubicacion" required valor={ubicacion} actualizarValor={actualizarUbicacion}/>
            <ListaOpciones valor = {equipo} actualizarValor={actualizarEquipo} equipos={props.data}/>
            <Boton title="Publicar"/>
        </form>
    )
}

export default FormAnuncio;