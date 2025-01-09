import React, { useState } from 'react';
import httpClient from '../httpClient';
import { Alert } from '@mui/material';
import useDocTitle from '../hooks/useDocTitle';
import '../styles/ContactUs.css';
import img from '../assets/contactus.jpg'

const ContactUs = () => {
  useDocTitle('Contact Us - TelMedSphere');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await httpClient.post('/contact', formData);
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Have questions? We're here to help!</p>
            <div className="contact-details">
              <div>
                <p>telmedsphere489@gmail.com</p>
              </div>
              <div>
                <p>+91 12345 67890</p>
              </div>
              <div>
                <img src={img} alt="Contact Us" />
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              <button type="submit">Send Message</button>
            </form>
            {submitStatus === 'success' && (
              <Alert severity="success">Message sent successfully!</Alert>
            )}
            {submitStatus === 'error' && (
              <Alert severity="error">Failed to send message. Please try again.</Alert>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;