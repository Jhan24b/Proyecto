import "./formulario.css";

import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";

import { v4 as uuid } from "uuid";

function Formulario(props) {
  const [nombre, actualizarNombre] = useState("");
  const [telefono, actualizarTelefono] = useState("");
  const [email, actualizarEmail] = useState("");
  const [password, actualizarPassword] = useState("");
  const [dni, actualizarDni] = useState("");

  const { registrarColaborador, establecerUser } = props;
  const navigate = useNavigate ();

  const manejarEnvio = (event) => {
    event.preventDefault();
    if (
      email.length > 0 &&
      nombre.length > 0 &&
      dni.length > 0 &&
      telefono.length > 0 &&
      password.length > 0
    ) {
      if (
        !isDniInvalid &&
        isNameValid &&
        !isPhoneInvalid &&
        isStrong &&
        !isInvalid
      ) {
        const datosEnviar = {
          id: uuid(),
          nombre: nombre,
          foto: "",
          dni: dni,
          telefono: telefono,
          equipo: "",
          ubicacion: "",
          email: email,
          password: password,
          fav: false,
        };
        registrarColaborador(datosEnviar);
        establecerUser({
          nombre: nombre,
          dni: dni,
          telefono: telefono,
          equipo: "",
          ubicacion: "",
          email: email,
        });
        props.mostrarForm();
      }
    }
  };

  // const manejarNuevoEquipo = (e) =>{
  //     e.preventDefault();
  //     crearEquipo({titulo, colorPrimario: color});
  // }

  const validateEmail = (value) => {
    // Expresión regular que verifica si el valor es una dirección de correo electrónico válida.
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    return emailPattern.test(value);
  };

  const validateName = (value) => {
    const namePattern = /^[A-Za-z]{2,100}$/;
    return namePattern.test(value);
  };

  const validateDNI = (value) => {
    const dniPattern = /^[0-9]{8}$/;
    return dniPattern.test(value);
  };

  const validateStrongPassword = (value) => {
    // La contraseña debe tener al menos 8 caracteres
    if (value.length < 8) {
      return false;
    }

    // Debe contener al menos una letra mayúscula
    if (!/[A-Z]/.test(value)) {
      return false;
    }

    // Debe contener al menos una letra minúscula
    if (!/[a-z]/.test(value)) {
      return false;
    }

    // Debe contener al menos un dígito
    if (!/\d/.test(value)) {
      return false;
    }

    // Debe contener al menos un carácter especial (por ejemplo, @, #, $, etc.)
    if (!/[@#$%^&+=]/.test(value)) {
      return false;
    }

    // Si pasa todas las condiciones anteriores, la contraseña es fuerte
    return true;
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

  const isStrong = React.useMemo(() => {
    if (password === "") return true;

    return validateStrongPassword(password) ? true : false;
  }, [password]);

  const isPhoneInvalid = React.useMemo(() => {
    if (telefono === "") return false;
    return validatePhone(telefono) ? false : true;
  }, [telefono]);

  const manejarInicioSesion = (e) => {
    e.preventDefault();
    if (!isInvalid && isStrong) {
      if(props.verificar(email, password)){
        props.mostrarForm();
        navigate("/");
      }
    }
  };

  return (
    <section className="formulario">
      {/* REGISTRO */}
      {props.tipoForm === "SignUp" && (
        <form onSubmit={manejarEnvio}>
          <h2>Registrarse</h2>
          <div className="w-full flex flex-col  gap-2 max-w-[60%] min-w-[360px]">
            <Input
              label="Nombres"
              variant="faded"
              value={nombre}
              onValueChange={actualizarNombre}
              isInvalid={!isNameValid}
              color={!isNameValid ? "danger" : ""}
              errorMessage={!isNameValid && "Ingrese un nombre valido"}
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
              label="Password"
              variant="faded"
              value={password}
              onValueChange={actualizarPassword}
              type="password"
              isInvalid={isStrong}
              color={isStrong ? "" : "danger"}
              errorMessage={!isStrong && "Ingrese una contraseña valida"}
            />
          </div>
          <div className="botonLogin">
            <Button color="primary" variant="ghost" onClick={manejarEnvio}>
              Registrarse
            </Button>
          </div>
        </form>
      )}

      {/* LOGIN */}
      {props.tipoForm === "Login" && (
        <form>
          <h2>Iniciar Sesión</h2>
          <div className="w-full flex flex-col  gap-2 max-w-[60%] min-w-[360px]">
            <Input
              label="Correo Electronico"
              type="email"
              variant="faded"
              value={email}
              onValueChange={actualizarEmail}
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : ""}
              errorMessage={isInvalid && "Ingrese un correo electronico valido"}
            />

            <Input
              label="Password"
              variant="faded"
              value={password}
              onValueChange={actualizarPassword}
              type="password"
              isInvalid={isStrong}
              color={isStrong ? "" : "danger"}
              errorMessage={!isStrong && "Ingrese una contraseña válida"}
            />
          </div>
          <div className="botonLogin">
            <Button
              color="primary"
              variant="ghost"
              onClick={manejarInicioSesion}
            >
              Iniciar Sesion
            </Button>
          </div>
          {/* <Campo titulo="Color" placeholder="Ingrese el color en HEX" required valor={color} actualizarValor={actualizarColor} 
                type = "color"
            />
            <Boton title="Register Team"/> */}

          {/* <Boton title="Iniciar Sesión" /> */}
        </form>
      )}
    </section>
  );
}

export default Formulario;
