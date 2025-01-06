import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useDocTitle from "../hooks/useDocTitle";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from 'react-icons/md';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { TbStethoscope, TbHeartPlus } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdAccountCircle } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaHospital } from 'react-icons/fa';
import { IoAccessibility } from "react-icons/io5";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import bg from "../assets/landing-bg.png";
import need from "../assets/need.png";
import profiles from "../data/teamData";


const LandingPage = () => {

    const { isLoading, toggleLoading } = useContext(commonContext);

    useEffect(() => {
        toggleLoading(true);
        setTimeout(() => toggleLoading(false), 2000);
    }, []);

    useScrollDisable(isLoading);

    useDocTitle();

    const navigate = useNavigate();

    const handleOnCLick = () => {
         navigate('/doctors');
    }

    const faqs = [
        {
            question: "What is TelMedSphere?",
            answer: "It is the web application that connects patients to the right doctor or allow them to choose a doctor as per their need. It provides information about users, doctors, news, appointments, and prescriptions. It also allows users to create instant meetings with doctors, and buy medicines. It allows users to check their health status by using his/her symptoms."
        },
        {
            question: "Can we get a free account in TelMedSphere and use all its features for free?",
            answer: "Yes, Ofcourse. You can use all the features provided by TelMedSphere for free."
        },
        {
            question: "Can we book an appointment at any time?",
            answer: "Yes. You can book an appointment of a doctor if he/she is free at that time."
        },
        {
            question: "Is there a way to test our health?",
            answer: "Yes. You can test your health by a Model that predicts the disease probability in the future."
        },
        {
            question: "Can we purchase the medicines from here?",
            answer: "Yes. You can purchase the medicines from TelMedSphere store."
        },
    ];

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <>
            {/* <div id="landing-page-bg"></div> */}
            <div id="landing-page">

                <section className="intro-section">
                    <div className="curvy-img"></div>
                    <div className="content">
                        <div className="text">
                            <h2 className="highlight-heading animated-heading">Healing Hands & Caring Hearts</h2>
                            <p className="highlight-text">
                                Connecting patients and doctors, no matter the distance <br />
                                we are dedicated to your wellbeing & committed to your care...
                            </p>
                            {/* {localStorage.getItem("username") && localStorage.getItem("username") !== "undefined" && localStorage.getItem("usertype") === "patient" && (
                                <button onClick={() => navigate("/wellness-programs")}>Join Wellness Program</button>
                            )} */}
                        </div>

                        <div className="doctor-img">
                            <img src={bg} alt="landing bg" />
                        </div>


                    </div>
                </section>

                <section className="services-section">
                    <div className="header">
                        <h2>Services we provide</h2>
                    </div>
                    <div className="service-list">
                        <div className="service-item">
                            <div className="icon-container">
                                <div className="icon icon-1">
                                    <TbStethoscope />
                                </div>
                            </div>
                            <h3>Experienced Doctors</h3>
                            <p>Connect with doctors through live video calls and receive prescriptions.</p>
                        </div>
                        <div className="service-item">
                            <div className="icon-container">
                                <div className="icon icon-2">
                                    <BsRobot />
                                </div>
                            </div>
                            <h3>Health Prediction</h3>
                            <p>Assess your health status with our advanced disease detection model.</p>
                        </div>
                        <div className="service-item">
                            <div className="icon-container">
                                <div className="icon icon-3">
                                    <GiMedicines />
                                </div>
                            </div>
                            <h3>Pharmacy store</h3>
                            <p>Buy medications securely through our integrated pharmacy service.</p>
                        </div>
                    </div>
                </section>


                <section className="need-section">
                    <div className="need-div">
                        <div className="img-div">
                            <img src={need} alt="why" />
                        </div>
                        <div className="content">
                            <h2>Why do we need a proper health care?</h2>
                            <ul>
                                <li>WHO recommends 44.5 doctors per 10,000 people but India has only 22 per 10k people so major supply demand mismatchIndia has 22.8 doctors for every 10K citizens, the half of what WHO recommends.</li>
                                <li>Also, local doctors may fail to provide  the best consultation as they lack expertise & experience.</li>
                                <li>Thus all-in-one online hospital was created. It offers a disease prediction system, pharmacy, and payments.</li>
                                <li>This platform provides access to quality healthcare from anywhere, improving healthcare outcomes and accessibility.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="benefits-section">
                    <div className="content">
                        <h2>Our Benefits</h2>
                        <div className="benefits">
                            <div className="first">
                                <div className="icon"><MdOutlineHealthAndSafety /> </div>
                                <p>TeleHealth services</p>
                            </div>
                            <div className="second">
                                <div className="icon"><IoAccessibility /> </div>
                                <p>Convenience and accessibility</p>
                            </div>
                            <div className="third">
                                <div className="icon"><TbStethoscope /> </div>
                                <p>Online Appointment Booking</p>
                            </div>
                            <div className="fourth">
                                <div className="icon"><TbHeartPlus /> </div>
                                <p>Competitive advantage</p>
                            </div>
                        </div>
                    </div>
                </section>

                {(localStorage.getItem("username") && localStorage.getItem("username") !== "undefined") && localStorage.getItem("usertype") === "patient" &&
                    <section className="team-section">
                        <div className="team-div">
                            <div className="head"><h2>Meet Our Team</h2></div>
                            <div className="team">
                            {profiles.map(profile => (
                                <div className="item" key={profile.id}>
                                    <div className="img-div">
                                        <img src={profile.imgSrc} alt={profile.name} className="img" />
                                        <div className="contact-div">
                                            {profile.contact.map((contact, index) => {
                                                const IconComponent = contact.icon === "IoMdMail" ? IoMdMail :
                                                    contact.icon === "FaPhoneAlt" ? FaPhoneAlt :
                                                        FaHospital; 
                                                return (
                                                    <div className="contact-icon" key={index} onClick={handleOnCLick}>
                                                        <IconComponent />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <h3>{profile.name}</h3>
                                    <p>{profile.specialty}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    </section>
                }



                <section className="faq-section">
                    <div className="faq-div">
                        <div className="img-div">
                            <img src="faq-img.png" alt="faq" />
                        </div>
                        <div className="content">
                            <h2 className="head">Any Queries ?</h2>
                            <div className="faqs">
                                {faqs.map((item, index) => (
                                    <Accordion key={index} className="faq-item">
                                        <AccordionSummary
                                            expandIcon={<MdExpandMore className="icon" />}
                                            className="expand-icon"
                                        >
                                            <div className="item-qn">{item.question}</div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="item-ans">{item.answer}</div>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LandingPage;