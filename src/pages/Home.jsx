import React from 'react';
import Hero from '../components/Hero';
import EventsSection from '../components/EventsSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <EventsSection />
      <AboutSection />
      <ExperienceSection />
    </div>
  );
};

export default Home;
