import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/AboutUs.scss';
import { FaUserAlt, FaLaptopCode, FaUsers } from 'react-icons/fa';
import team from '../data/teamData'; 
import { FaMailBulk, FaPhoneAlt, FaHospital } from 'react-icons/fa'; // Import icons

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Introduction Section */}
      <section className="intro">
        <div className="intro-container">
          <div className="intro-content">
            <h2>Welcome to TelMedSphere</h2>
            <p>
              TelMedSphere is an innovative platform designed to bridge the gap between healthcare professionals and patients. Our website connects users with doctors, provides access to medications, and offers predictive health tools, all in one place.
            </p>
            <Link to="/learn-more" className="cta-button">Learn More</Link>
          </div>

          <div className="intro-image-container">
            <div className="intro-image">
              <img
                className="front-image"
                src="https://static.vecteezy.com/system/resources/previews/000/570/610/original/medical-concept-doctor-with-woman-patient-in-flat-cartoon-on-hospital-hall-vector.jpg"
                alt="Introduction"
              />
              <img
                className="back-image"
                src="https://static.vecteezy.com/system/resources/previews/000/656/917/original/vector-set-of-doctor-cartoon-characters-medical-staff-team-concept-in-front-of-hospital.jpg"
                alt="Back Side"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Motive Section */}
      <section className="motive">
        <div className="motive-container">
          <div className="motive-image">
            <img
              src="https://static.wixstatic.com/media/43ab93_b9a8144ece8746659201ed42c89542fb~mv2.png/v1/crop/x_1068,y_115,w_1248,h_753/fill/w_828,h_500,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/medical%20missions.png"
              alt="Motive Image"
            />
          </div>

          <div className="motive-content">
            <h3>Our Mission: Helping You Stay Healthy, Especially in Times of Crisis</h3>
            <p>
              During global health crises like the COVID-19 pandemic, it is more important than ever to have reliable access to healthcare information and services. TelMedSphere helps users by providing telemedicine consultations, disease prediction tools, and a variety of resources to manage health remotely, keeping you safe at home while ensuring you receive the care you need.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <br></br>
        <br></br>
        <h3>Meet Our Team</h3>
        <div className="team-members">
          {team.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="team-member-img">
                <img src={member.imgSrc} alt={member.name} />
              </div>
              <h4>{member.name}</h4>
              <p><strong>{member.specialty}</strong></p>
              <div className="team-member-contact">
                {member.contact.map((contact, index) => {
                  switch (contact.icon) {
                    case "IoMdMail":
                      return <FaMailBulk key={index} className="contact-icon" />;
                    case "FaPhoneAlt":
                      return <FaPhoneAlt key={index} className="contact-icon" />;
                    case "FaHospital":
                      return <FaHospital key={index} className="contact-icon" />;
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
