import { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  remove,
  update,
} from "firebase/database";

import { v4 as uuidv4 } from "uuid";

import app from "./firebase/firebase";

import "./App.css";

import { NextUIProvider } from "@nextui-org/react";

import Formulario from "./components/Formulario/formulario";
import Header from "./components/Header/header";
import MyOrg from "./components/MyOrg/MyOrg";
import Equipo from "./components/Equipo/Equipo";
import Footer from "./components/Footer/Footer";
import Panel from "./components/Panel/Panel";
import Top from "./components/Top/Top";
import Profile from "./components/Profile/profile";
import FormAnuncio from "./components/FormAnuncio/formAnuncio";
import CambioContrasena from "./components/CambioContrasena/CambioContrasena";
import Maps from "./components/Maps/Maps";

function App() {
  const [usersDB, setUsersDB] = useState();
  const [addDB, setAddDB] = useState();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  // DESCOMENTAR EL USEEFFECT PARA PODER SOLICITAR LA INFORMACION INICIAL
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const usersRef = ref(db, "usuarios");

      try {
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convierte los datos a un array de objetos
          const usersArray = Object.keys(data).map((userId) => ({
            id: userId,
            ...data[userId],
          }));

          setUsersDB(usersArray);
          setLoading1(false);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const anunciosRef = ref(db, "anuncios");

      try {
        const snapshot = await get(anunciosRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convierte los datos a un array de objetos
          const addArray = Object.keys(data).map((anuncioId) => ({
            id: anuncioId,
            ...data[anuncioId],
          }));

          setAddDB(addArray);
          setLoading2(false);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    fetchData();
  }, []);

  const [mostrarFormulario, actualizarMostrar] = useState(false);
  const [colaboradores, actualizarColaboradores] = useState([
    {
      id: uuidv4,
      titulo: "Quinua Negra organica",
      foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
      producto: ["papa"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Cereales",
      precio: 1.8,
      usuario: {
        id: "1",
        nombre: "Manuel Prada",
        foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
        telefono: "955664455",
      },
    },
    {
      id: uuidv4,
      titulo: "Kiwicha organica",
      foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
      producto: ["papa"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Cereales",
      precio: 1.8,
      usuario: {
        id: "2",
        nombre: "Manuel Prada",
        foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
        telefono: "987957337",
      },
    },
    {
      id: uuidv4,
      titulo: "Papa blanca organica",
      foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
      producto: ["papa"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Legumbres",
      precio: 1.8,
      usuario: {
        id: "1",
        nombre: "Manuel Prada",
        foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
        telefono: "987957337",
      },
    },
    {
      id: uuidv4,
      titulo: "Dumbo organico",
      foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
      producto: ["papa"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Frutas",
      precio: 1.8,
      usuario: {
        id: "1",
        nombre: "Manuel Prada",
        foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
        telefono: "987957337",
      },
    },
    {
      id: uuidv4,
      titulo: "Quinua organica",
      foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
      producto: ["papa"],
      telefono: "999 999 999",
      ubicacion: "su hai",
      visitas: 10,
      equipo: "Cereales",
      precio: 1.8,
      usuario: {
        id: "2",
        nombre: "Miguel Alvarado",
        foto: "https://ih1.redbubble.net/image.1089030344.5005/st,small,507x507-pad,600x600,f8f8f8.jpg",
        telefono: "987957337",
      },
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
    // const db = getDatabase(app);
    // const dbRef = ref(db, "anuncios");
    // onValue(dbRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log("Datos de la base de datos:", data);
    // });
    // // Realizar una operación de escritura
    // push(dbRef, anuncio);
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

  const eliminarAnuncio = async (id) => {
    const db = getDatabase(app);

    try {
      const snapshot = await get(ref(db, "anuncios"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const userId in data) {
          const u = data[userId];
          if (u.id === id) {
            remove(ref(db, "anuncios/" + userId))
              .then(alert("El anuncio se elimino correctamente"))
              .catch((err) => {
                alert("error: ", err);
              });
          }
        }
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  };

  const editarAnuncio = async (id, newInfo) => {
    const db = getDatabase(app);

    try {
      const snapshot = await get(ref(db, "anuncios"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const userId in data) {
          const u = data[userId];
          if (u.id === id) {
            update(ref(db, "anuncios/" + userId), newInfo)
              .then(alert(`El anuncio se actualizó correctamente`))
              .catch((err) => {
                alert("error: ", err);
              });
          }
        }
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
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

  async function actualizarPassword(id, newPassword) {
    // Obtener el SDK de Firebase
    const db = getDatabase(app);

    try {
      const snapshot = await get(ref(db, "usuarios"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const userId in data) {
          const u = data[userId];
          if (u.id === id) {
            update(ref(db, "usuarios/" + userId), newPassword)
              .then(alert(`La contraseña se actualizó correctamente`))
              .catch((err) => {
                alert("error: ", err);
              });
          }
        }
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  }

  function actualizarDatosUser(id, newData) {
    const db = getDatabase(app);
    const dbRef = ref(db, "usuarios");

    // Actualizar el documento
    dbRef.doc(id).update({
      nombre: newData.nombre,
      foto: newData.foto,
      telefono: newData.telefono,
      email: newData.email,
      ubicacion: newData.ubicacion,
      dni: newData.dni,
    });

    // Mostrar un mensaje de confirmación
    alert(`Los datos se actualizaron correctamente`);
  }

  return (
    <NextUIProvider>
      <Router>
        <Header
          mostrarForm={cambiarMostrar}
          authenticatedUser={authenticatedUser}
          form={mostrarFormulario}
          ponerTipoForm={ponerTipoForm}
        />
        <Routes>
          <Route
            path="/add-ad"
            element={
              <FormAnuncio
                ad={registrarAnuncio}
                data={equipos.map((equipo) => equipo.titulo)}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Formulario
                data={equipos.map((equipo) => equipo.titulo)}
                registrarColaborador={registrarColaborador}
                crearEquipo={crearEquipo}
                establecerUser={establecerUser}
                tipoForm="Login"
                mostrarForm={cambiarMostrar}
                verificar={verificarSesion}
              ></Formulario>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Formulario
                data={equipos.map((equipo) => equipo.titulo)}
                registrarColaborador={registrarColaborador}
                crearEquipo={crearEquipo}
                establecerUser={establecerUser}
                tipoForm="SignUp"
                mostrarForm={cambiarMostrar}
                verificar={verificarSesion}
              ></Formulario>
            }
          ></Route>
          <Route
            path="/"
            element={
              <div>
                <Panel />
                <div>
                  <Suspense fallback={<div>Cargando...</div>}>
                    <Maps />
                  </Suspense>
                </div>
                {/* aqui se debe cambiar a usuarios */}
                <div>
                  <Suspense fallback={<div>Cargando...</div>}>
                  {loading2 ? <div>Cargando datos...</div> : <Top
                      colaboradores={addDB}
                      eliminarColaborador={eliminarColaborador}
                      actualizarColor={actualizarColor}
                      like={like}
                      users = {usersDB}
                    />}
                  </Suspense>
                </div>
                <MyOrg
                  cambiarMostrar={cambiarMostrar}
                  user={authenticatedUser}
                />
                {/* aqui tambien se cambia por anuncios */}
                {(loading1 && loading2) ? <div>Cargando datos...</div> : equipos.map((dato) => {
                  return (
                    <Equipo
                      datos={dato}
                      key={dato.id}
                      colaboradores={addDB.filter(
                        (colaborador) => colaborador.equipo === dato.titulo
                      )}  
                      eliminarColaborador={eliminarColaborador}
                      actualizarColor={actualizarColor}
                      like={like}
                      users = {usersDB}
                    />
                  );
                })}
              </div>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              // aqui tambien se cambia por anuncios
              <Profile
                datosUser={authenticatedUser}
                anunciosUser={addDB}
                actualizarDatosUser={actualizarDatosUser}
                editarAnuncio={editarAnuncio}
                eliminarAnuncio={eliminarAnuncio}
                users = {usersDB}
                opt="opt"
              />
            }
          ></Route>
          {/* <Route
            path="/profile/cambioContrasena"
            element={
              <CambioContrasena
                idUser={authenticatedUser.id}
                actualizarPassword={actualizarPassword}
              />
            }
          ></Route> */}
          <Route path="/main" element={<Panel />}></Route>
        </Routes>
        <Footer />
      </Router>
    </NextUIProvider>
  );
}

export default App;
