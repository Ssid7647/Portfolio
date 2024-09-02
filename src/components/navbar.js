import React from "react"
import "./navbar.css"
import logo from "../assets/mg-high-resolution-logo-white-transparent.png"
import contactImg from "../assets/contactImg.png"
import { Link } from 'react-scroll'
import menu from "../assets/menu.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const NavbarComponent = () => {

    const [showMenu, setShowMenu] = React.useState(false)
    return (




        <section>
            <Container >
            
                <nav className="navbar navbar-expand-lg topNav ">
                    <div class="container-fluid" >
                        <div className="navbar-brand">
                            <img src={logo} alt="logo" className="logo"></img>
                        </div>

                        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                        <div className="desktopMenu">

                            <Link activeClass="active" to="intro" spy={true} smooth={true} offset={-50} duration={100} className="desktopMenuListitem">Home</Link>
                            <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-100} duration={100} className="desktopMenuListitem">Portfolio</Link>
                            {/* <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListitem">Skills</Link> */}
                            <Link activeClass="active" to="timeline" spy={true} smooth={true} offset={-50} duration={100} className="desktopMenuListitem">Timeline</Link>
                            <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-100} duration={100} className="desktopMenuListitem">Works</Link>
                            {/* <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-100} duration={100} className="desktopMenuListitem">Works</Link> */}
                            {/* <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-100} duration={100} className="desktopMenuListitem">Works</Link> */}


                        </div>
                        <button className="desktopMenuBtn" onClick={() => {
                            document.getElementById("contact").scrollIntoView(
                                { behavior: "smooth" }
                            )
                        }}>
                            <img src={contactImg} alt="contact img" className="desktopIconImg"></img>
                            Contact Me
                        </button>

                        <Image src={menu} alt="logo" className="mobMenu sandwich" onClick={() => setShowMenu(true)} />
                        <div className="navMenu" style={{ "display": showMenu ? "flex" : "none" }}>

                            <Link activeClass="active" to="intro" spy={true} smooth={true} offset={-100} duration={100} className="Listitem" onClick={() => setShowMenu(false)}>Home</Link>
                            <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-50} duration={100} className="Listitem" onClick={() => setShowMenu(false)}>About</Link>
                            {/* <Link activeClass="active" to="works" spy={true} smooth={true} offset={-50} duration={100} className="Listitem" onClick={() => setShowMenu(false)}>Portfolio</Link> */}
                            <Link activeClass="active" to="timeline" spy={true} smooth={true} offset={-50} duration={100} className="Listitem" onClick={() => setShowMenu(false)}>Timeline</Link>
                            <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-100} duration={100} className="Listitem" onClick={() => setShowMenu(false)}>Contact</Link>

                        </div>
                    </div>
                </nav>


            </Container></section>








    )
}





export default NavbarComponent