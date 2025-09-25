import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Star, Clock, X, Phone, Mail, Wifi, Car, Utensils, Camera } from 'lucide-react';

const ExperienceSection = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVenue(null), 300);
  };

  const experiences = [
    {
      title: "Drive-in Cinema",
      description: "Experience movies from the comfort of your car",
      icon: "🚗",
      features: ["Personal audio", "Food delivery", "Privacy"]
    },
    {
      title: "Open Air Venues",
      description: "Watch under the stars at beautiful outdoor locations",
      icon: "🌙",
      features: ["Rooftop screenings", "Beach venues", "Garden settings"]
    },
    {
      title: "Gourmet Cinema",
      description: "Fine dining experience with curated movie screenings",
      icon: "🍽️",
      features: ["Chef's menu", "Wine pairing", "Premium seating"]
    },
    {
      title: "Private Screenings",
      description: "Host exclusive events for your group",
      icon: "👥",
      features: ["Custom venues", "Group bookings", "Corporate events"]
    }
  ];

  const venues = [
    {
      name: "The Piano Man",
      location: "New Delhi, Eldeco Centre",
      type: "Gourmet Cinema",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/11/53/da/27/city-cabana-rooftop.jpg",
      description: "An elegant rooftop venue offering panoramic city views with premium dining and cinema experience.",
      capacity: "50-80 people",
      pricing: "₹2,500 per person",
      amenities: ["Premium Sound System", "Gourmet Dining", "City Views", "Climate Control", "Valet Parking"],
      contact: {
        phone: "+91 98765 43210",
        email: "contact@sunshincinemaclub.in"
      },
      rating: 4.8,
      features: [
        "360° city skyline views",
        "Chef-curated menu",
        "Premium bar service",
        "Private dining areas",
        "Professional sound system"
      ]
    },
    {
      name: "The Flying Dutchman",
      location: "Noida, Sector 63",
      type: "SkyCinema",
      image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/283493981.jpg?k=1ff2033b095bfda7a6ecd2cdb78271ae88dbe7dcf9806a4b4ab08f5dbec5eb9d&o=",
      description: "A luxurious hotel venue with state-of-the-art facilities and sophisticated ambiance for exclusive screenings.",
      capacity: "30-60 people",
      pricing: "₹3,200 per person",
      amenities: ["4K Projection", "Luxury Seating", "Fine Dining", "Full Bar", "Concierge Service"],
      contact: {
        email: "contact@sunshincinemaclub.in"
      },
      rating: 4.9,
      features: [
        "Ultra-luxury interiors",
        "4K laser projection",
        "Michelin-style cuisine",
        "Personal butler service",
        "Executive lounge access"
      ]
    },
    {
      name: "Beach Venue",
      location: "Mumbai, Juhu Beach",
      type: "Open Air",
      image: "https://kwee.co/wp-content/uploads/2023/01/78874277_554223431807304_5223900049892704256_n-1024x683.jpg",
      description: "A unique beachside cinema experience under the stars with the sound of waves as your backdrop.",
      capacity: "100-200 people",
      pricing: "₹1,800 per person",
      amenities: ["Beach Setting", "Outdoor Screen", "BBQ Station", "Bonfire Area", "Beach Activities"],
      contact: {
        phone: "+91 76543 21098",
        email: "contact@sunshincinemaclub.in"
      },
      rating: 4.7,
      features: [
        "Beachfront location",
        "Under the stars viewing",
        "Live BBQ counter",
        "Bonfire experience",
        "Water sports activities"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Request a Screening
            <span className="block text-yellow-400">For Your Group</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We organize private screenings for big groups at some of the best venues in town
          </p>
        </motion.div>

        {/* Experience Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{experience.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                {experience.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {experience.description}
              </p>
              <ul className="space-y-2">
                {experience.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-400">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Venues Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Our Premium Venues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {venue.name}
                    </h4>
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
                      {venue.type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                  <button 
                    onClick={() => openModal(venue)}
                    className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Venue Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedVenue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedVenue.type}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Venue Title and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedVenue.name}
                  </h2>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={20} />
                    <span className="ml-1 text-lg font-semibold text-gray-700">
                      {selectedVenue.rating}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-lg">{selectedVenue.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  {selectedVenue.description}
                </p>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Capacity & Pricing */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Users className="text-yellow-400 mr-3" size={18} />
                        <span className="text-gray-700">Capacity: {selectedVenue.capacity}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-yellow-400 mr-3" size={18} />
                        <span className="text-gray-700">Pricing: {selectedVenue.pricing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      
                      <div className="flex items-center">
                        <Mail className="text-yellow-400 mr-3" size={18} />
                        <a href={`mailto:${selectedVenue.contact.email}`} className="text-gray-700 hover:text-yellow-600">
                          {selectedVenue.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedVenue.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center bg-gray-100 rounded-lg p-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        <span className="text-gray-700 text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Features</h3>
                  <div className="space-y-2">
                    {selectedVenue.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Camera className="text-yellow-400 mr-3" size={16} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
