import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useDocTitle from "../hooks/useDocTitle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import { TbStethoscope } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import bgImage from "../assets/landing-bg.png";
import needImage from "../assets/need.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

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
    { question: "What is TelMedSphere?", answer: "It is a web application connecting patients to doctors. It provides features like appointments, prescriptions, instant meetings, and a pharmacy store." },
    { question: "Is TelMedSphere free?", answer: "Yes, you can use all the features for free, including health predictions, doctor consultations, and medicine purchases." },
    { question: "Can I book an appointment anytime?", answer: "Yes, appointments can be booked based on the doctor's availability." },
    { question: "Does TelMedSphere offer health tests?", answer: "Yes, our AI model predicts disease probabilities based on symptoms and provides valuable insights." },
    { question: "Can I purchase medicines through TelMedSphere?", answer: "Yes, you can securely purchase medicines from our online pharmacy." },
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
