import "./formAnuncio.css";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { v4 as uuid } from "uuid";

import Campo from "../Campo/Campo";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import Boton from "../Boton/boton";

function FormAnuncio(props) {
  const [anuncios, actualizarAnuncios] = useState();
  const [titulo, actualizarTitulo] = useState("");
  const [producto, actualizarProducto] = useState();
  const [precio, actualizarPrecio] = useState();
  const [foto, actualizarFoto] = useState("");
  const [telefono, actualizarTelefono] = useState("");
  const [equipo, actualizarEquipo] = useState("");
  const [usuario, actualizarUsuario] = useState("");
  const [ubicacion, actualizarUbicacion] = useState("");

  const { registrarAnuncio, establecerUser } = props;

  const manejarEnvio = (event) => {
    event.preventDefault();
    const datosEnviar = {
      id: uuid(),
      titulo: titulo,
      foto: foto,
      usuario: usuario,
      telefono: telefono,
      equipo: equipo,
      ubicacion: ubicacion,
      fav: false,
    };
    registrarAnuncio(datosEnviar);
  };

  const validateTitulo = (value) => {
    const tituloPattern = /^[A-Za-z]{2,100}$/;
    return tituloPattern.test(value);
  };

  const isTituloInvalid = React.useMemo(() => {
    if (titulo === "") return false;
    return validateTitulo(titulo) ? false : true;
  }, [titulo]);

  const validateProducto = (value) => {
    const productoPattern = /^[A-Za-z]{3,100}$/;
    return productoPattern.test(value);
  };

  const isProductoInvalid = React.useMemo(() => {
    if (producto === "") return false;
    return validateProducto(producto) ? false : true;
  }, [producto]);

  const validatePrecio = (value) => {
    const productoPattern = /^[0-9]{1,8}$/;
    return productoPattern.test(value);
  };

  const isPrecioInvalid = React.useMemo(() => {
    if (precio === "") return false;
    return validatePrecio(precio) ? false : true;
  }, [precio]);

  return (
    <div className="formulario">
      <form onSubmit={manejarEnvio}>
        <h2>Registrarse</h2>
        <div className="w-full flex flex-col  gap-2 max-w-[60%] min-w-[360px]">
          <Input
            label="Titulo"
            variant="faded"
            value={titulo}
            onValueChange={actualizarTitulo}
            isInvalid={!isTituloInvalid}
            color={!isTituloInvalid ? "danger" : ""}
            errorMessage={!isTituloInvalid && "Ingrese un titulo valido"}
          />
          <Input
            label="Producto"
            variant="faded"
            value={producto}
            onValueChange={actualizarProducto}
            isInvalid={!isProductoInvalid}
            color={!isProductoInvalid ? "danger" : ""}
            errorMessage={!isProductoInvalid && "Ingrese un producto valido"}
          />
          <Input
            label="Precio"
            variant="faded"
            value={precio}
            onValueChange={actualizarPrecio}
            isInvalid={!isPrecioInvalid}
            color={!isPrecioInvalid ? "danger" : ""}
            errorMessage={!isPrecioInvalid && "Ingrese un precio valido"}
          />
          <Input
            label="Foto"
            variant="faded"
            value={foto}
            onValueChange={actualizarFoto}
            type="image"
          />
        </div>
        <Boton title="Publicar" />
      </form>
    </div>
  );
}

export default FormAnuncio;
