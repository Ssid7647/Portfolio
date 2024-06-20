import React from "react";
import { Image } from "react-bootstrap";
import emailjs from '@emailjs/browser';
import "./contact.css"
import fb from "../assets/fb.jfif"
import insta from "../assets/insta.jfif"
import linkdin from "../assets/linkdin.webp"
import  github from "../assets/github.png"



export const Contact = () => {

    const form = React.useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_exb9wrp', 'template_56v1lto', form.current, {
                publicKey: '-IAdk5SAYRgSIn_7y',
            })
            .then(
                () => {
                    alert('SUCCESS!');
                    e.target.reset()
                },
                (error) => {
                    alert('FAILED...', error.text);
                },
            );
    };


    return (
        <section id="contact">
            <div className="contactPage m-5  ">
                <h1 className="title">Contact Me</h1>
                <span className="desc">Please fill out the form below to discuss or contact me.</span>
                <form ref={form} className="form" onSubmit={sendEmail}>
                    <input required={true} style={{"color":"white"}} type="text" className="name p-2" name="from_name" placeholder="Your name please!!!" />
                    <input required={true} style={{"color":"white"}} type="email" className="email p-2" name="from_email" placeholder="email" />
                    <textarea required={true} style={{"color":"white"}} className="msg p-2" rows={5} name="message"  placeholder="message..." />
                    <button className="submitBtn" type="submit" value="send"  >Submit</button>
                    <div className="links">

                        <a href="https://github.com/Ssid7647" target="_blank" >
                            <Image src={github} fluid className="img-fluid images"/>
                        </a>
                        <a href="https://www.linkedin.com/in/mukul-gour-278b52177/" target="_blank">
                            <Image src={linkdin} fluid className="img-fluid images" />
                        </a>
                        <a href="https://www.facebook.com/mukul.bhatnagar.98/" target="_blank" >
                            <Image src={fb} fluid className="img-fluid images" />
                        </a>
                        <a href="https://www.instagram.com/sid_7647/" target="_blank">
                            <Image fluid src={insta} className="img-fluid images" />
                        </a>
                        {/* <img src={fb} className="img"></img>
                        <img src={insta} className="img"></img> */}

                    </div>
                </form>
            </div>
        </section>
    )
}