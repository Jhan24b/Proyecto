import "./Footer.css";
import fb from "../../img/facebook.png";
import tw from "../../img/twitter.png";
import insta from "../../img/instagram.png";
import logo from "../../img/logo.png";
import { Accordion, AccordionItem } from "@nextui-org/react";
const Footer = () => {
  const whoweare =
    "Somos una empresa publicitaria, la cual busca apoyar al pequeño y mediano agricultor, dando a conocer sus productos de manera virtual, con esto buscamos fomentar la compra directa, de esta forma el agricultor puede obtener una mejor remuneración y el comprador un precio justo";
  const vision = `Vision: Ser una empresa lider en publicidad de productos nativos organicos a nivel de la region Junin, posteriormente escalar a escala nacional
    `;
  const mision =
    "Mision: Apoyar la economia local fomentando la compra de productos de la region directamente a los agricultores";
  const contactenos = "987957337";

  return (
    <footer
      className="footer"
      style={{ backgroundImage: "url(/img/portada2.jpeg)" }}
    >
      <div className="footer--contenido">
        <img className="logo" src={logo} alt="logo" />
        <div className="redes">
          <a href="https://www.facebook.com/anthony.xbestx">
            <img src={fb} alt="Facebook" />
          </a>
          <a href="https://www.facebook.com/anthony.xbestx">
            <img src={tw} alt="Twitter" />
          </a>
          <a href="https://www.facebook.com/anthony.xbestx">
            <img src={insta} alt="Instagram" />
          </a>
        </div>
        <div>
          <strong>Desarrollado por Anthony Torres</strong>
        </div>
      </div>
      <div >
        <div className="contacto--footer">
          <Accordion variant="light" className="acordeon">
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Quienes Somos"
            >
              {whoweare}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Mision - Vision"
            >
              {vision}
              <br></br>
              {mision}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Contactanos">
              {contactenos}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
