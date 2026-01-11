import React, { useState, useEffect } from 'react';
import {
  MapPin,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddressInfo, BookingState } from '../types';

// ✅ CORRECT IMAGE IMPORT
import riderImage from '../assets/images/riderImage.png';

interface Step1Props {
  onNext: (data: AddressInfo, isExpress: boolean) => void;
  initialData: BookingState;
}

export const Step1_Addresses: React.FC<Step1Props> = ({
  onNext,
  initialData,
}) => {
  const [pickup, setPickup] = useState(initialData.address.pickup);
  const [drop, setDrop] = useState(initialData.address.drop);
  const [instructions, setInstructions] = useState(
    initialData.address.instructions
  );
  const [isExpress, setIsExpress] = useState(
    initialData.package.isExpress
  );
  const [error, setError] = useState<string | null>(null);

  const isValid = pickup.length > 5 && drop.length > 5;

  useEffect(() => {
    if (
      pickup.toLowerCase().includes('mars') ||
      pickup.toLowerCase().includes('123 test')
    ) {
      setError('This location is outside our operational zone.');
    } else {
      setError(null);
    }
  }, [pickup]);

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-stretch">
      {/* LEFT FORM */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="flex-1"
      >
        <div className="bg-white text-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-3xl relative overflow-hidden border border-slate-100">
          <header className="mb-10">
            <h2 className="text-4xl font-black mb-3">
              Initialize Delivery
            </h2>
            <p className="text-slate-400 font-medium">
              Enter your coordinates to fetch the nearest rider.
            </p>
          </header>

          <div className="space-y-6">
            {/* PICKUP */}
            <div className="group relative">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1 mb-2 block">
                Pickup Source
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 p-2 bg-blue-50 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Where should we pick up?"
                  className={`w-full pl-16 pr-14 py-5 rounded-[2rem] border-2 outline-none font-bold text-lg ${
                    error
                      ? 'border-red-200 bg-red-50'
                      : pickup.length > 5
                      ? 'border-green-200'
                      : 'border-slate-100'
                  }`}
                />
                <AnimatePresence>
                  {pickup.length > 5 && !error && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-5 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2 className="text-green-500 w-6 h-6" />
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-5 top-1/2 -translate-y-1/2"
                    >
                      <AlertTriangle className="text-red-500 w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2 ml-2 font-bold">
                  {error}
                </p>
              )}
            </div>

            {/* DROP */}
            <div className="group relative">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-1 mb-2 block">
                Destination Point
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 p-2 bg-indigo-50 rounded-xl">
                  <Navigation className="w-5 h-5 rotate-45" />
                </div>
                <input
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Destination address..."
                  className="w-full pl-16 pr-14 py-5 rounded-[2rem] border-2 border-slate-100 outline-none font-bold text-lg"
                />
                {drop.length > 5 && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  </div>
                )}
              </div>
            </div>

            {/* EXPRESS */}
            <motion.div
              onClick={() => setIsExpress(!isExpress)}
              whileHover={{ scale: 1.01 }}
              className={`p-6 rounded-[2.5rem] cursor-pointer flex justify-between items-center border-2 ${
                isExpress
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center gap-5">
                <Zap />
                <div>
                  <p className="font-black">Lightning Express</p>
                  <p className="text-xs opacity-80">
                    Priority Rider Tier
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <button
            disabled={!isValid || !!error}
            onClick={() =>
              onNext({ pickup, drop, instructions }, isExpress)
            }
            className="w-full mt-10 p-6 rounded-[2rem] font-black text-xl bg-blue-600 text-white disabled:bg-slate-200"
          >
            Configure Package
            <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </motion.div>

      {/* RIGHT IMAGE PANEL */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden lg:flex flex-[0.8]"
      >
        <div className="flex-grow rounded-[3.5rem] overflow-hidden relative border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-transparent z-10" />

          {/* ✅ FIXED IMAGE */}
          <motion.img
            src={riderImage}
            alt="Express Rider"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />

          <div className="relative z-20 p-12 text-white">
            <h3 className="text-4xl font-black mb-4">
              Lightning speed.
              <br />
              Total transparency.
            </h3>
            <p className="text-blue-100 max-w-sm">
              Our advanced routing assigns your package instantly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
