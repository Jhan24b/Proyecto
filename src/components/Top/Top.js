import "./Top.css";
import Colaborador from "../Colaborador/Colaborador"

function Top(props){
    const {colaboradores} = props;
    return(
        <div className="top" >
            <p>Los mas top</p>
            <div className="destacados">
            {colaboradores.map((colaborador) =>{
                return (
                    <Colaborador datos={colaborador}/>
                );
            })}
            </div>
        </div>
    )
}

export default Top;