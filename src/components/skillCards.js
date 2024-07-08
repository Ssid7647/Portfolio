import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import ai from "../assets/ai.png"
import nlp from "../assets/natural-language-processing.png"
import backend from "../assets/backend.png"
import node from "../assets/nodejs.png"
import react from "../assets/react.png"
import js from "../assets/node.webp"
import python from "../assets/python.png"
import dbms from "../assets/database.png"
import Container from 'react-bootstrap/Container';

import "./skillCards.css"


const SkillCards = () => {


    const skills = [

        {
            variant: "primary",
            title: "Artificial Intelligence",
            img: ai
        },
        {
            variant: "secondary",
            title: "Natural Language Programming",
            img: nlp
        },
        {
            variant: "success",
            title: "Node.js",
            img: node
        },
        {
            variant: "danger",
            title: "DBMS",
            img: dbms
        },
        {
            variant: "warning",
            title: "System design",
            img: backend
        },
        {
            variant: "info",
            title: "Python",
            img: python
        },
        {
            variant: "light",
            title: "React",
            img: react
        },
        {
            variant: "dark",
            title: "Javascript",
            img: js
        },
    ]

    const cardGroupStyle = {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "width": "100vm",
        "justifyContent": "center",
        "alignItems": "center",
        "maxWidth": "75rem",
        'margin': "0 auto",
        "padding": "1rem 2rem"
    }

    const imgStyle = {
        "z-index": -1,
        "object-fit": "cover",
        "height": "5.5rem",
        "align-self": "center",
        width: "5.5rem",
        "padding":".5rem"
    }



    return (


        <Row xs={2} md={4} className="g-4 justify-content-md-center ">
            {skills.map((skill, idx) => (
                <Col key={idx}>
                    <Card className="cardStyle" bg={skill.variant.toLowerCase()}
                        key={skill.variant}
                        text={skill.variant.toLowerCase() === 'light' ? 'dark' : 'white'}

                        border={skill.variant.toLowerCase()}
                    >

                        <Card.Img  variant="top" style={imgStyle} src={skill.img} />
                        <Card.Body>
                            <Card.Title className='cardTitle'>{skill.title}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
     


    );
}

export default SkillCards;
