import "./header.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import logo from "../../img/logo.png";

function Header(props) {
  const [busqueda, setBusqueda] = useState("");
  const { setAuthenticatedUser, setBuscar } = props;
  const usuarioHaIniciadoSesion =
    Cookies.get("usuarioIniciadoSesion") === "true";
  const navigate = useNavigate();

  const closeSession = () => {
    setAuthenticatedUser(null);
    Cookies.set("usuarioIniciadoSesion", "false");
    navigate("/login");
  };

  const buscar = (e) => {
    e.preventDefault();
    setBuscar(busqueda);
    navigate("/filtered");
  };

  return (
    <header className="header">
      <Navbar>
        <NavbarBrand>
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* Buscador */}
          <NavbarItem>
            <form className="form" onSubmit={buscar}>
              <button>
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                className="input"
                placeholder="Type your text"
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              ></input>
              <button className="reset" type="reset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </form>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {/* Botones */}
          {!props.form && !props.authenticatedUser && (
            <NavbarItem className="hidden lg:flex">
              <NavLink to="/login">
                <Button
                  href="#"
                  className="btn-login"
                  onClick={() => {
                    props.mostrarForm();
                  }}
                >
                  Login
                </Button>
              </NavLink>
            </NavbarItem>
          )}
          {!props.form && !props.authenticatedUser && (
            <NavbarItem>
              <NavLink to="/sign-up">
                <Button
                  className="btn-sign-up border-color-brown border-width-2"
                  href="#"
                  variant="flat"
                  onClick={() => {
                    props.mostrarForm();
                  }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </NavbarItem>
          )}
          {props.form && (
            <NavbarItem>
              <Button
                className="btn-sign-up border-color-brown border-width-2"
                href="#"
                variant="flat"
                onClick={props.mostrarForm}
              >
                <NavLink to="/">Regresar</NavLink>
              </Button>
            </NavbarItem>
          )}
          {props.authenticatedUser && (
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    <img src={props.authenticatedUser.foto} alt="img-profile" />
                    {props.authenticatedUser.nombre}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <NavLink to="/profile">
                    <DropdownItem key="profile">Perfil</DropdownItem>
                  </NavLink>
                  <NavLink to="/add-ad">
                    <DropdownItem key="new-ad">Crear Anuncio</DropdownItem>
                  </NavLink>
                  {/* <DropdownItem key="manage-ads">
                    <NavLink to="/manage-ads" >Gestionar Anuncios</NavLink>
                  </DropdownItem> */}
                  <DropdownItem
                    key="end-session"
                    className="text-danger"
                    color="danger"
                    onClick={closeSession}
                  >
                    Cerrar Sesion
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
}

export default Header;
