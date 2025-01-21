import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import useDocTitle from "../hooks/useDocTitle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore, MdOutlineHealthAndSafety } from "react-icons/md";
import { TbStethoscope, TbHeartPlus } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import { IoAccessibility } from "react-icons/io5";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import bgImage from "../assets/landing-bg.png";
import needImage from "../assets/need.png";
import profiles from "../data/teamData";
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaHospital } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const handleOnCLick = () => {
  navigate('/doctors');
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const LandingPage = () => {
  const { isLoading, toggleLoading } = useContext(commonContext);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const faqRef = useRef(null);

  useEffect(() => {
    toggleLoading(true);
    setTimeout(() => toggleLoading(false), 2000);
  }, []);

  useScrollDisable(isLoading);
  useDocTitle("Welcome to TelMedSphere");

  const handleFaqClick = (index) => {
    setOpenFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleOutsideClick = (event) => {
    if (faqRef.current && !faqRef.current.contains(event.target)) {
      setOpenFaqIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-blue-50 flex flex-col lg:flex-row items-center py-16 px-8 lg:justify-between">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">
            Healing Hands & Caring Hearts
          </h1>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Connecting patients and doctors—dedicated to your wellbeing and
            committed to your care.
          </p>
        </motion.div>
        <motion.div
          className="lg:w-1/2 mt-8 lg:mt-0"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <img
            src={bgImage}
            alt="Landing background"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-semibold text-blue-800">Our Services</h2>
          <p className="text-gray-600 mt-4">
            Explore our comprehensive services designed for your health and
            convenience.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {[
            { icon: <TbStethoscope className="text-4xl text-blue-600" />, title: "Experienced Doctors", description: "Connect with doctors via video calls and receive prescriptions instantly." },
            { icon: <BsRobot className="text-4xl text-yellow-500" />, title: "Health Prediction", description: "Predict your health status with our advanced AI disease detection." },
            { icon: <GiMedicines className="text-4xl text-red-500" />, title: "Pharmacy Store", description: "Buy medicines securely from our integrated online pharmacy." },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="w-[300px] p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-medium text-blue-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <img src={needImage} alt="Why healthcare" className="w-full" />
          </motion.div>
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              Why Proper Healthcare Matters
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-4">
              <li>
                WHO recommends 44.5 doctors per 10,000 people, but India has
                only 22—causing a major supply-demand gap.
              </li>
              <li>
                Many local doctors lack the expertise needed for specialized
                care.
              </li>
              <li>
                Our platform bridges the gap with expert consultations and
                advanced tools.
              </li>
              <li>
                Access quality healthcare anytime, anywhere.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <motion.div 
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-semibold text-blue-800 mb-8">Our Benefits</h2>
          <motion.div 
            className="flex flex-wrap justify-center max-w-5xl mx-auto"
            variants={staggerContainer}
          >
          


          <motion.div 
              className="flex items-center justify-between w-52 h-20 p-4 mx-4 my-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-orange-50"
              variants={fadeInUp}
            >
              <div className="text-2xl text-orange-400">
                <MdOutlineHealthAndSafety />
              </div>
              <p className="flex-1 text-center ml-2 text-gray-700">TeleHealth services</p>
            </motion.div>

            <motion.div 
              className="flex items-center justify-between w-52 h-20 p-4 mx-4 my-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-teal-50"
              variants={fadeInUp}
            >
              <div className="text-2xl text-teal-500">
                <IoAccessibility />
              </div>
              <p className="flex-1 text-center ml-2 text-gray-700">Convenience and accessibility</p>
            </motion.div>

            <motion.div 
              className="flex items-center justify-between w-52 h-20 p-4 mx-4 my-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-red-50"
              variants={fadeInUp}
            >
              <div className="text-2xl text-red-500">
                <TbStethoscope />
              </div>
              <p className="flex-1 text-center ml-2 text-gray-700">Online Appointment Booking</p>
            </motion.div>

            <motion.div 
              className="flex items-center justify-between w-52 h-20 p-4 mx-4 my-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-blue-50"
              variants={fadeInUp}
            >
              <div className="text-2xl text-blue-500">
                <TbHeartPlus />
              </div>
              <p className="flex-1 text-center ml-2 text-gray-700">Competitive advantage</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      {(localStorage.getItem("username") && 
    localStorage.getItem("username") !== "undefined" && 
    localStorage.getItem("usertype") === "patient") && (
    <section className="py-20 text-center bg-white">
      <div>
      <div>
        <h2 className="text-blue-900 mb-8">Meet Our Team</h2>
      </div>
     

      <div className="flex flex-wrap mx-auto max-w-[1200px] justify-center mt-8">
        {profiles.map(profile => (
          <div 
            key={profile.id}
            className="flex flex-col items-center justify-center flex-[0_0_25%] relative min-w-[250px] max-w-[250px] text-center rounded-xl transition-all duration-300 bg-white border border-[#eaeaea] m-4 py-4 hover:shadow-[0_0_10px_10px_#ffffff]"
          >


          
            <div className="relative">
              <img 
                src={profile.imgSrc} 
                alt={profile.name} 
                className="w-[250px] h-[250px] border-b border-[#eaeaea]"
              />


              <div className="absolute bottom-[85px] text-[0px] invisible opacity-0 flex justify-center items-center transition-all duration-500 bg-[rgba(74,76,178,0.8)] w-[250px] h-[70px] rounded-t-full group-hover:visible group-hover:opacity-100 group-hover:text-[30px]">
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












            <h3 className="text-blue-600 mt-4 mb-3 cursor-pointer hover:text-blue-900">
              {profile.name}
            </h3>
            <p className="text-gray-500">
              {profile.specialty}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
)}

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={openFaqIndex === index}
              onChange={() => handleFaqClick(index)}
              className="mb-4 border rounded-lg"
            >
              <AccordionSummary expandIcon={<MdExpandMore />}>
                <h3 className="text-lg font-medium text-blue-800">{faq.question}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
