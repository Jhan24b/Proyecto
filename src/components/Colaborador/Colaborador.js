// SE TRATA DE LOS ANUNCIOS

import "./Colaborador.css";
import MiniUser from "../MiniUser/MiniUser";
// import { AiOutlineUserDelete, AiOutlineHeart } from "react-icons/ai";
import { CgFileRemove } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
// import { FcLike } from "react-icons/fc";

const Colaborador = (props) => {
  // const { titulo, precio, foto, id, fav, ubicacion, producto, usuario } = props.datos;
  const { titulo, precio, foto, ubicacion, producto, usuario, id } =
    props.datos;
  // const { eliminarColaborador, like } = props;
  const { eliminarAnuncio, editarAnuncio, opt } = props;
  return (
    <section className="colaborador">
      {opt && (
        <BiEdit
          onClick={() => {
            editarAnuncio(id);
          }}
          className="editar"
        ></BiEdit>
      )}
      {opt && (
        <CgFileRemove
          onClick={() => {
            eliminarAnuncio(id);
          }}
          className="eliminar"
        ></CgFileRemove>
      )}

      {/* <AiOutlineUserDelete onClick={() => eliminarColaborador(id)} className="eliminar"/>
        {fav ? <FcLike onClick={() => like(id)}/> : <AiOutlineHeart onClick={() => like(id)}/>} */}
      <div className="anuncio" style={{ backgroundColor: props.bc }}>
        <div className="anuncio--titulo">{titulo}</div>
        <div className="anuncio--contenido">
          <div className="contenido--detalles">
            <h4>{producto}</h4>
            <h4>{precio}</h4>
            <h4>{ubicacion}</h4>
          </div>
          <div className="contenido--foto">
            <img src={foto} alt="foto de anuncio"></img>
          </div>
        </div>
        <MiniUser user={usuario} title={titulo}></MiniUser>
      </div>
    </section>
  );
};

export default Colaborador;
