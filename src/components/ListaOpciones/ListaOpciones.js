import "./ListaOpciones.css";
const ListaOpciones = (props) =>{
    // const equipos=["Programming","Front End", "Data Science", "Dev Ops", "UIX Design", "Mobile","Innovation and Managment"];

    const manejarCambio = (e)=>{
        props.actualizarValor(e.target.value);
    }

    return <div className="lista-opciones">
        <label>Equipos</label>
        <select value={props.valor} onChange={manejarCambio}>
            <option value="" disabled defaultValue="" hidden>Seleccionar Equipo</option>
            {props.equipos.map((equipo, idx) => <option key={idx}>{equipo}</option>)}
        </select>
    </div>
}

export default ListaOpciones;