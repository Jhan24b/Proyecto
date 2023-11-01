import "./CambioContrasena.css";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

function CambioContrasena(props) {
  const { idUser, actualizarPassword } = props;
  const [password, setPassword] = useState("");

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

  const isStrong = React.useMemo(() => {
    if (password === "") return true;

    return validateStrongPassword(password) ? true : false;
  }, [password]);

  const manejarNuevoPassword = (event) => {
    event.preventDefault();
    if (password.length > 0 && isStrong) {
      const datosEnviar = {
        password: password,
      };
      actualizarPassword(idUser, datosEnviar);
    }
  };

  return (
    <div className="form--newPassword">
      <h3 className="titleFNP">Cambiar Contraseña</h3>

      <div className="contenidoFNP">
        <Input
          label="Password"
          variant="faded"
          value={password}
          onValueChange={setPassword}
          type="password"
          isInvalid={isStrong}
          color={isStrong ? "" : "danger"}
          errorMessage={!isStrong && "Ingrese una contraseña valida"}
        />
        <div className="botonFNP">
          <Button
            color="primary"
            variant="ghost"
            onClick={manejarNuevoPassword}
          >
            Cambiar Contrasena
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CambioContrasena;
