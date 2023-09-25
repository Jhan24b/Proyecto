import "./Footer.css";

const Footer = ()=>{
    return <footer className="footer" style={{backgroundImage: "url(/img/portada2.jpeg)"}}>
        <div className="redes">
            <a href="https://www.facebook.com/anthony.xbestx">
                <img src="/img/facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.facebook.com/anthony.xbestx">
                <img src="/img/twitter.png" alt="Twitter" />
            </a>
            <a href="https://www.facebook.com/anthony.xbestx">
                <img src="/img/instagram.png" alt="Instagram" />
            </a>
        </div>
        <strong>Friendly Farm</strong>
        <strong>Desarrollado por Anthony Torres</strong>
    </footer>
}

export default Footer;