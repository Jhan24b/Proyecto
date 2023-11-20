import "./Filtrado.css";

import Equipo from "../Equipo/Equipo";

function Filtrado(props){
    const {categorias, anuncios, buscar, usersDB} = props;

    function buscarPorTitulo(lista, busqueda) {
        // Convierte la búsqueda a minúsculas para hacer la comparación sin distinción entre mayúsculas y minúsculas
        const busquedaMinusculas = busqueda.toLowerCase();
      
        // Filtra la lista por la propiedad "titulo" que contiene la cadena de búsqueda
        const resultados = lista.filter((item) =>
          item.titulo.toLowerCase().includes(busquedaMinusculas)
        );
      
        return resultados;
      }

    return(<div>{
        categorias.map((dato) => {
            return (
              <Equipo
                datos={dato}
                key={dato.id}
                colaboradores={buscarPorTitulo(anuncios.filter(
                    (colaborador) => colaborador.equipo === dato.titulo
                  ), buscar)}
                users={usersDB}
              />
            );
          })}</div>)
}

export default Filtrado;