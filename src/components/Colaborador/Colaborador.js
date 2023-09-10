import "./Colaborador.css";
import {AiOutlineUserDelete, AiOutlineHeart} from "react-icons/ai";
import {FcLike} from "react-icons/fc";

const Colaborador = (props)=>{
    const {nombre, puesto,foto, id, fav} = props.datos;
    const {eliminarColaborador, like} = props;
    return <section className="colaborador">
        <AiOutlineUserDelete onClick={() => eliminarColaborador(id)} className="eliminar"/>
        <div className="encabezado" style={{backgroundColor: props.bc}}>
            <img src={foto} alt={nombre}/>
        </div>
        <div className="info">
            <h4>{nombre}</h4>
            <h5>{puesto}</h5>
            {fav ? <FcLike onClick={() => like(id)}/> : <AiOutlineHeart onClick={() => like(id)}/>}
        </div>
    </section>
}

export default Colaborador; 