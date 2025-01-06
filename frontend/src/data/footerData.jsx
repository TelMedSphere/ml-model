import React from "react";
import { FaFacebookF, FaGithub, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaHospital } from 'react-icons/fa';

export const footMenu = [
    {
        id: 1,
        title: "Shop & More",
        menu: [
            {
                id: 1,
                link: "Buy Medicines",
                path: "/buy-medicines"
            },
            {
                id: 2,
                link: "Disease Prediction",
                path: "/disease-prediction"
            }
        ]
    },
    {
        id: 2,
        title: "Ours",
        menu: [
            {
                id: 1,
                link: "About Us",
                path: "/about"  // Change path to "/about"
            },
            {
                id: 2,
                link: "Contact Us",
                path: "/contact"  // Change path to "/contact"
            },
            {
                id: 3,
                link: "FAQ",
                path: "/faq"  // Change path to "/faq"
            }
        ]
    }
];

export const footSocial = [
    {
        id: 1,
        icon: <IoMdMail />,
        cls: "Mail",
        path: "/contact",  // You might want to link this to the contact page
    },
    {
        id: 2,
        icon: <FaPhoneAlt />,
        cls: "phone",
        path: "/contact",  // Similarly, link to the contact page
    },
    {
        id: 3,
        icon: <FaHospital />,
        cls: "Hospital",
        path: "/about",  // You might want to link this to the About Us page
    },
];
