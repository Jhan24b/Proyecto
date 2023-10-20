import "./Colaborador.css";
import {AiOutlineUserDelete, AiOutlineHeart} from "react-icons/ai";
import {FcLike} from "react-icons/fc";

const Colaborador = (props)=>{
    const {nombre, telefono, foto, id, fav, ubicacion, productos} = props.datos;
    const {eliminarColaborador, like} = props;
    return <section className="colaborador">
        <AiOutlineUserDelete onClick={() => eliminarColaborador(id)} className="eliminar"/>
        <div className="encabezado" style={{backgroundColor: props.bc}}>
            <img src={foto} alt={nombre}/>
        </div>
        <div className="info">
            <h4>{nombre}</h4>
            <h4>{productos}</h4>
            <h5>{telefono}</h5>
            <h5>{ubicacion}</h5>
            {fav ? <FcLike onClick={() => like(id)}/> : <AiOutlineHeart onClick={() => like(id)}/>}
        </div>
    </section>
}

export default Colaborador; 