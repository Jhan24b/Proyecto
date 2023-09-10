import './Campo.css';
const Campo = (props)=>{

    const {type = "text"} = props;
    const manejarCambio = (e)=>{
        props.actualizarValor(e.target.value);
    }

    return <div className={`campo campo-${type}`}>
        <label>{props.titulo}</label>
        <input placeholder={props.placeholdertxt} 
        required={props.required}
        value={props.valor}
        onChange = {manejarCambio}
        type={type}></input>
    </div>
}

export default Campo;