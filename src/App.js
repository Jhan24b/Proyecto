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
import EditAnuncio from "./components/FormAnuncio/editAnuncio";
import Filtrado from "./components/Filtrado/Filtrado";

function App() {
  const [usersDB, setUsersDB] = useState([]);
  const [addDB, setAddDB] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [postEdit, setPostEdit] = useState(0);
  const [buscar, setBuscar] = useState("");

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

  //Muestra el formulario para anadir un nuevo colaborador
  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario);
  };

  const establecerUser = (usuario) => {
    setAuthenticatedUser(usuario);
  };

  //Registra al nuevo colaborador
  const registrarColaborador = (colaborador) => {
    //Spread Operator hace copia de un valor en este caso de colaboradores
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
    // Spread Operator hace copia de un valor en este caso de colaboradores
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
    // const colaboradoresActualizados = colaboradores.map((colaborador) => {
    //   if (colaborador.id === id) {
    //     colaborador.fav = !colaborador.fav;
    //   }
    //   return colaborador;
    // });
    // actualizarColaboradores(colaboradoresActualizados);
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

  async function actualizarDatosUser(id, newData) {
    // Obtener el SDK de Firebase
    const db = getDatabase(app);
  
    try {
      const snapshot = await get(ref(db, "usuarios"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const userId in data) {
          const u = data[userId];
          if (u.id === id) {
            // Actualizar el documento
            update(ref(db, "usuarios/" + userId), {
              nombre: newData.nombre,
              foto: newData.foto,
              telefono: newData.telefono,
              email: newData.email,
              ubicacion: newData.ubicacion,
              dni: newData.dni,
            })
              .then(() => {
                // Mostrar un mensaje de confirmación
                alert(`Los datos se actualizaron correctamente`);
              })
              .catch((err) => {
                alert("Error: " + err);
              });
          }
        }
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  }
  

  return (
    <NextUIProvider>
      <Router>
        <Header
          mostrarForm={cambiarMostrar}
          authenticatedUser={authenticatedUser}
          form={mostrarFormulario}
          setAuthenticatedUser={setAuthenticatedUser}
          setBuscar={setBuscar}
        />
        <Routes>
          <Route
            path="/add-ad"
            element={
              <FormAnuncio
                registrarAnuncio={registrarAnuncio}
                data={equipos.map((equipo) => equipo.titulo)}
                user={authenticatedUser}
              />
            }
          ></Route>
          <Route
            path="/edit-ad"
            element={
              <EditAnuncio
                editarAnuncio={editarAnuncio}
                data={equipos.map((equipo) => equipo.titulo)}
                add={postEdit}
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
                    <Maps addDB={addDB} general={true}/>
                  </Suspense>
                </div>
                {/* aqui se debe cambiar a usuarios */}
                <div>
                  <Suspense fallback={<div>Cargando...</div>}>
                    {loading2 ? (
                      <div>Cargando datos...</div>
                    ) : (
                      <Top
                        colaboradores={addDB}
                        actualizarColor={actualizarColor}
                        like={like}
                        users={usersDB}
                      />
                    )}
                  </Suspense>
                </div>
                <MyOrg
                  cambiarMostrar={cambiarMostrar}
                  user={authenticatedUser}
                />
                {/* aqui tambien se cambia por anuncios */}
                {loading1 && loading2 ? (
                  <div>Cargando datos...</div>
                ) : (
                  equipos.map((dato) => {
                    return (
                      <Equipo
                        datos={dato}
                        key={dato.id}
                        colaboradores={addDB.filter(
                          (colaborador) => colaborador.equipo === dato.titulo
                        )}
                        actualizarColor={actualizarColor}
                        like={like}
                        users={usersDB}
                      />
                    );
                  })
                )}
              </div>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                datosUser={authenticatedUser}
                anunciosUser={addDB}
                actualizarDatosUser={actualizarDatosUser}
                eliminarAnuncio={eliminarAnuncio}
                users={usersDB}
                opt="opt"
                setPostEdit={setPostEdit}
              />
            }
          ></Route>
          {authenticatedUser && (
            <Route
              path="/profile/cambioContrasena"
              element={
                <CambioContrasena
                  idUser={authenticatedUser.id}
                  actualizarPassword={actualizarPassword}
                />
              }
            ></Route>
          )}
          <Route
            path="/filtered"
            element={
              <Filtrado
                categorias={equipos}
                anuncios={addDB}
                buscar={buscar}
                usersDB={usersDB}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </NextUIProvider>
  );
}

export default App;
