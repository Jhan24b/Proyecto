import "./Footer.css";
import fb from "../../img/facebook.png";
import tw from "../../img/twitter.png";
import insta from "../../img/instagram.png";
import logo from "../../img/logo.png";
const Footer = ()=>{
    return <footer className="footer" style={{backgroundImage: "url(/img/portada2.jpeg)"}}>
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
        <img className="logo" src = {logo} alt="logo"/>
        <strong>Desarrollado por Anthony Torres</strong>
    </footer>
}

export default Footer;