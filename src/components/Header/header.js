import "./header.css";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import logo from "../../img/logo.png";

function Header(props) {
  return (
    <header className="header">
      <Navbar>
        <NavbarBrand>
          <img src={logo} alt="logo" />
          {/* <p className="font-bold text-inherit">Friendly Farm</p> */}
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* Buscador */}
          <NavbarItem>
            <form className="form">
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
                required=""
                type="text"
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
          {(!props.form) && (<NavbarItem className="hidden lg:flex">
            <Button href="#" className="btn-login" onClick={()=>{
              props.mostrarForm();
              props.ponerTipoForm('Login');
            }}>Login</Button>
          </NavbarItem>)}
          {(!props.form) && (<NavbarItem>
            <Button className="btn-sign-up border-color-brown border-width-2" href="#" variant="flat" onClick={() => {
              props.mostrarForm();
              props.ponerTipoForm('SignUp');
            }}>
              Sign Up
            </Button>
          </NavbarItem>)}
          {(props.form) && (<NavbarItem>
            <Button className="btn-sign-up border-color-brown border-width-2" href="#" variant="flat" onClick={props.mostrarForm}>
              Regresar
            </Button>
          </NavbarItem>)}
          {(props.authenticatedUser) && (<NavbarItem>
            {props.authenticatedUser.nombre}
            <Button className="btn-sign-up border-color-brown border-width-2" href="#" variant="flat" onClick={props.mostrarSign}>
              Perfil
            </Button>
          </NavbarItem>)}
        </NavbarContent>
      </Navbar>
    </header>
  );
}

export default Header;
