import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Formulario from './components/Formulario/formulario';
import Header from './components/Header/header';
import MyOrg from './components/MyOrg/MyOrg';
import Equipo from './components/Equipo/Equipo';
import Footer from './components/Footer/Footer';
import api from "./scripts/script";

function App() {
  const [mostrarFormulario, actualizarMostrar] = useState(false);
  const [colaboradores, actualizarColaboradores] = useState([]);
  const [equipos, actualizarEquipos] = useState([{
    titulo: "Programming",
    colorPrimario: "#57c278",
    colorSecundario: "#D9F7E9",
    id: uuidv4()
  }, {
    titulo: "Front End",
    colorPrimario: "#82cffa",
    colorSecundario: "#e8f8ff",
    id: uuidv4()
  }, {
    titulo: "Data Science",
    colorPrimario: "#a6d157",
    colorSecundario: "#f0f8e2",
    id: uuidv4()
  }, {
    titulo: "Dev Ops",
    colorPrimario: "#e06b69",
    colorSecundario: "#fde7e8",
    id: uuidv4()
  }, {
    titulo: "UIX Design",
    colorPrimario: "#db6ebf",
    colorSecundario: "#fae9f5",
    id: uuidv4()
  }, {
    titulo: "Mobile",
    colorPrimario: "#ffba05",
    colorSecundario: "#fff5d9",
    id: uuidv4()
  }, {
    titulo: "Innovation and Managment",
    colorPrimario: "#ff8a29",
    colorSecundario: "#ffeedf",
    id: uuidv4()
  }]);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    api.position()
      .then(result => {
        setLocationData(result);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  //Muestra el formulario para anadir un nuevo colaborador
  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario);
  }

  //Registra al nuevo colaborador
  const registrarColaborador = (colaborador) => {
    //Spread Operator hace copia de un valor en este caso de colaboradores
    actualizarColaboradores([...colaboradores, colaborador]);
  }

  //Actualizar color de equipo
  const actualizarColor = (color, id) => {
    const equiposActualizados = equipos.map((equipo) => {
      if (equipo.id === id) {
        equipo.colorPrimario = color;
      }
      return equipo;
    })
    actualizarEquipos(equiposActualizados);
  }

  //Crear Equipo
  const crearEquipo = (nuevoEquipo) => {
    console.log(nuevoEquipo);
    actualizarEquipos([...equipos, { ...nuevoEquipo, id: uuidv4() }])
  }

  //Eliminar a un colaborador
  const eliminarColaborador = (id) => {
    console.log("Eliminando colaborador", id);
    const nuevosColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id)
    actualizarColaboradores(nuevosColaboradores);
  }

  //Favorito
  const like = (id) => {
    const colaboradoresActualizados = colaboradores.map((colaborador) => {
      if (colaborador.id === id) {
        colaborador.fav = !colaborador.fav;
      }
      return colaborador
    })
    actualizarColaboradores(colaboradoresActualizados);
  }

  return (
    <div>
      <Header />
      <MyOrg cambiarMostrar={cambiarMostrar} />
      {/* {mostrarFormulario === true ? <Formulario/> : <div></div>} */}
      {mostrarFormulario && <Formulario data={equipos.map((equipo) => equipo.titulo)}
        registrarColaborador={registrarColaborador}
        crearEquipo={crearEquipo}
      />}
      {
        equipos.map((dato) => {
          return <Equipo datos={dato} key={dato.id}
            colaboradores={colaboradores.filter(colaborador => colaborador.equipo === dato.titulo)}
            eliminarColaborador={eliminarColaborador}
            actualizarColor={actualizarColor}
            like={like}
          />
        })
      }
      <div>
        {/* Renderiza los datos de la ubicación aquí */}
        {locationData && (
          <pre>{JSON.stringify(locationData, null, 2)}</pre>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;