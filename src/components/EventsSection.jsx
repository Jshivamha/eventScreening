import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../context/EventContext';
import UniversalEventCard from './UniversalEventCard';

const EventsSection = () => {
  const navigate = useNavigate();
  const { events } = useEventContext();

  const handleViewMoreEvents = () => {
    navigate('/events');
  };

  // Get first 3 events for homepage display
  const featuredEvents = events.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Upcoming Events
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Experience movies like never before at our immersive cinema venues
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {featuredEvents.map((event, index) => (
            <UniversalEventCard key={event.id} event={event} index={index} variant="home" />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={handleViewMoreEvents}
            className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 min-h-[44px]"
          >
            View More Events
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
