import React from 'react';
import { Link } from 'react-router-dom';
import { footMenu, footSocial } from '../../data/footerData';
import { TfiAngleRight } from "react-icons/tfi";
import logo from "../../assets/header.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="wrapper footer_wrapper">
          <div className="foot_about">
            <div className="foot_logo_div">
              <Link to="/">
                <img src={logo} alt="footer-logo" width="230px" height="230px" />
              </Link>
            </div>
          </div>

          {/* Rendering Footer Menu */}
          {footMenu.map(item => {
            const { id, title, menu } = item;
            return (
              <div className="foot_menu" key={id}>
                <h4>{title}</h4>
                <ul>
                  {/* Dynamically render menu items */}
                  {menu.map(menuItem => {
                    const { id, link, path } = menuItem;
                    return (
                      <li key={id}>
                        <TfiAngleRight className="arrow-icon" />{" "}
                        <Link to={path}> {/* Use dynamic path for each link */}
                          {link}
                        </Link>
                      </li>
                    );
                  })}

                  {/* Conditional link for "Book an Appointment" for patient users */}
                  {localStorage.getItem("usertype") === "patient" && title === "Shop & More" && (
                    <li>
                      <TfiAngleRight className="arrow-icon" />{" "}
                      <Link to="/doctors">Book an Appointment</Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="separator"></div>

      <div className="sub_footer">
        <div className="container">
          <div className="sub_footer_wrapper">
            <div className="foot_copyright">
              <p>
                2024 @ <a href="/">TelMedSphere</a> | All Rights Reserved.
              </p>
            </div>
            <div className="foot_social">
              {footSocial.map((item) => {
                const { id, icon, cls, path } = item;
                return (
                  <Link
                    to={path}
                    key={id}
                    className={`icon ${cls}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
