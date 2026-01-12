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

  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const isValid =
    name.trim().length > 2 &&
    nameRegex.test(name) &&
    phoneRegex.test(phone);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete({ name, phone: '+91' + phone });
    }, 2400);
  };

  return (
    <div className="px-4 py-6 sm:py-10 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm sm:max-w-md space-y-8 sm:space-y-10"
      >
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 sm:p-4 bg-blue-600/20 rounded-2xl mb-4 sm:mb-6">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Final Step
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base font-medium">
            Verify your contact info to secure the rider.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Your Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500/50 font-bold text-base sm:text-lg"
                placeholder="e.g. Alex Henderson"
                value={name}
                onChange={(e) =>
                  /^[A-Za-z\s]*$/.test(e.target.value) &&
                  setName(e.target.value)
                }
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Contact Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <span className="absolute left-12 sm:left-14 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                +91
              </span>
              <input
                type="tel"
                className="w-full pl-24 sm:pl-28 pr-4 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500/50 font-bold text-base sm:text-lg"
                placeholder="10-digit number"
                value={phone}
                onChange={(e) =>
                  /^\d{0,10}$/.test(e.target.value) &&
                  setPhone(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Secure Box */}
        <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-blue-600/5 border border-blue-500/20">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm font-bold text-blue-100">
              Secure Verification
            </p>
            <p className="text-xs text-blue-300">
              End-to-end encrypted details.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <button
            disabled={!isValid || isProcessing}
            onClick={handlePay}
            className={`w-full py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl transition-all ${
              isValid
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-slate-600'
            }`}
          >
            {isProcessing ? 'Processing...' : `Confirm Shyp • ₹${initialData.pricing.total.toFixed(2)}`}
          </button>

          <button
            onClick={onBack}
            className="w-full text-sm text-slate-400 hover:text-white flex justify-center items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};
