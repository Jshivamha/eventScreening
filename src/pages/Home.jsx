import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import EventsSection from '../components/EventsSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from '../utils/structuredData';

const Home = () => {
  const structuredData = [
    generateOrganizationStructuredData(),
    generateWebsiteStructuredData()
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="EventWeb - Premium Event Booking & Venue Management"
        description="Book premium events, movie screenings, and venues with EventWeb. Discover exclusive events, private screenings, and world-class venues for your special occasions in Mumbai and across India."
        keywords="event booking, movie screening, venue booking, private events, cinema booking, event management, premium venues, entertainment, tickets, Mumbai events"
        structuredData={structuredData}
      />
      <Hero />
      <EventsSection />
      <AboutSection />
      <ExperienceSection />
    </div>
  );
};

export default Home;
