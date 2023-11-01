import "./Top.css";
import Colaborador from "../Colaborador/Colaborador";

function Top(props) {
  const { colaboradores } = props;
  return (
    <div className="top">
      <h3 className="titleT">Los más top</h3>
      <div className="destacados">
        {colaboradores.map((colaborador, idx) => {
          return <Colaborador key={idx} datos={colaborador} />;
        })}
      </div>
    </div>
  );
}

export default Top;