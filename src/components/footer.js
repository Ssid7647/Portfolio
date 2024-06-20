import React from "react";
import { Container, Image } from "react-bootstrap";
import "./footer.css";
import { Link } from 'react-scroll'
// import "./contact.css"
import fb from "../assets/fb.jfif"
import insta from "../assets/insta.jfif"
import linkdin from "../assets/linkdin.webp"
import github from "../assets/github.png"

import devAI from "../assets/pngwing.com.png"




export const Footer = () => {
    return (
        <section id="footer">
            <Container >
                <footer className="footer-container">

                    <div className="imgIcon">
                        <Image style={{ width: "5rem", height: "5rem" }} src={devAI}></Image>
                    </div>
                    <div>

                        <h1 className="footer__title">Mukul Gour</h1>
                        <span className="footer__subtitle">AI + MERN Developer</span>
                    </div>


                    <div className="links">
                        <Link activeClass="active" to="intro" spy={true} smooth={true} offset={-100} duration={100} className="link">Home</Link>
                        <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-50} duration={100} className="link">Portfolio</Link>
                        <Link activeClass="active" to="timeline" spy={true} smooth={true} offset={-50} duration={100} className="link">Timeline</Link>
                        <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-100} duration={100} className="link">Works</Link>
                    </div>

                    <div className="links">

                        <a href="https://github.com/Ssid7647" target="_blank" >
                            <img src={github} className="img-fluid image " />
                        </a>
                        <a href="https://www.linkedin.com/in/mukul-gour-278b52177/" target="_blank">
                            <img src={linkdin} className="img-fluid image" />
                        </a>
                        <a href="https://www.facebook.com/mukul.bhatnagar.98/" target="_blank" >
                            <img src={fb} className="img-fluid image" />
                        </a>
                        <a href="https://www.instagram.com/sid_7647/" target="_blank">
                            <img src={insta} className="img-fluid image" />
                        </a>
                        {/* <img src={fb} className="img"></img>
        <img src={insta} className="img"></img> */}


                    </div>


                </footer>
            </Container>


            <p className="footer__copy">© Mukul 2024</p>

        </section>
    )
}