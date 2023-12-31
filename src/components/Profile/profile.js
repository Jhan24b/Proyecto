import "./profile.css";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import Colaborador from "../Colaborador/Colaborador";
import Maps from "../Maps/Maps";
import { type } from "@testing-library/user-event/dist/type";
// import { PiWhatsappLogoDuotone } from "react-icons/pi";

function Profile(props) {
  const { anunciosUser } = props;
  const [nombre, actualizarNombre] = useState(props.datosUser.nombre);
  const [telefono, actualizarTelefono] = useState(props.datosUser.telefono);
  const [email, actualizarEmail] = useState(props.datosUser.email);
  const [dni, actualizarDni] = useState(props.datosUser.dni);
  const [ubicacion, setUbicacion] = useState(props.datosUser.ubicacion);
  const [foto, setFoto] = useState(props.datosUser.foto);

  const { actualizarDatosUser, eliminarAnuncio, setPostEdit } =
    props;

  const validateEmail = (value) => {
    // Expresión regular que verifica si el valor es una dirección de correo electrónico válida.
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    return emailPattern.test(value);
  };

  const validateName = (value) => {
    const namePattern = /^[^\s]+(\s[^\s]+)*$/;
    return !namePattern.test(value);
  };

  const validateDNI = (value) => {
    const dniPattern = /^[0-9]{8}$/;
    return dniPattern.test(value);
  };

  const validatePhone = (value) => {
    const phonePattern = /^[0-9]{9}$/;
    return phonePattern.test(value);
  };

  const isNameValid = React.useMemo(() => {
    if (nombre === "") return true;
    return validateName(nombre) ? true : false;
  }, [nombre]);

  const isDniInvalid = React.useMemo(() => {
    if (dni === "") return false;
    return validateDNI(dni) ? false : true;
  }, [dni]);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isPhoneInvalid = React.useMemo(() => {
    if (telefono === "") return false;
    return validatePhone(telefono) ? false : true;
  }, [telefono]);

  const manejarActualizacion = (event) => {
    event.preventDefault();console.log("1");
    console.log(email.length > 0,
      nombre.length > 0,
      dni.toString().length > 0,
      telefono.length > 0, dni, typeof(dni))
    if (
      email.length > 0 &&
      nombre.length > 0 &&
      dni.toString().length > 0 &&
      telefono.length > 0
    ) {
      console.log("2");
      console.log(!isDniInvalid && isNameValid && !isPhoneInvalid && !isInvalid)
      if (!isDniInvalid && !isNameValid && !isPhoneInvalid && !isInvalid) {
        console.log("3");
        const datosEnviar = {
          nombre: nombre,
          foto: foto,
          dni: dni,
          telefono: telefono,
          ubicacion: ubicacion,
          email: email,
          fav: false,
        };
        actualizarDatosUser(props.datosUser.id, datosEnviar);
      }
    }
  };

  const manejarActualizacionFoto = (newFoto) => {
    setFoto(newFoto);
  };

  return (
    <div className="profileC">
      <div className="datosC">
        <div className="foto-miniC">
          <img src={foto} alt="fotoUsuarioC"></img>
          <Button
            color="primary"
            variant="ghost"
            onClick={manejarActualizacionFoto}
          >
            Actualizar Foto
          </Button>
        </div>
        <div className="detallesC">
          <form>
            <h2 className="tituloDetalleC">DATOS DEL PERFIL</h2>
            <div className="w-full flex flex-col  gap-2 max-w-[60%] min-w-[360px]">
              <Input
                label="Nombres"
                variant="faded"
                value={nombre}
                onValueChange={actualizarNombre}
                isInvalid={isNameValid}
                color={isNameValid ? "danger" : ""}
                errorMessage={isNameValid && "Ingrese un nombre valido"}
              />
              <Input
                label="DNI"
                variant="faded"
                value={dni}
                onValueChange={actualizarDni}
                isInvalid={isDniInvalid}
                color={isDniInvalid ? "danger" : ""}
                errorMessage={isDniInvalid && "Ingrese un numero de DNI"}
              />

              <Input
                label="Telefono"
                variant="faded"
                value={telefono}
                onValueChange={actualizarTelefono}
                isInvalid={isPhoneInvalid}
                color={isPhoneInvalid ? "danger" : ""}
                errorMessage={
                  isPhoneInvalid && "Ingrese un numero de telefono valido"
                }
              />

              <Input
                label="Correo Electronico"
                type="email"
                variant="faded"
                value={email}
                onValueChange={actualizarEmail}
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : ""}
                errorMessage={isInvalid && "Ingrese un correo valido"}
              />

              <Input
                isDisabled
                label="Ubicacion"
                variant="faded"
                value={ubicacion}
                onValueChange={setUbicacion}
              />
              <Maps register={setUbicacion} className="ubiProfile"/>
            </div>
            <div className="botonesEdicion">
              <Button
                color="primary"
                variant="ghost"
                onClick={manejarActualizacion}
              >
                Actualizar
              </Button>
              <Button color="secondary" variant="ghost">
                <NavLink to="/profile/cambioContrasena">
                  Cambiar Contraseña
                </NavLink>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="anunciosC">
        {anunciosUser
          .filter((anuncio) => anuncio.usuario === props.datosUser.id)
          .map((ad, idx) => {
            return (
              <Colaborador
                key={idx}
                datos={ad}
                opt={props.opt}
                eliminarAnuncio={eliminarAnuncio}
                user={props.datosUser}
                users={props.users}
                setPostEdit={setPostEdit}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
