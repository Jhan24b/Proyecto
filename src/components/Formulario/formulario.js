import "./formulario.css";
import Campo from "../Campo/Campo";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import Boton from "../Boton/boton";
import { useState } from "react";
import {v4 as uuid} from "uuid";

function Formulario(props){

    const [nombre, actualizarNombre] = useState("");
    const [foto, actualizarFoto] = useState("");
    const [telefono, actualizarTelefono] = useState("");
    const [equipo, actualizarEquipo] = useState("");
    // const [titulo, actualizarTitulo] = useState("");
    // const [color, actualizarColor] = useState("");
    const [ubicacion, actualizarUbicacion] = useState("");
    const [email, actualizarEmail] = useState("");
    const [password, actualizarPassword] = useState("");

    const {registrarColaborador, establecerUser} = props;

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

    // const manejarNuevoEquipo = (e) =>{
    //     e.preventDefault();
    //     crearEquipo({titulo, colorPrimario: color});
    // }

    const manejarInicioSesion = (e) =>{
        e.preventDefault();
        establecerUser({nombre: 'Daniel Lopez',
        dni: 10101010,
        
        });
    }

    return <section className="formulario">
        {(props.tipoForm === "SignUp")&&(<form onSubmit={manejarEnvio}>
            <h2>Registrarse</h2>
            <Campo titulo="Nombre" placeholder="Ingrese nombre" required valor={nombre} actualizarValor={actualizarNombre}/>
            <Campo titulo="Foto" placeholder="Ingrese enlace de foto" required valor={foto} actualizarValor={actualizarFoto}/>
            <Campo titulo="Telefono" placeholder="Ingrese numero de telefono" required valor={telefono} actualizarValor={actualizarTelefono}/>
            <Campo titulo="Ubicacion" placeholder="Ingrese enlace de la ubicacion" required valor={ubicacion} actualizarValor={actualizarUbicacion}/>
            <ListaOpciones valor = {equipo} actualizarValor={actualizarEquipo} equipos={props.data}/>
            <Boton title="Registrarse"/>
        </form>)}
        {(props.tipoForm === "Login")&&(<form onSubmit={manejarInicioSesion}>
            <h2>Iniciar Sesión</h2>
            <Campo titulo="Email" placeholder="Ingrese el email..." required valor={email} actualizarValor={actualizarEmail}/>
            <Campo titulo="Contraseña" placeholder="Ingrese la contraseña..." required valor={password} actualizarValor={actualizarPassword}/>
            {/* <Campo titulo="Color" placeholder="Ingrese el color en HEX" required valor={color} actualizarValor={actualizarColor} 
                type = "color"
            />
            <Boton title="Register Team"/> */}
            <Boton title = "Iniciar Sesión" />
        </form>)}
    </section>
}

export default Formulario;