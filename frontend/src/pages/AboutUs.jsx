import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaDiscord } from 'react-icons/fa';

const AboutUs = () => {
  const projectAdmins = [
    {
      name: "Pratik Mane",
      role: "Project Admin",
      github: "https://github.com/PratikMane0112",
      avatar: "https://avatars.githubusercontent.com/u/153143167?v=4"
    },
    {
      name: "Harshwardhan Patil",
      role: "KWoC Mentor",
      github: "https://github.com/HarshwardhanPatil07",
      avatar: "https://avatars.githubusercontent.com/u/126240589?v=4"
    },
    {
      name: "Aditya Bavadekar",
      role: "SWoC Mentor",
      github: "https://github.com/AdityaBavadekar",
      avatar: "https://avatars.githubusercontent.com/u/64344960?v=4"
    },
    {
      name: "Raj Khanke",
      role: "DWoC Mentor",
      github: "https://github.com/RajKhanke",
      avatar: "https://avatars.githubusercontent.com/u/137288727?v=4"
    }
  ];

  const openSourcePrograms = [
    {
      name: "KWoC 2k24",
      link: "https://kwoc.kossiitkgp.org/",
      logo: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/KWoC.png"
    },
    {
      name: "SWoC 2k25",
      link: "https://www.socialwinterofcode.com/",
      logo: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/SWoC.png"
    },
    {
      name: "DWoC 2k25",
      link: "https://dwoc.io/",
      logo: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/DWoC.jpg"
    },
    {
      name: "IWoC 2k25",
      link: "https://iwoc3.devfolio.co/",
      logo: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/IWoC.png"
    }
  ];

  const pandemicFeatures = [
    {
      title: "Remote Consultations",
      description: "Secure video conferencing and chat features to maintain social distancing while providing quality care. Connect with specialists worldwide.",
      icon: "🏥",
      image: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/telemedicine.jpg",
      stats: {
        value: "90%",
        label: "Patient Satisfaction"
      },
      features: [
        "24/7 Access",
        "Multi-language Support",
        "HD Video Quality"
      ]
    },
    {
      title: "AI Symptom Checker",
      description: "Advanced AI-powered system for early detection of COVID-19 and other health conditions using machine learning algorithms.",
      icon: "🤖",
      image: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/ai-health.jpg",
      stats: {
        value: "95%",
        label: "Accuracy Rate"
      },
      features: [
        "Real-time Analysis",
        "Multiple Symptoms",
        "Risk Assessment"
      ]
    },
    {
      title: "Resource Allocation",
      description: "Smart tracking system for medical resources, hospital beds, and emergency services availability during health crises.",
      icon: "📊",
      image: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/hospital-resources.jpg",
      stats: {
        value: "500+",
        label: "Connected Hospitals"
      },
      features: [
        "Live Bed Tracking",
        "Equipment Monitoring",
        "Staff Allocation"
      ]
    },
    {
      title: "Health Analytics",
      description: "Comprehensive health data analytics platform for tracking pandemic trends and patient outcomes.",
      icon: "📈",
      image: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/health-analytics.jpg",
      stats: {
        value: "1M+",
        label: "Data Points Analyzed"
      },
      features: [
        "Trend Analysis",
        "Predictive Modeling",
        "Regional Insights"
      ]
    },
    {
      title: "Emergency Response",
      description: "Rapid emergency response system with real-time coordination between healthcare providers and emergency services.",
      icon: "🚑",
      image: "https://raw.githubusercontent.com/PratikMane0112/TelMedSphere/master/Overview/emergency.jpg",
      stats: {
        value: "3min",
        label: "Avg. Response Time"
      },
      features: [
        "Quick Dispatch",
        "GPS Tracking",
        "Priority Routing"
      ]
    }
  ];


  return (
    <div className="w-full bg-gray-50">
      <section className="min-h-screen flex items-center relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-5/12 space-y-8 z-10 lg:pr-8">
              <div>
                <span className="inline-block px-4 py-1 text-sm font-medium bg-blue-600 text-white-1 rounded-full mb-4">
                  Open Source Healthcare Initiative
                </span>
                <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Revolutionizing Telehealth in Pandemic Times
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  TelMedSphere bridges the gap between patients and healthcare providers through AI-powered solutions, especially critical during global health crises.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/learn-more" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white-1 font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg">
                  Start Free Consultation
                </Link>
                <a href="https://discord.gg/qsdDRKak28" className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 text-lg border-2 border-gray-200">
                  <FaDiscord className="mr-2 text-2xl" /> Join Community
                </a>
              </div>
            </div>
   
           {/* Updated image container */}
      <div className="lg:w-7/12 relative h-full mt-8 lg:mt-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/20 rounded-full blur-3xl"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div className="relative">
          <img
            src="aboutus-image.png"
            alt="Platform Preview"
            className="w-full h-auto max-w-[800px] object-contain"
            style={{ 
              mixBlendMode: 'multiply',
              filter: 'contrast(1.1)',
              transform: 'scale(1.15)'
            }}
          />
        </div>
      </div>
          </div>
        </div>
      </section>

      {/* Pandemic Features - Zigzag Layout */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pandemic-Ready Infrastructure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed with lessons from COVID-19 to handle future health emergencies effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {pandemicFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <ul className="space-y-2">
                      {["Analytics", "Multi-language", "Cross-platform"].map((item, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section - Enhanced Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Project Leadership</h2>
            <p className="text-xl text-gray-600">Driving innovation in open source healthcare</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectAdmins.map((admin) => (
              <div key={admin.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="text-center">
                  <div className="w-full aspect-square max-w-[200px] mx-auto mb-6">
                    <img 
                      src={admin.avatar} 
                      alt={admin.name}
                      className="w-full h-full rounded-2xl object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{admin.name}</h3>
                  <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                    {admin.role}
                  </span>
                  <div className="mt-4">
                    <a 
                      href={admin.github}
                      className="inline-flex items-center justify-center w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="mr-2 text-lg" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors - Full Width Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Global Contributors</h2>
            <p className="text-xl text-gray-600">Join 100+ developers shaping the future of telehealth</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-3xl -rotate-1 scale-105 group-hover:rotate-0 transition-transform duration-500" />
            <a 
              href="https://github.com/PratikMane0112/TelMedSphere/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="https://contrib.rocks/image?repo=PratikMane0112/TelMedSphere&columns=12&anon=1&merge=true&max=200"
                alt="Project Contributors"
                className="w-full h-auto min-h-[400px] object-contain transform group-hover:scale-102 transition-transform duration-500"
              />
            </a>
          </div>
          <div className="mt-16 text-center">
            <a 
              href="https://discord.gg/qsdDRKak28"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white-1 font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg"
            >
              <FaDiscord className="mr-3 text-2xl" /> Become a Contributor
            </a>
          </div>
        </div>
      </section>

      {/* Open Source Programs - Carousel-style */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Open Source Affiliations</h2>
            <p className="text-xl text-gray-600">Proudly participating in top-tier developer programs</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {openSourcePrograms.map((program) => (
              <a 
                key={program.name}
                href={program.link}
                className="group flex-1 basis-[200px] max-w-[250px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center">
                  <img 
                    src={program.logo} 
                    alt={program.name}
                    className="w-32 h-32 object-contain mb-6 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{program.name}</h3>
                  <span className="mt-2 text-sm text-blue-600">Learn More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;