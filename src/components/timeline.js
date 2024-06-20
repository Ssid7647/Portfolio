import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "./timeline.css"
import "./tabs.css"
import React from 'react';
import Card from 'react-bootstrap/Card';

import 'react-vertical-timeline-component/style.min.css';
import { Icon } from './img';
import school from "../assets/school.png"
import schools from "../assets/school.jfif"
import collageIcon from "../assets/collageIcon.png"
import collage from "../assets/collage.jfif"
import intershipIcon from "../assets/internship.png"
import forsk from "../assets/forsk.jfif"
import acts from "../assets/acts.jfif"
import job from "../assets/job.png"
import cdac from "../assets/cdac.jfif"
import Tabs from './tabs';
import { Image } from 'react-bootstrap';



import { FaUniversity } from "react-icons/fa";
import { LuSchool } from "react-icons/lu";
import { IoMdSchool } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { FiItalic } from "react-icons/fi";

const Education = () => {
    return (
        <div className="container">
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="may-2021 - oct-2021"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', }}
                    icon={<IoMdSchool />}
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Image src={cdac} />
                        <h3 className="vertical-timeline-element-title">PGDAC</h3>
                        {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                        <p>CDAC-ACTS, Pune</p>
                    </div>

                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2016 - 2020"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FaUniversity />}
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Image src={collage}></Image>
                        <h3 className="vertical-timeline-element-title">B.Tech</h3>
                        {/* <h4 className="vertical-timeline-element-subtitle">JECRC,Jaipur</h4> */}
                        <p>
                            Information Technologies
                        </p>
                    </div>

                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    date="2001 - 2016"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<LuSchool />}
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Image src={schools}></Image>
                        <h3 className="vertical-timeline-element-title">Central Academy Shikshantar,kota,(Raj)</h3>
                        {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                        <p>
                            PCM
                        </p>
                    </div>

                </VerticalTimelineElement>

            </VerticalTimeline>
        </div>
    )
}

const Job = () => {
    return (
        <div className="container">
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="oct-2021 - present"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<GoCodeReview />}
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Image src={cdac} />
                        <div className="h3 vertical-timeline-element-title">Project Engineer</div>
                        <div className="h4 vertical-timeline-element-subtitle">Cdac,pune</div>
                        <p>AAI & GIST</p>
                    </div>

                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="apr-2019 july-2019"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FiItalic />}
                >
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Image src={forsk}></Image>
                        <h3 className="vertical-timeline-element-title">Forsk Technologies,</h3>
                        <h4 className="vertical-timeline-element-subtitle">Jaipur</h4>
                        <p>
                            Internship
                        </p>
                    </div>

                </VerticalTimelineElement>

              

            </VerticalTimeline>
        </div>
    )
}
const Timelines = () => {

    const [key, setKey] = React.useState('home');

    const events = [
        {
            date: "2005 - 2016",
            title: "School",
            description: "Central Academy Shikshantar, Kota (Raj.)",
            side: "left",
        },
        {
            date: "2016 - 2020",
            title: "College",
            description: "Jaipur Engineering College and Research Center, Jaipur",
            side: "right",
        },
        {
            date: "April 2019 - Aug 2019",
            title: "Internship",
            description: "Forsk Technologies, Jaipur",
            side: "left",
        },
        {
            date: "2021 - Present",
            title: "Job",
            description: "Center for Development and Advanced Computing, Pune",
            side: "right",
        },
    ];

    return (
        <section id="timeline" >

            <div className='d-flex flex-column justify-content-center align-items-center m-5'>
                <div className="h3 m-5">
                    My-Timeline
                </div>

                <Tabs>


                <div label="Academic"><Education /></div>
                    <div label="Professional"><Job /></div>
                   

                </Tabs>
            </div>



        </section>






    )
}


export default Timelines

