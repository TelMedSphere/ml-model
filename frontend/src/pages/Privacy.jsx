import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-10 py-14">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl flex overflow-hidden">
        {/* Left Section for Image */}
        <div className="w-2/5 bg-gray-100  items-start justify-center p-6 ">
          {/* Replace 'image-url' with your actual image */}
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg"
            alt="Privacy Illustration"
            className="w-full rounded-lg h-2/4"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRau28_GXYA1DEeVWt14zMA4ztRzKvdUXcpCf15AjTFCdyArIopLUos_Bk9MF1WYA8vwU4&usqp=CAU"
            alt="Privacy Illustration"
            className="w-full rounded-lg h-2/4"
          />
        </div>

        {/* Right Section - Privacy Policy Content */}
        <div className="w-3/5 p-10">
          <h1 className="text-4xl font-bold text-blue-5 mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-5 text-lg mb-6">
            Effective Date: <span className="font-medium">[Insert Date]</span>
          </p>

          {/* Introduction */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              Introduction
            </h2>
            <p className="text-blue-5">
              Welcome to <span className="font-medium">TelMedSphere</span>, a
              secure platform that connects patients and doctors through video
              consultations. We are committed to protecting your privacy and
              ensuring a safe experience.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside text-blue-5 space-y-2">
              <li>
                <strong>Patients:</strong> Name, Contact, Health Records,
                Payment Details.
              </li>
              <li>
                <strong>Doctors:</strong> Name, Specialization, Consultation
                History.
              </li>
              <li>
                All transactions are securely processed through **Stripe**.
              </li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              How We Use Your Data
            </h2>
            <p className="text-blue-5">
              We collect data to improve our services, process transactions,
              manage patient-doctor interactions, and enhance security.
            </p>
          </section>

          {/* Security Measures */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              Data Security
            </h2>
            <ul className="list-disc list-inside text-blue-5 space-y-2">
              <li>🔐 End-to-end encrypted video calls.</li>
              <li>💳 Secure transactions via **Stripe**.</li>
              <li>⚖️ HIPAA & GDPR compliance.</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              Your Rights
            </h2>
            <p className="text-blue-5">
              You have the right to access, update, or delete your personal
              information at any time. Reach out to us for privacy-related
              concerns.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              Cookies & Tracking
            </h2>
            <p className="text-blue-5">
              Our platform uses cookies to enhance your experience. You can
              modify your cookie preferences in your browser settings.
            </p>
          </section>

          {/* Contact Info */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-blue-5 mb-3">
              Contact Us
            </h2>
            <p className="text-blue-5">
              📧 <strong>telmedsphere489@gmail.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
