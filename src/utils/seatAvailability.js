/**
 * Calculates remaining seats based on event date and total capacity
 * @param {Date} eventDate - The date of the event
 * @param {number} totalSeats - Maximum number of seats available
 * @returns {Object} - Object containing remaining seats and a status message
 */
export const calculateRemainingSeats = (eventDate, totalSeats) => {
  const now = new Date();
  const timeDiff = eventDate - now;
  const daysUntilEvent = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  // If event is in the past, return 0 seats
  if (daysUntilEvent < 0) {
    return {
      remainingSeats: 0,
      status: 'Event has passed',
      isLowAvailability: true
    };
  }

  // Calculate percentage of seats remaining based on days until event
  let availablePercentage;
  
  if (daysUntilEvent >= 30) {
    // More than 30 days: 100-80% available
    availablePercentage = 80 + Math.floor(Math.random() * 21); // 80-100%
  } else if (daysUntilEvent >= 14) {
    // 14-29 days: 60-80% available
    availablePercentage = 60 + Math.floor(Math.random() * 21); // 60-80%
  } else if (daysUntilEvent >= 7) {
    // 7-13 days: 30-60% available
    availablePercentage = 30 + Math.floor(Math.random() * 31); // 30-60%
  } else if (daysUntilEvent >= 3) {
    // 3-6 days: 10-30% available
    availablePercentage = 10 + Math.floor(Math.random() * 21); // 10-30%
  } else if (daysUntilEvent >= 1) {
    // 1-2 days: 5-15% available
    availablePercentage = 5 + Math.floor(Math.random() * 11); // 5-15%
  } else {
    // Same day: 0-5% available
    availablePercentage = Math.floor(Math.random() * 6); // 0-5%
  }

  const remainingSeats = Math.max(1, Math.floor((totalSeats * availablePercentage) / 100));
  
  // Determine status message
  let status;
  if (availablePercentage >= 80) {
    status = 'Plenty of seats available';
  } else if (availablePercentage >= 50) {
    status = 'Seats filling up';
  } else if (availablePercentage >= 20) {
    status = 'Limited seats left';
  } else if (availablePercentage >= 5) {
    status = 'Last few seats!';
  } else {
    status = 'Almost sold out!';
  }

  return {
    remainingSeats,
    status,
    isLowAvailability: availablePercentage < 20
  };
};

/**
 * Updates event data with dynamic seat availability
 * @param {Array} events - Array of event objects
 * @returns {Array} - Updated events with seat information
 */
export const updateEventsWithSeatAvailability = (events) => {
  return events.map(event => {
    // Extract total capacity from the event
    const capacityMatch = event.capacity ? event.capacity.match(/\d+/) : null;
    const totalSeats = capacityMatch ? parseInt(capacityMatch[0], 10) : 100; // Default to 100 if can't parse
    
    // Parse the event date
    const eventDate = event.date instanceof Date 
      ? event.date 
      : new Date(event.date);
    
    // Calculate seat availability
    const { remainingSeats, status, isLowAvailability } = 
      calculateRemainingSeats(eventDate, totalSeats);
    
    return {
      ...event,
      totalSeats,
      remainingSeats,
      seatStatus: status,
      isLowAvailability,
      // Keep the original capacity string for display
      displayCapacity: `${remainingSeats} of ${totalSeats} seats left`,
      // For display in the UI
      availabilityStatus: isLowAvailability ? 'Hurry! Limited seats' : 'Available',
    };
  });
};
