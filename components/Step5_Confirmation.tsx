
import React from 'react';
import { CheckCircle, Truck, Package, Share2, Printer, MapPin, Sparkles, Navigation } from 'lucide-react';
import { BookingState } from '../types';
import { motion } from 'framer-motion';

interface Step5Props {
  data: BookingState;
  onReset: () => void;
  onLaunchTracker: () => void;
}

export const Step5_Confirmation: React.FC<Step5Props> = ({ data, onReset, onLaunchTracker }) => {
  return (
    <div className="p-6 md:p-12 flex flex-col items-center text-center relative">
      {/* Background celebration elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        {[1,2,3,4,5,6].map(i => (
          <motion.div 
            key={i}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{ 
              y: [-100, -400], 
              x: [Math.random() * 200 - 100, Math.random() * 600 - 300],
              opacity: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2"
          >
            <Sparkles className={`w-${4 + i} h-${4 + i} text-blue-400/30`} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mb-10 relative"
      >
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-green-500 rounded-full blur-3xl"
        />
        <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-4 mb-16"
      >
        <h2 className="text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Booking Secured</h2>
        <p className="text-slate-400 text-xl font-medium max-w-lg mx-auto">
          Your dispatch request is being broadcasted to nearby riders. Hang tight!
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white text-slate-900 p-10 md:p-12 rounded-[4rem] shadow-4xl w-full max-w-2xl text-left relative overflow-hidden group"
      >
        <div className="absolute top-[-10%] right-[-10%] p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Truck className="w-[400px] h-[400px] -rotate-12" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
          <div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">Transaction ID</span>
            <p className="text-4xl font-black text-blue-600 tracking-tighter">{data.bookingId}</p>
          </div>
          <div className="flex gap-3">
            {[Share2, Printer].map((Icon, i) => (
              <motion.button 
                key={i}
                whileHover={{ scale: 1.1, y: -2, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.9 }}
                className="p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all shadow-sm"
              >
                <Icon className="w-6 h-6 text-slate-600" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="flex gap-6">
            <div className="p-5 bg-blue-50 rounded-[1.5rem] h-fit shadow-inner">
              <MapPin className="text-blue-600 w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 block uppercase tracking-widest">Target Destination</span>
              <p className="text-xl font-bold leading-tight text-slate-800">{data.address.drop}</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="p-5 bg-indigo-50 rounded-[1.5rem] h-fit shadow-inner">
              <Package className="text-indigo-600 w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 block uppercase tracking-widest">Parcel Tier</span>
              <p className="text-xl font-bold leading-tight text-slate-800">{data.package.type} Tier • {data.package.weight}kg</p>
              <div className="flex gap-2 mt-2">
                 <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${data.package.isExpress ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                   {data.package.isExpress ? 'Lightning Express' : 'Standard Speed'}
                 </span>
                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-[9px] font-black uppercase tracking-tighter">Paid Full</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between text-white shadow-3xl shadow-slate-900/30 gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-green-500 glow-pulse" />
              <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Status</span>
              <span className="text-lg font-black text-white">Searching for Rider...</span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
            <Navigation className="w-5 h-5 text-blue-400 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase">Estimated ETA</span>
              <span className="text-xl font-black tracking-tight text-blue-400">~15-22 Mins</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 flex flex-col sm:flex-row gap-5 w-full max-w-2xl"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2.5rem] transition-all shadow-3xl shadow-blue-500/30 text-xl"
        >
          Book New Shyp
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onLaunchTracker}
          className="flex-1 py-6 bg-white/5 border-2 border-white/10 text-white font-black rounded-[2.5rem] transition-all text-xl"
        >
          Launch Tracker
        </motion.button>
      </motion.div>
    </div>
  );
};
