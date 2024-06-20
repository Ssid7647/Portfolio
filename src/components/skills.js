import React from "react";
import "./skills.css"
import SkillCards from "./skillCards.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Skills = () => {

    return (
        <section id="skills">
            <Container >
                <Row >
                    <span className="skillTitle ">Portfolio</span>
                </Row>
                <Row>
                    <Col>
                        <span className="skillDesc ">  As an AI + MERN Developer with <b>3 years of experience</b> at <b>C-DAC , Pune</b>, I design and implement intelligent web applications
                            by combining advanced AI techniques with the robust MERN stack. My responsibilities include developing and
                            integrating <b>machine learning models</b> or <b>rule-based</b> intelligent modules for tasks such as NLP and predictive analytics,
                            building dynamic and responsive frontends with React, crafting efficient RESTful APIs using Express.js and Node.js,
                            and managing NoSQL databases with MongoDB. I ensure seamless interaction between AI components and web interfaces,
                            delivering innovative, data-driven solutions that enhance user experiences and drive business outcomes.</span></Col>



                </Row>
                <Row>
                    <h7 className="skillHeading">Skills</h7>
                </Row>
                <Row><SkillCards /></Row>
            </Container>






        </section>
    )
}

export default Skills