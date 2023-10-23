import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import app from "./firebase/firebase";
import { getDatabase, ref, onValue, push, get } from "firebase/database";
import Formulario from "./components/Formulario/formulario";
import Header from "./components/Header/header";
import MyOrg from "./components/MyOrg/MyOrg";
import Equipo from "./components/Equipo/Equipo";
import Footer from "./components/Footer/Footer";
import { NextUIProvider } from "@nextui-org/react";
import Panel from "./components/Panel/Panel";
import Top from "./components/Top/Top";
import FormAnuncio from "./components/FormAnuncio/formAnuncio";
import { AiOutlineVerified } from "react-icons/ai";

function App() {
  useEffect(() => {
    // Acceder a la base de datos de Firebase
    const db = getDatabase(app);
    const dbRef = ref(db, "usuarios");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos de la base de datos:", data);
    });

    // Realizar una operación de escritura
    // set(dbRef, { dato: 'Hola, mundo' });
  }, []);

  const [mostrarFormulario, actualizarMostrar] = useState(false);
  const [colaboradores, actualizarColaboradores] = useState([
    {
      id: uuidv4,
      nombre: "Manuel Prada",
      foto: "data:image/jpeg;base64,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",
      productos: ["papa, tomates, cebollas"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Verduras",
    },
    {
      id: uuidv4,
      nombre: "Manuel Prada",
      foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
      productos: ["papa, zanahorias, lechugas"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Cereales",
    },
    {
      id: uuidv4,
      nombre: "Manuel Prada",
      foto: "https://i1.sndcdn.com/artworks-cUOHqGwIACJUcyHg-0KhPgQ-t500x500.jpg",
      productos: ["papa, tomates, cebollas"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Legumbres",
    },
  ]);
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
  };

  const establecerUser = (usuario) => {
    setAuthenticatedUser(usuario);
  };

  //Registra al nuevo colaborador
  const registrarColaborador = (colaborador) => {
    //Spread Operator hace copia de un valor en este caso de colaboradores
    actualizarColaboradores([...colaboradores, colaborador]);
    const db = getDatabase(app);
    const dbRef = ref(db, "usuarios");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos de la base de datos:", data);
    });

    // Realizar una operación de escritura
    push(dbRef, colaborador);
  };

  const verificarSesion = async (user, pass) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "usuarios");

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const userId in data) {
          const u = data[userId];
          if (u.email === user && u.password === pass) {
            setAuthenticatedUser(u);
            return true;
          }
        }
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
    }

    return false;
  };

  const registrarAnuncio = (anuncio) => {
    //Spread Operator hace copia de un valor en este caso de colaboradores
    const db = getDatabase(app);
    const dbRef = ref(db, "anuncios");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos de la base de datos:", data);
    });

    // Realizar una operación de escritura
    push(dbRef, anuncio);
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
      <Header
        mostrarForm={cambiarMostrar}
        authenticatedUser={authenticatedUser}
        form={mostrarFormulario}
        ponerTipoForm={ponerTipoForm}
      />
      <Panel />
      {authenticatedUser && <FormAnuncio registrarAnuncio={registrarAnuncio} data={equipos.map((equipo) => equipo.titulo)}/>}
      {!mostrarFormulario && (
        <Top
          colaboradores={colaboradores}
          eliminarColaborador={eliminarColaborador}
          actualizarColor={actualizarColor}
          like={like}
        />
      )}
      {authenticatedUser && (
        <MyOrg cambiarMostrar={cambiarMostrar} user={authenticatedUser} />
      )}
      {/* {mostrarFormulario === true ? <Formulario/> : <div></div>} */}
      {mostrarFormulario && (
        <Formulario
          data={equipos.map((equipo) => equipo.titulo)}
          registrarColaborador={registrarColaborador}
          crearEquipo={crearEquipo}
          establecerUser={establecerUser}
          tipoForm={tipoForm}
          mostrarForm={cambiarMostrar}
          verificar={verificarSesion}
        />
      )}
      {authenticatedUser &&
        equipos.map((dato) => {
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
