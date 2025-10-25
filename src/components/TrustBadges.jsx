import React from 'react';
import { FaShieldAlt, FaLock, FaCreditCard, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import { SiTrustpilot } from 'react-icons/si';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-yellow-400" />,
      title: "Secure Payments",
      description: "256-bit SSL encryption"
    },
    {
      icon: <FaCheckCircle className="text-3xl text-green-400" />,
      title: "Verified Bookings",
      description: "Instant confirmation"
    },
    {
      icon: <FaHeadset className="text-3xl text-blue-400" />,
      title: "24/7 Support",
      description: "Dedicated help desk"
    },
    {
      icon: <FaLock className="text-3xl text-purple-400" />,
      title: "Privacy First",
      description: "GDPR compliant"
    }
  ];

  const partners = [
    { name: "visa", label: "Visa" },
    { name: "mastercard", label: "Mastercard" },
    { name: "razorpay", label: "Razorpay" },
    { name: "paytm", label: "Paytm" },
    { name: "upi", label: "UPI" },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trusted By */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full mb-4">
            <SiTrustpilot className="text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">TRUSTED BY 50,000+ MOVIE LOVERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Security is Our Priority</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We use industry-leading security measures to protect your information and transactions.</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Payment Partners */}
        {/* <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-center text-lg font-medium text-gray-900 mb-6">We Accept</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-10 sm:w-20 sm:h-12 bg-gray-100 rounded flex items-center justify-center text-gray-700 font-medium text-xs sm:text-sm">
                  {partner.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustBadges;
