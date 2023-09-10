import Colaborador from "../Colaborador/Colaborador";
import hexToRgba from "hex-to-rgba";
import "./Equipo.css";
const Equipo = (props)=>{
    const {colorPrimario, colorSecundario, titulo, id} = props.datos;
    const {colaboradores, eliminarColaborador, actualizarColor, like} = props;
    const colorModificado = {backgroundColor: hexToRgba(colorPrimario,0.6)};
    return (
        colaboradores.length>0 && <section className="equipo" style={colorModificado}>
          <input className="colores" 
            type="color" 
            value={colorSecundario} 
            onChange={(e)=>{actualizarColor(e.target.value,id)}}
          />
          <h3 style={{ borderBottom: `4px solid ${colorPrimario}` }}>{titulo}</h3>       
          <div className="colaboradores">
            {
              colaboradores.map((colaborador,index) => <Colaborador datos={colaborador} 
              key={index} 
              bc={colorPrimario}
              eliminarColaborador={eliminarColaborador}
              like = {like}
              />)
            }
          </div>
        </section>
    );
      
}

export default Equipo;