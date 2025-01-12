import React, {useState, useRef} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from 'react-icons/md';

const Faq = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const faqRef = useRef(null);

    const handleFaqClick = (index) => {
        setOpenFaqIndex(prevIndex => (prevIndex === index ? null : index));
    };

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

    return(
        <section className="faq-section">
            <div className="faq-div" ref={faqRef}>
                <div className="img-div">
                    <img src="faq-img.png" alt="faq" />
                </div>
                <div className="content">
                    <h2 className="head">Any Queries ?</h2>
                    <div className="faqs">
                        {faqs.map((item, index) => (
                            <Accordion
                                key={index}
                                className="faq-item object-cover shadow-md hover:shadow-[0px_0px_10px_2px_rgba(59,130,246,0.6)]"
                                expanded={openFaqIndex === index}
                                onChange={() => handleFaqClick(index)}
                            >
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
    );
};

export default Faq;