// SE TRATA DE LOS ANUNCIOS

import "./Colaborador.css";
import MiniUser from "../MiniUser/MiniUser";
import { NavLink } from "react-router-dom";
import { CgFileRemove } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
// import { FcLike } from "react-icons/fc";

const Colaborador = (props) => {
  // const { titulo, precio, foto, id, fav, ubicacion, producto, usuario } = props.datos;
  const { titulo, precio, foto, ubicacion, producto, usuario, id } = props.datos;
  // const { eliminarColaborador, like } = props;
  const { eliminarAnuncio, opt, users, setPostEdit } = props;
  return (
    <section className="colaborador">
      {opt && (
        <NavLink to="/edit-ad"><BiEdit
        onClick={() => {
          setPostEdit(props.datos);
        }}
        className="editar"
      ></BiEdit></NavLink>
        
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
        <MiniUser user={usuario} title={titulo} users = {users}></MiniUser>
      </div>
    </section>
  );
};

export default Colaborador;
