import "./Footer.css";
import fb from "../../img/facebook.png";
import tw from "../../img/twitter.png";
import insta from "../../img/instagram.png";
import logo from "../../img/logo.png";
import { Accordion, AccordionItem } from "@nextui-org/react";
const Footer = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <footer
      className="footer"
      style={{ backgroundImage: "url(/img/portada2.jpeg)" }}
    >
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
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div>
        <div className="contacto--footer">
        <Accordion variant="light" className="acordeon">
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
        </div>
        <div>
          <strong>Desarrollado por Anthony Torres</strong>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
