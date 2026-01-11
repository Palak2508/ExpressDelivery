import React, { useState } from 'react';
import { User, Phone, ShieldCheck, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { UserInfo, BookingState } from '../types';
import { motion } from 'framer-motion';

interface Step4Props {
  onComplete: (user: UserInfo) => void;
  onBack: () => void;
  initialData: BookingState;
}

export const Step4_Checkout: React.FC<Step4Props> = ({ onComplete, onBack, initialData }) => {
  const [name, setName] = useState(initialData.user.name);
  const [phone, setPhone] = useState(initialData.user.phone);
  const [isProcessing, setIsProcessing] = useState(false);

  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const phoneRegex = /^[0-9]{10}$/;  // Exactly 10 digits

  const isValid = name.trim().length > 2 && nameRegex.test(name) && phoneRegex.test(phone);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete({ name, phone: '+91' + phone }); // Add +91 automatically
    }, 2400);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-10"
      >
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-blue-600/20 rounded-2xl mb-6">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">Final Step</h2>
          <p className="text-slate-400 mt-2 font-medium">Verify your contact info to secure the rider.</p>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="e.g. Alex Henderson"
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-bold text-lg"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            {!nameRegex.test(name) && name.length > 0 && (
              <p className="text-red-400 text-xs mt-1">Name can only contain letters and spaces.</p>
            )}
          </div>

          {/* Phone Input: Icon first, then +91 */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Number</label>
            <div className="relative flex items-center">
              {/* Phone Icon */}
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              {/* +91 Country Code */}
              <span className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+91</span>
              {/* Input */}
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                className="w-full pl-28 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-bold text-lg"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            {!phoneRegex.test(phone) && phone.length > 0 && (
              <p className="text-red-400 text-xs mt-1">Phone number must be exactly 10 digits.</p>
            )}
          </div>
        </div>

        {/* Secure Verification Box */}
        <motion.div 
          whileHover={{ x: 5 }}
          className="glass border border-blue-500/20 p-5 rounded-[2rem] flex items-center gap-4 bg-blue-600/5"
        >
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <ShieldCheck className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-blue-100 font-bold">Secure Verification</p>
            <p className="text-[10px] text-blue-300 font-medium">End-to-end encrypted details.</p>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="pt-6 flex flex-col gap-4">
          <motion.button
            whileHover={isValid && !isProcessing ? { scale: 1.02, y: -2 } : {}}
            whileTap={isValid && !isProcessing ? { scale: 0.98 } : {}}
            disabled={!isValid || isProcessing}
            onClick={handlePay}
            className={`w-full py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden ${
              isValid && !isProcessing 
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 cursor-pointer' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                Confirm Shyp • INR {initialData.pricing.total.toFixed(2)}
              </>
            )}
            {isValid && !isProcessing && <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />}
          </motion.button>

          <button
            onClick={onBack}
            className="w-full py-4 text-slate-500 hover:text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Modify Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};
