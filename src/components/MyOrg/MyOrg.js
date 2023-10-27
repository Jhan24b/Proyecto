import "./MyOrg.css";
import React from "react";
import { Button } from "@nextui-org/react";
// import btn from "../../img/btn.png"

const MyOrg = (props) => {
  //Estado - hooks
  //useState()

  // const [mostrar, actualizarMostrar] = useState(true);

  // const manejarClick = () =>{
  //     actualizarMostrar(!mostrar);
  // }

  return (
    <section className="orgSection">
      <h3 className="title"> ANUNCIOS </h3>
      <div className="filtroTipo">
        <Button color="primary" variant="bordered">
          Productos
        </Button>
        <Button color="primary" variant="bordered">
          Agricultores
        </Button>
      </div>
      {/* <img src={btn} alt ="Agregar" onClick= {props.cambiarMostrar}/> */}
    </section>
  );
};

export default MyOrg;
