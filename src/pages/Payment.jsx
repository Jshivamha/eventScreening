import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, ChevronDown } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    eventTitle = 'Event',
    subtotal = 0,
    discount = 0,
    finalPrice = 0,
    date,
    time,
    tickets = 1
  } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {/* Order Summary */}
          <div className="lg:col-span-2 bg-gray-900/70 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <div className="text-gray-400 text-sm">Event</div>
                <div className="font-semibold">{eventTitle}</div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span>{date}</span>
                <span className="text-gray-600">•</span>
                <span>{time}</span>
                <span className="text-gray-600">•</span>
                <span>Tickets: {tickets}</span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Discount</span>
                  <span className="text-green-400">-₹{discount}</span>
                </div>
                <div className="border-t border-gray-800 pt-3 flex justify-between items-center">
                  <span className="text-white font-bold">Amount Payable</span>
                  <span className="text-yellow-400 font-extrabold text-xl">₹{finalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form (mock) */}
          <div className="lg:col-span-3 bg-gray-900/70 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Payment</h2>
              <span className="text-sm text-gray-400">Secure Checkout</span>
            </div>
            <div className="p-5">
              {/* Payment Method Selector */}
              <PaymentMethods finalPrice={finalPrice} onCancel={() => navigate(-1)} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;

// Collapsible payment methods (Card, UPI/QR)
import { useState } from 'react';
const PaymentMethods = ({ finalPrice, onCancel }) => {
  const [open, setOpen] = useState('');
  const amount = Number(finalPrice || 0).toFixed(2);
  const upiParams = {
    pa: 'iamshivam1383@okicici',
    pn: 'Shivam',
    am: amount,
    cu: 'INR'
  };
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiParams.pa)}&pn=${encodeURIComponent(upiParams.pn)}&am=${encodeURIComponent(upiParams.am)}&cu=${encodeURIComponent(upiParams.cu)}`;
  const qrData = encodeURIComponent(upiLink);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrData}`;

  return (
    <div className="space-y-4">
      {/* Card Option */}
      <div className="bg-black/30 border border-gray-800 rounded-xl overflow-hidden">
        <button
          aria-label="Toggle card payment"
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/40"
          onClick={() => setOpen(open === 'card' ? '' : 'card')}
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400/10 border border-yellow-400/30">
              <CreditCard className="w-5 h-5 text-yellow-400" />
            </span>
            <span className="text-sm text-gray-300">Debit / Credit Card</span>
          </span>
          <motion.span
            initial={false}
            animate={{ rotate: open === 'card' ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open === 'card' ? 'auto' : 0, opacity: open === 'card' ? 1 : 0 }}
          className="overflow-hidden border-t border-gray-800"
        >
          <div className="p-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Card Number</label>
              <input className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Expiry</label>
                <input className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">CVV</label>
                <input className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" placeholder="123" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Cardholder Name</label>
              <input className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" placeholder="As on card" />
            </div>

            <div className="mt-2 space-y-3">
              <button
                className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors min-h-[44px]"
                onClick={() => alert('Frontend demo only. Integrate payment gateway SDK/server to process payments.')}
              >
                Pay ₹{finalPrice}
              </button>
              <button
                className="w-full border border-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors min-h-[44px]"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* UPI / QR Option */}
      <div className="bg-black/30 border border-gray-800 rounded-xl overflow-hidden">
        <button
          aria-label="Toggle UPI payment"
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/40"
          onClick={() => setOpen(open === 'upi' ? '' : 'upi')}
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-yellow-400/10 border border-yellow-400/30">
              <QrCode className="w-5 h-5 text-yellow-400" />
            </span>
            <span className="text-sm text-gray-300">UPI / QR</span>
          </span>
          <motion.span
            initial={false}
            animate={{ rotate: open === 'upi' ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open === 'upi' ? 'auto' : 0, opacity: open === 'upi' ? 1 : 0 }}
          className="overflow-hidden border-t border-gray-800"
        >
          <div className="p-4 grid grid-cols-1 gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <img src={qrSrc} alt="UPI QR" className="w-44 h-44 rounded-lg border border-gray-700 bg-gray-800 p-2" />
              <p className="text-xs text-gray-500">Scan to pay ₹{amount} to {upiParams.pn}</p>
            </div>

            <div className="mt-2 space-y-3">
              <button
                className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors min-h-[44px]"
                onClick={() => { window.location.href = upiLink; }}
              >
                Pay via UPI App
              </button>
              <button
                className="w-full border border-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors min-h-[44px]"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


