import "./Top.css";
import Colaborador from "../Colaborador/Colaborador";
import ExpandableAd from "../ExpandedAd/expandableAd";

function Top(props) {
  const { colaboradores, users } = props;
  return (
    <div className="top">
      <h3 className="titleT">Los más top</h3>
      
      <div className="destacados">
        {colaboradores.map((colaborador, idx) => {
          return <Colaborador key={idx} datos={colaborador} users = {users}/>;
        })}
      </div>
      <div className="destacados">
        {colaboradores.map((colaborador, idx) => {
          return <ExpandableAd key={idx} datos={colaborador} users = {users}/>;
        })}
      </div>
    </div>
  );
}

export default Top;