import React, { createContext, useContext, useState } from 'react';
import { eventsData } from '../data/eventsData';

const EventContext = createContext();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getEventById = (id) => {
    return events.find(event => event.id === parseInt(id));
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const value = {
    events,
    selectedEvent,
    getEventById,
    selectEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
