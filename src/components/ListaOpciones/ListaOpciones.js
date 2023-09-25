import "./ListaOpciones.css";
const ListaOpciones = (props) =>{

    const manejarCambio = (e)=>{
        props.actualizarValor(e.target.value);
    }

    return <div className="lista-opciones">
        <label>Tipo de cultivos</label>
        <select value={props.valor} onChange={manejarCambio}>
            <option value="" disabled defaultValue="" hidden>Seleccionar tipo de cultivo</option>
            {props.equipos.map((equipo, idx) => <option key={idx}>{equipo}</option>)}
        </select>
    </div>
}

export default ListaOpciones;