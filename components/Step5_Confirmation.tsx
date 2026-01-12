import React from 'react';
import {
  CheckCircle, Truck, Package, Share2,
  Printer, MapPin, Sparkles, Navigation
} from 'lucide-react';
import { BookingState } from '../types';
import { motion } from 'framer-motion';

interface Step5Props {
  data: BookingState;
  onReset: () => void;
  onLaunchTracker: () => void;
}

export const Step5_Confirmation: React.FC<Step5Props> = ({
  data,
  onReset,
  onLaunchTracker
}) => {
  return (
    <div className="relative px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center text-center overflow-hidden">

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {[1,2,3,4,5].map(i => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ y: [-50, -300], opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
            className="absolute left-1/2 top-1/2"
          >
            <Sparkles className="w-5 h-5 text-blue-400/30" />
          </motion.div>
        ))}
      </div>

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 sm:w-32 sm:h-32 bg-green-500/10 rounded-full flex items-center justify-center mb-6 sm:mb-10"
      >
        <CheckCircle className="w-14 h-14 sm:w-20 sm:h-20 text-green-500" />
      </motion.div>

      {/* Heading */}
      <div className="space-y-3 mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Booking Secured
        </h2>
        <p className="text-slate-400 text-sm sm:text-xl max-w-md mx-auto">
          Your dispatch request is being broadcasted to nearby riders.
        </p>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white text-slate-900 p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[4rem] shadow-3xl w-full max-w-2xl text-left relative overflow-hidden"
      >
        <Truck className="absolute -right-24 -top-24 w-64 h-64 opacity-5 hidden sm:block" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Transaction ID
            </span>
            <p className="text-2xl sm:text-4xl font-black text-blue-600">
              {data.bookingId}
            </p>
          </div>

          <div className="flex gap-3">
            {[Share2, Printer].map((Icon, i) => (
              <button
                key={i}
                className="p-3 sm:p-4 bg-slate-50 border rounded-xl"
              >
                <Icon className="w-5 h-5 text-slate-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem
            icon={<MapPin />}
            label="Target Destination"
            value={data.address.drop}
          />
          <InfoItem
            icon={<Package />}
            label="Parcel Tier"
            value={`${data.package.type} • ${data.package.weight}kg`}
            badge={data.package.isExpress ? 'Express' : 'Standard'}
          />
        </div>

        {/* Status */}
        <div className="mt-8 p-6 bg-slate-900 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 text-white">
          <div>
            <p className="text-xs text-slate-400 uppercase">Status</p>
            <p className="font-black">Searching for Rider...</p>
          </div>
          <div className="text-blue-400 font-black text-xl">
            ETA ~15–22 min
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <button
          onClick={onReset}
          className="flex-1 py-4 sm:py-6 bg-blue-600 text-white font-black rounded-2xl text-lg"
        >
          Book New Shyp
        </button>
        <button
          onClick={onLaunchTracker}
          className="flex-1 py-4 sm:py-6 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-lg"
        >
          Launch Tracker
        </button>
      </div>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
  badge
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
}) => (
  <div className="flex gap-4">
    <div className="p-4 bg-blue-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-black text-slate-400">{label}</p>
      <p className="font-bold text-slate-800">{value}</p>
      {badge && (
        <span className="inline-block mt-2 px-2 py-1 text-[9px] bg-blue-100 text-blue-700 rounded-md font-black uppercase">
          {badge}
        </span>
      )}
    </div>
  </div>
);
