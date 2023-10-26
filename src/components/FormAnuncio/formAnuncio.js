import "./formAnuncio.css";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { v4 as uuid } from "uuid";

// import Campo from "../Campo/Campo";
// import ListaOpciones from "../ListaOpciones/ListaOpciones";
// import Boton from "../Boton/boton";

function FormAnuncio(props) {
  const [titulo, actualizarTitulo] = useState("");
  const [producto, actualizarProducto] = useState();
  const [precio, actualizarPrecio] = useState();
  const [foto, actualizarFoto] = useState("");
  const [equipo, actualizarEquipo] = useState("");

  const { registrarAnuncio } = props;

  const manejarCambio = (e) => {
    actualizarEquipo(e.target.value);
  };

  const onDrop = (acceptedFiles) => {
    // Manejar los archivos aceptados aquí, por ejemplo, mostrar una vista previa o enviar al servidor.
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const manejarEnvio = (event) => {
    event.preventDefault();
    const datosEnviar = {
      id: uuid(),
      titulo: titulo,
      foto: foto,
      producto: producto,
      precio: precio,
      usuario: props.user.id,
      equipo: equipo,
      fav: false,
    };
    registrarAnuncio(datosEnviar);
    console.log(datosEnviar);
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
      {/* <form onSubmit={manejarEnvio}> */}
      <form>
        <h2>Crear Anuncio</h2>
        {/* <div className="w-full flex flex-col  gap-2 max-w-[60%] min-w-[360px]"> */}
        <div className="w-full flex gap-2 max-w-[75%] min-w-[420px]">
          <div {...getRootProps()} className="dropzone">
            <input
              {...getInputProps()}
              value={foto}
              onChange={actualizarFoto}
            />
            <p>Arrastra y suelta la foto aquí o haz clic para seleccionar.</p>
          </div>
          <div className="contenidoAnuncio">
            <Input
              label="Titulo"
              variant="faded"
              value={titulo}
              onValueChange={actualizarTitulo}
              isInvalid={isTituloInvalid}
              color={isTituloInvalid ? "danger" : ""}
              errorMessage={isTituloInvalid && "Ingrese un titulo valido"}
            />
            <div className="contenidoAnuncio--informacion">
              <div className="informacion--producto">
                <Input
                  label="Producto"
                  variant="faded"
                  value={producto}
                  onValueChange={actualizarProducto}
                  isInvalid={isProductoInvalid}
                  color={isProductoInvalid ? "danger" : ""}
                  errorMessage={
                    isProductoInvalid && "Ingrese un producto valido"
                  }
                />
              </div>
              <div className="informacion--precio">
                <Input
                  label="Precio"
                  variant="faded"
                  value={precio}
                  onValueChange={actualizarPrecio}
                  isInvalid={!isPrecioInvalid}
                  color={!isPrecioInvalid ? "danger" : ""}
                  errorMessage={!isPrecioInvalid && "Ingrese un precio valido"}
                />
              </div>
            </div>
            <div className="contenidoAnuncio--descripcion">
              <Select
                label="Categoría"
                placeholder="Elige una categoría"
                className="max-w-xs"
                value={equipo}
                onChange={manejarCambio}
              >
                {props.data.map((eq) => (
                  <SelectItem key={eq} value={eq}>
                    {eq}
                  </SelectItem>
                ))}
              </Select>
              <Textarea
                variant="faded"
                label="Descripción"
                labelPlacement="outside"
                placeholder="Ingrese una descripcción de su producto (opcional)"
                // description="Enter a concise description of your project."
                className="max-w-xs"
              />
            </div>
          </div>
        </div>
        <Button color="primary" variant="faded" onClick={manejarEnvio}>
          Publicar
        </Button>
      </form>
    </div>
  );
}

export default FormAnuncio;
