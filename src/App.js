import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import app from "./firebase/firebase";
import { getDatabase, ref, onValue, push } from 'firebase/database';
import Formulario from "./components/Formulario/formulario";
import Header from "./components/Header/header";
import MyOrg from "./components/MyOrg/MyOrg";
import Equipo from "./components/Equipo/Equipo";
import Footer from "./components/Footer/Footer";
import { NextUIProvider } from "@nextui-org/react";
import Panel from "./components/Panel/Panel";
import Top from "./components/Top/Top";
// import c1 from "./img/campesino1.jpg";
import c2 from "./img/campesino2.png";
import c3 from "./img/campesino3.jpg";


function App() {


  useEffect(() => {
    // Acceder a la base de datos de Firebase
    const db = getDatabase(app);
    const dbRef = ref(db, 'usuarios');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Datos de la base de datos:', data);
    });

    // Realizar una operación de escritura
    // set(dbRef, { dato: 'Hola, mundo' });
  }, []);

  const [mostrarFormulario, actualizarMostrar] = useState(false);
  const [colaboradores, actualizarColaboradores] = useState([{
    id: uuidv4,
    nombre: "Manuel Prada",
    foto:"./img/campesino1.jpg",
    productos: ["papa, tomates, cebollas"],
    telefono: "999 999 999",
    ubicacion: "su hai",
    visitas: 10,
    equipo: "Verduras"
  },{
    id: uuidv4,
    nombre: "Manuel Prada",
    foto: {c2},
    productos: ["papa, zanahorias, lechugas"],
    telefono: "999 999 999",
    ubicacion: "su hai",
    visitas: 10,
    equipo: "Cereales"
  },{
    id: uuidv4,
    nombre: "Manuel Prada",
    foto: {c3},
    productos: ["papa, tomates, cebollas"],
    telefono: "999 999 999",
    ubicacion: "su hai",
    visitas: 10,
    equipo: "Legumbres"
  }]);
  const [equipos, actualizarEquipos] = useState([
    {
      titulo: "Frutas",
      colorPrimario: "#57c278",
      colorSecundario: "#D9F7E9",
      id: uuidv4(),
    },
    {
      titulo: "Verduras",
      colorPrimario: "#82cffa",
      colorSecundario: "#e8f8ff",
      id: uuidv4(),
    },
    {
      titulo: "Cereales",
      colorPrimario: "#a6d157",
      colorSecundario: "#f0f8e2",
      id: uuidv4(),
    },
    {
      titulo: "Legumbres",
      colorPrimario: "#e06b69",
      colorSecundario: "#fde7e8",
      id: uuidv4(),
    },
    {
      titulo: "Hierbas Medicinales",
      colorPrimario: "#db6ebf",
      colorSecundario: "#fae9f5",
      id: uuidv4(),
    },
    {
      titulo: "Cultivos Especiales",
      colorPrimario: "#ffba05",
      colorSecundario: "#fff5d9",
      id: uuidv4(),
    },
  ]);
  // const [locationData, setLocationData] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [tipoForm, setTipoForm] = useState();

  //Muestra el formulario para anadir un nuevo colaborador
  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario);
  };

  const ponerTipoForm = (tipo) => {
    setTipoForm(tipo);
  }

  const establecerUser = (usuario) =>{
    setAuthenticatedUser(usuario);
  }

  //Registra al nuevo colaborador
  const registrarColaborador = (colaborador) => {
    //Spread Operator hace copia de un valor en este caso de colaboradores
    actualizarColaboradores([...colaboradores, colaborador]);
    const db = getDatabase(app);
    const dbRef = ref(db, 'usuarios');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Datos de la base de datos:', data);
    });

    // Realizar una operación de escritura
    push(dbRef, colaborador);
  };

  //Actualizar color de equipo
  const actualizarColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        equipo.colorPrimario = color;
      }
      return equipo;
    });
    actualizarEquipos(equiposActualizados);
  };

  //Crear Equipo
  const crearEquipo = (nuevoEquipo) => {
    console.log(nuevoEquipo);
    actualizarEquipos([...equipos, { ...nuevoEquipo, id: uuidv4() }]);
  };

  //Eliminar a un colaborador
  const eliminarColaborador = (id) => {
    console.log("Eliminando colaborador", id);
    const nuevosColaboradores = colaboradores.filter(
      (colaborador) => colaborador.id !== id
    );
    actualizarColaboradores(nuevosColaboradores);
  };

  //Favorito
  const like = (id) => {
    const colaboradoresActualizados = colaboradores.map((colaborador) => {
      if (colaborador.id === id) {
        colaborador.fav = !colaborador.fav;
      }
      return colaborador;
    });
    actualizarColaboradores(colaboradoresActualizados);
  };

  return (
    <NextUIProvider>
      <Header mostrarForm={cambiarMostrar} 
              authenticatedUser={authenticatedUser} 
              form={mostrarFormulario}
              ponerTipoForm = {ponerTipoForm}
      />
      <Panel />
      {!mostrarFormulario && <Top
        colaboradores={colaboradores}
        eliminarColaborador={eliminarColaborador}
        actualizarColor={actualizarColor}
        like={like}
      />}
      {authenticatedUser && <MyOrg cambiarMostrar={cambiarMostrar} />}
      {/* {mostrarFormulario === true ? <Formulario/> : <div></div>} */}
      {mostrarFormulario && (
        <Formulario
          data={equipos.map((equipo) => equipo.titulo)}
          registrarColaborador={registrarColaborador}
          crearEquipo={crearEquipo}
          establecerUser = {establecerUser}
          tipoForm = {tipoForm}
          mostrarForm = {cambiarMostrar}
        />
      )}
      {authenticatedUser && equipos.map((dato) => {
        return (
          <Equipo
            datos={dato}
            key={dato.id}
            colaboradores={colaboradores.filter(
              (colaborador) => colaborador.equipo === dato.titulo
            )}
            eliminarColaborador={eliminarColaborador}
            actualizarColor={actualizarColor}
            like={like}
          />
        );
      })}
      <Footer />
    </NextUIProvider>
  );
}

export default App;
