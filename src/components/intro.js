import React from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./intro.css"
import { Link } from "react-scroll"
import hireMe from "../assets/briefcase.png"
import bg from "../assets/me2.png"
import { Button } from "react-bootstrap"
import Image from 'react-bootstrap/Image';

const Intro = () => {

    const handleDownload = () => {
        // You can put the URL of your resume here
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/Resume.pdf`;
        link.setAttribute('download', 'Mukul_Gour_resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="intro">

            <Container >
                <div className="intro-container  d-flex justify-content-center align-items-center p-2">

                    <Col md={5} className="introContent text-wrap d-flex-column justify-content-start align-items-start text-start m-1">

                        <span className="introtext">Hello , I'm </span><span className="introName"> Mukul </span>,<br />
                        <span className="fs-2">    AI & Full  stack  developer </span>
                        <p className="paragraph text-wrap">I am a skilled AI & MERN developer , creating intelligent systems is my passion.</p>
                        <Link><Button variant="outline-primary" className="btn" to="#" onClick={handleDownload} ><Image fluid src={hireMe} alt="hire me" className="hireMeImage" /> Download <br />Resume</Button></Link>

                    </Col>
                    <Col md={3} >
                        <div className="introImage bg-black ">
                            <Image fluid src={bg} alt="profile" className="resumeImg" />

                        </div>

                    </Col>

                </div>
            </Container>










        </section>

    )
}


export default Intro;