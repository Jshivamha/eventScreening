import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventsData } from '../data/eventsData';
import { generateDynamicEvents, shouldRefreshEvents } from '../data/dynamicEventsData';

export const EventContext = createContext();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(eventsData);
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Generate dynamic events on mount and when needed
  useEffect(() => {
    const refreshEvents = () => {
      if (shouldRefreshEvents(lastRefresh)) {
        const newDynamicEvents = generateDynamicEvents();
        setDynamicEvents(newDynamicEvents);
        setLastRefresh(new Date().toISOString());
      }
    };

    refreshEvents();

    // Set up interval to check for updates every hour
    const interval = setInterval(refreshEvents, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [lastRefresh]);

  const getEventById = (id) => {
    // First check dynamic events, then fallback to static events
    const dynamicEvent = dynamicEvents.find(event => event.id === parseInt(id));
    if (dynamicEvent) return dynamicEvent;
    return events.find(event => event.id === parseInt(id));
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  // For homepage, use dynamic events; for other pages, use static events
  const getHomePageEvents = () => {
    return dynamicEvents.length > 0 ? dynamicEvents.slice(0, 3) : events.slice(0, 3);
  };

  const value = {
    events,
    dynamicEvents,
    selectedEvent,
    getEventById,
    selectEvent,
    getHomePageEvents,
    lastRefresh,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
