import "./formulario.css";
import Campo from "../Campo/Campo";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import Button from '@mui/material/Button';
import Boton from "../Boton/boton";
import { useState } from "react";
import {v4 as uuid} from "uuid";

function Formulario(props){

    const [nombre, actualizarNombre] = useState("");
    const [foto, actualizarFoto] = useState("");
    const [telefono, actualizarTelefono] = useState("");
    const [equipo, actualizarEquipo] = useState("");
    const [titulo, actualizarTitulo] = useState("");
    const [color, actualizarColor] = useState("");
    const [ubicacion, actualizarUbicacion] = useState("");

    const {registrarColaborador, crearEquipo} = props;

    const manejarEnvio = (event) =>{
        event.preventDefault();
        const datosEnviar = {
            id: uuid(),
            nombre: nombre,
            foto: foto,
            telefono: telefono,
            equipo: equipo,
            ubicacion: ubicacion,
            fav: false
        }
        registrarColaborador(datosEnviar);
    }

    const manejarNuevoEquipo = (e) =>{
        e.preventDefault();
        crearEquipo({titulo, colorPrimario: color});
    }

    return <section className="formulario">
        <form onSubmit={manejarEnvio}>
            <h2>Rellena el formulario para crear al nuevo colaborador</h2>
            <Campo titulo="Nombre" placeholder="Ingrese nombre" required valor={nombre} actualizarValor={actualizarNombre}/>
            <Campo titulo="Foto" placeholder="Ingrese enlace de foto" required valor={foto} actualizarValor={actualizarFoto}/>
            <Campo titulo="Telefono" placeholder="Ingrese numero de telefono" required valor={telefono} actualizarValor={actualizarTelefono}/>
            <Campo titulo="Ubicacion" placeholder="Ingrese enlace de la ubicacion" required valor={ubicacion} actualizarValor={actualizarUbicacion}/>
            <ListaOpciones valor = {equipo} actualizarValor={actualizarEquipo} equipos={props.data}/>
            <Boton title="Crear Colaborador"/>
            <Button variant="outlined" size="large">Crear Colaborador</Button>
        </form>
        <form onSubmit={manejarNuevoEquipo}>
            <h2>Rellena el formulario para crear el nuevo Equipo</h2>
            <Campo titulo="Titulo" placeholder="Ingrese el titulo" required valor={titulo} actualizarValor={actualizarTitulo}/>
            <Campo titulo="Color" placeholder="Ingrese el color en HEX" required valor={color} actualizarValor={actualizarColor} 
                type = "color"    
            />
            <Boton title="Register Team"/>
        </form>    
    </section>
}

export default Formulario;