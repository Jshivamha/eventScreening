import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, ChevronRight } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

const TicketBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getEventById, selectedEvent } = useEventContext();
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  console.log('TicketBooking component rendered with eventId:', eventId);
  console.log('Location state:', location.state);

  useEffect(() => {
    console.log('TicketBooking useEffect - eventId:', eventId);
    
    // First try to get event from location state
    let foundEvent = location.state?.eventData;
    
    // If not in state, try to get from context
    if (!foundEvent) {
      foundEvent = selectedEvent;
    }
    
    // If still not found, get from context by ID
    if (!foundEvent) {
      foundEvent = getEventById(eventId);
    }
    
    console.log('Found event:', foundEvent);
    
    if (foundEvent) {
      setEvent(foundEvent);
      // Set default date and time
      setSelectedDate(foundEvent.date);
      setSelectedTime(foundEvent.time);
    }
    setLoading(false);
  }, [eventId, location.state, selectedEvent, getEventById]);

  // Recalculate discount when ticket count changes
  useEffect(() => {
    if (couponCode && event) {
      validateCoupon(couponCode);
    }
  }, [ticketCount, couponCode, event]);

  // Coupon validation function
  const validateCoupon = (code) => {
    const validCoupons = {
      'WELCOME10': { type: 'percentage', value: 10 },
      'SAVE20': { type: 'percentage', value: 20 },
      'FLAT100': { type: 'fixed', value: 100 },
      'NEWUSER': { type: 'percentage', value: 15 },
      'MOVIE50': { type: 'fixed', value: 50 }
    };

    const coupon = validCoupons[code.toUpperCase()];
    if (coupon) {
      let discountAmount = 0;
      const subtotal = event.price * ticketCount;
      
      if (coupon.type === 'percentage') {
        discountAmount = (subtotal * coupon.value) / 100;
      } else {
        discountAmount = Math.min(coupon.value, subtotal);
      }
      
      setDiscount(discountAmount);
      setCouponMessage(`Coupon applied! You saved ₹${discountAmount}`);
      return true;
    } else {
      setDiscount(0);
      setCouponMessage('Invalid coupon code');
      return false;
    }
  };

  const handleCouponSubmit = () => {
    if (couponCode.trim()) {
      validateCoupon(couponCode.trim());
    }
  };

  const handleProceed = () => {
    // Enforce max 2 tickets per order
    if (ticketCount > 2) {
      alert('Maximum 2 tickets can be purchased per order.');
      return;
    }
    // Navigate to payment page or show booking confirmation
    const subtotal = event.price * ticketCount;
    const finalPrice = subtotal - discount;
    
    console.log('Proceeding with booking:', {
      event: event?.title,
      date: selectedDate,
      time: selectedTime,
      tickets: ticketCount,
      subtotal: subtotal,
      discount: discount,
      finalPrice: finalPrice
    });
    
    // Navigate to frontend payment preview
    navigate('/payment', {
      state: {
        eventTitle: event.title,
        eventId: event.id,
        subtotal,
        discount,
        finalPrice,
        date: selectedDate,
        time: selectedTime,
        tickets: ticketCount,
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              {/* <button
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white transition-colors px-3 py-1 rounded hover:bg-gray-800"
              >
                Home
              </button> */}
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-yellow-400 fo nt-bold text-xl hover:text-yellow-300 transition-colors"
            >
              SCC
            </button>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <button
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors duration-200 hover:underline"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => navigate('/events')}
              className="hover:text-white transition-colors duration-200 hover:underline"
            >
              Events
            </button>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => navigate('/events')}
              className="text-white hover:text-yellow-400 transition-colors duration-200 hover:underline"
            >
              {event.title}
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-yellow-400">Date-Movie</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800"
            >
              {/* Event Image */}
              <div className="relative h-48 sm:h-64 md:h-80">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <div className="bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {event.type}
                  </div>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">{event.title}</h1>
                
                <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-400" />
                    <span className="truncate">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-400" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm sm:text-base">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-400" />
                    <span className="truncate">{event.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{event.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300 text-sm sm:text-base">4.8 (127 reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-800 sticky top-4 sm:top-8"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">Select Date - Movie</h2>

              {/* Date Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-300 mb-2 sm:mb-3 font-medium text-sm sm:text-base">Select Date</label>
                <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700">
                  <div className="text-white font-semibold text-sm sm:text-base">{event.date}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{event.time}</div>
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-300 mb-2 sm:mb-3 font-medium text-sm sm:text-base">Select Time</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedTime(event.time)}
                    className={`w-full p-3 rounded-lg sm:rounded-xl border text-left transition-colors min-h-[44px] ${
                      selectedTime === event.time
                        ? 'border-yellow-400 bg-yellow-400/10 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="font-medium text-sm sm:text-base">{event.time}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Available</div>
                  </button>
                </div>
              </div>

              {/* Ticket Count */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-300 mb-2 sm:mb-3 font-medium text-sm sm:text-base">Number of Tickets</label>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:border-gray-600 min-h-[44px]"
                  >
                    -
                  </button>
                  <span className="text-white font-semibold text-base sm:text-lg">{ticketCount}</span>
                  <button
                    onClick={() => setTicketCount(Math.min(2, ticketCount + 1))}
                    disabled={ticketCount >= 2}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center min-h-[44px] ${ticketCount >= 2 ? 'border-gray-800 text-gray-600 cursor-not-allowed' : 'border-gray-700 text-gray-300 hover:border-gray-600'}`}
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">Max 2 tickets per order.</p>
              </div>

              {/* Coupon Code Section */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-300 mb-2 sm:mb-3 font-medium text-sm sm:text-base">Have a Gift Card or Coupon Code?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 min-h-[44px] text-sm sm:text-base"
                  />
                  <button
                    onClick={handleCouponSubmit}
                    className="bg-yellow-400 text-black px-4 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors min-h-[44px] text-sm sm:text-base"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <div className={`mt-2 text-sm ${couponMessage.includes('applied') ? 'text-green-400' : 'text-red-400'}`}>
                    {couponMessage}
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm sm:text-base">Price per ticket</span>
                  <span className="text-white font-semibold text-sm sm:text-base">₹{event.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm sm:text-base">Quantity</span>
                  <span className="text-white font-semibold text-sm sm:text-base">{ticketCount}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm sm:text-base">Subtotal</span>
                  <span className="text-white font-semibold text-sm sm:text-base">₹{event.price * ticketCount}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 text-sm sm:text-base">Discount</span>
                    <span className="text-green-400 font-semibold text-sm sm:text-base">-₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-base sm:text-lg">Total</span>
                    <span className="text-yellow-400 font-bold text-lg sm:text-xl">₹{(event.price * ticketCount) - discount}</span>
                  </div>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceed}
                className="w-full bg-yellow-400 text-black py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-yellow-300 transition-colors min-h-[44px]"
              >
                Proceed
              </button>

              {/* Additional Info */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Secure payment • Instant confirmation • Mobile tickets
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 space-y-4">
          <div>
            <h4 className="text-white font-semibold">sunShineScreening</h4>
            <p>For Customer Queries: <a className="underline text-yellow-400" href="mailto:contact@sunshincinemaclub.in">contact@sunshincinemaclub.in</a></p>
            <p>Phone: </p>
            <p>Cities: Mumbai · Bangalore · Hyderabad · Delhi NCR · Pune · Chandigarh</p>
          </div>
          <div className="pt-4 text-sm text-gray-500">© Copyright 2017-25 sunShineScreening</div>
          <div className="pt-2 text-xs text-gray-600">Developed By: Mahesh Bhanushali</div>
        </div>
      </footer>
    </div>
  );
};

export default TicketBooking;
