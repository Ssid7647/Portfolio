import React from "react";
import { Image } from "react-bootstrap";
import "./projects.css"
import DRD from "../assets/DRD.jfif"
import SMS from "../assets/SMS.jpg"
import WFI from "../assets/WFI.jpg"
import { useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";



const Academic = () => {


    const projects = [
        {
            title: "Diabetic Retinopathy Detection",
            image: DRD,
            type: "final year project",
            description: "Diabetic Retinopathy Detection using CNN and Flask is a final year project that combines deep learning and web development to create a robust medical diagnostic tool. Utilizing Convolutional Neural Networks (CNNs) for image classification, the system accurately detects diabetic retinopathy from retinal images.",//"The CNN model is trained on a dataset of labeled retinal images to identify various stages of the disease. A Flask web application serves as the user interface, allowing users to upload images for real-time analysis and receive diagnostic results. This project aims to provide an accessible and efficient solution for early detection and treatment of diabetic retinopathy, leveraging advanced machine learning techniques and user-friendly web technologies.",

        },
        {
            title: "Society Managment System",
            image: SMS,
            type: "PG diploma project",
            description: "The Society Management System using JAVA MVC is a PG diploma project designed to streamline and automate the administrative tasks of residential societies. Built on the Model-View-Controller (MVC) architecture in Java, this system efficiently manages resident information, maintenance requests, billing, and community announcements."// It provides a secure, user-friendly interface for residents and administrators to interact seamlessly. The application enhances communication within the society, tracks financial transactions, and ensures timely maintenance and services. By leveraging the robustness of Java and the structured MVC framework, this project aims to enhance operational efficiency and improve the overall management of residential communities."

        },
        {
            title: "World Fragle Index",
            image: WFI,
            type: "internship project",
            description: "The World Fragile Index using XGBoost is an internship project that leverages machine learning to assess and rank the fragility of countries globally. Utilizing XGBoost, a powerful gradient boosting algorithm, the project analyzes a wide array of socio-economic, political, and environmental indicators to predict and score the stability of nations."// The model is trained on historical data, providing accurate and insightful predictions about potential crises and vulnerabilities. This project aims to offer a robust analytical tool for policymakers, researchers, and international organizations to proactively address and mitigate risks associated with fragile states, thereby contributing to global stability and development."
        }

    ]
    return (
        <div>
            <Container>
                <Carousel slide={true} >
                    {projects.map((item, index) => (
                        <Carousel.Item key={index}>
                            <Card style={{ width: '100%', margin: '0 auto' }}>
                                <Row noGutters>
                                    <Col md={4} >
                                        <Card.Img variant="left" src={item.image} className="tileImage" />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title className="m-4 text-dark">{item.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">"{item.type}"</Card.Subtitle>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>

        </div>



    )
}



export const Projects = () => {

    return (

        <section id="projects">
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center text-center">


                    <h2 className="projects-title">Works</h2>
                    <h3 className="heading">Academic works</h3>
                    <div className="projects">
                        <Academic />
                    </div>

                    <h3 className="heading">Professional Work</h3>
                    <div className="project">
                        <ol style={{ listStyleType: 'upper-roman' }}>
                            <li>
                                DashBoard and backend connectivity and logic design using technologies like <strong>React.js , Socket.io , Redis ,Bull queue</strong>.
                            </li>
                            <li>
                                Design various modules for crawling engine.
                            </li>
                            <li>
                                Sophisticated API for translation for all Indian languages using ULCA.
                            </li>
                            <li>
                                <strong>Rule based Segmentation</strong> for all Indian languages.
                            </li>
                            <li>
                                <strong>NER and POS model</strong> for Indian languages.
                            </li>
                            <li>
                                <strong> Transliteration model and services</strong> for Indian languages.
                            </li>
                            <li>
                                <b>Research paper</b> on "<a href="https://mkl9887647844.medium.com/bionics-prosthetic-using-artificial-intelligence-and-human-augmentation-9d788cdb5c52" target="blank" ><b><u>Bionics: <i>Human augmentation using Artificial Intelligence</i></u></b></a>"
                            </li>
                        </ol>
                    </div>
                </div>

            </Container>


        </section>
    )

}




