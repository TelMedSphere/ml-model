import React from "react";
import { useDarkMode } from "../components/common/DarkmodeContext"; // Import the hook

export default function PrivacyPolicy() {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use the context

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-5 py-10 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-6xl w-full shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Left Section for Image (Hidden on Mobile) */}
        <div className="w-full md:w-2/5 bg-gray-100 p-6 hidden md:flex flex-col items-center">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg"
            alt="Privacy Illustration"
            className="w-full rounded-lg mb-4"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRau28_GXYA1DEeVWt14zMA4ztRzKvdUXcpCf15AjTFCdyArIopLUos_Bk9MF1WYA8vwU4&usqp=CAU"
            alt="Privacy Illustration"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right Section - Privacy Policy Content */}
        <div className="w-full md:w-3/5 p-6 md:p-10">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4" ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }` }>
            Privacy Policy
          </h1>

          {/* Introduction */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Introduction
            </h2>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              Welcome to <span className="font-medium">TelMedSphere</span>, a
              secure telemedicine platform connecting patients and doctors
              through video consultations. Your privacy is our priority.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Information We Collect
            </h2>
            <ul
              className={`list-disc list-inside space-y-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-800"
              }`}
            >
              <li>
                <strong>Patients:</strong> Name, Contact, email, age, Gender,
                Health Records, Payment Details.
              </li>
              <li>
                <strong>Doctors:</strong> Name, Specialization, DoctorId, Phone
                Number, Email, Consultation History.
              </li>
              <li>All transactions are securely processed through Stripe.</li>
              <li>
                <strong>Google OAuth:</strong> We use Google Authentication to
                streamline login.
              </li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              How We Use Your Data
            </h2>
            <ul
              className={`list-disc list-inside space-y-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-800"
              }`}
            >
              <li>Facilitating secure video consultations.</li>
              <li>Managing health records for patients.</li>
              <li>Processing secure transactions via Stripe.</li>
              <li>Enhancing platform security and preventing fraud.</li>
            </ul>
          </section>

          {/* Security Measures */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Data Security
            </h2>
            <ul
              className={`list-disc list-inside space-y-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-800"
              }`}
            >
              <li>🔐 End-to-end encrypted video calls.</li>
              <li>💳 Secure transactions via Stripe.</li>
              <li>⚖️ HIPAA & GDPR compliance for legal data protection.</li>
              <li>🔑 Google OAuth for secure and seamless login.</li>
            </ul>
          </section>

          {/* Features for Patients & Doctors */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Features for Patients & Doctors
            </h2>

            {/* For Patients */}
            <div className="mb-4">
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-yellow-500" : "text-blue-5"
                }`}
              >
                For Patients:
              </h3>
              <ul
                className={`list-disc list-inside space-y-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-800"
                }`}
              >
                <li>📅 Book Video Calls: Schedule online consultations.</li>
                <li>
                  📝 Manage Health Records: View prescriptions and past history.
                </li>
                <li>💳 Easy Payments: Secure payments using Stripe Wallet.</li>
                <li>
                  ⭐ Feedback System: Rate and review doctors post-consultation.
                </li>
              </ul>
            </div>

            {/* For Doctors */}
            <div>
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-yellow-500" : "text-blue-5"
                }`}
              >
                For Doctors:
              </h3>
              <ul
                className={`list-disc list-inside space-y-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-800"
                }`}
              >
                <li>
                  👨‍⚕️ Set Up Profile: Add specialization, hours, and services.
                </li>
                <li>
                  📅 Manage Availability: Organize appointments and working
                  hours.
                </li>
                <li>
                  💊 Write & Share Prescriptions: Send prescriptions digitally.
                </li>
                <li>
                  📋 Queue System: Keep track of patients in a smart queue.
                </li>
              </ul>
            </div>
          </section>

          {/* User Rights */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Your Rights
            </h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>
              You have the right to access, update, or delete your personal
              information at any time.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-6">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Cookies & Tracking
            </h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>
              We use cookies to enhance your browsing experience. You can adjust
              your cookie preferences in your browser settings.
            </p>
          </section>

          {/* Contact Info */}
          <section className="text-center">
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isDarkMode ? "text-yellow-500" : "text-blue-5"
              }`}
            >
              Contact Us
            </h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>
              📧 <strong>telmedsphere489@gmail.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
