import "./boton.css";

const Boton = (props)=>{
    return <button className="boton">
        {props.title}
    </button>
}

export default Boton;