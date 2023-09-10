import "./MyOrg.css";

const MyOrg = (props)=>{
    //Estado - hooks
    //useState()

    // const [mostrar, actualizarMostrar] = useState(true);

    // const manejarClick = () =>{
    //     actualizarMostrar(!mostrar);
    // }

    

    return <section className="orgSection">
        <h3 className="title"> Registro de Agricultores </h3>
        <img src="img/btn.png" alt ="Agregar" onClick= {props.cambiarMostrar}/>
    </section>
}

export default MyOrg;