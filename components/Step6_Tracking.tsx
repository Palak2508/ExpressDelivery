
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Package, User, Clock, ShieldCheck, ChevronLeft, Phone, MessageSquare } from 'lucide-react';
import { BookingState } from '../types';

interface Step6Props {
  data: BookingState;
  onBack: () => void;
}

export const Step6_Tracking: React.FC<Step6Props> = ({ data, onBack }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = [
    "Searching for nearby riders...",
    "Rider 'Marco' accepted the task!",
    "Marco is 1.2km away from pickup point.",
    "Rider arrived at pickup location.",
    "Package collected and verified.",
    "Navigating to drop-off point..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[700px] w-full flex flex-col lg:flex-row gap-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-0 left-0 z-50 p-3 glass rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
      </button>

      {/* Map Section */}
      <div className="flex-[1.5] relative rounded-[3rem] overflow-hidden glass min-h-[500px] border border-white/10 shadow-3xl">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
            alt="Map" 
            className="w-full h-full object-cover opacity-30 grayscale contrast-125"
          />
        </div>

        {/* Animated Path & Marker */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            {/* Pickup Marker */}
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute top-[30%] left-[25%] flex flex-col items-center"
            >
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/40 relative">
                <MapPin className="w-4 h-4 text-white" />
                <div className="absolute inset-0 bg-blue-600 rounded-xl animate-ping opacity-20" />
              </div>
              <span className="mt-2 px-3 py-1 glass text-[8px] font-black uppercase rounded-lg">Pickup Point</span>
            </motion.div>

            {/* Drop-off Marker */}
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
              className="absolute bottom-[20%] right-[30%] flex flex-col items-center"
            >
              <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/40 relative">
                <Navigation className="w-4 h-4 text-white rotate-45" />
                <div className="absolute inset-0 bg-purple-600 rounded-xl animate-ping opacity-20" />
              </div>
              <span className="mt-2 px-3 py-1 glass text-[8px] font-black uppercase rounded-lg">Destination</span>
            </motion.div>

            {/* Rider Pulse (Simulated movement) */}
            <motion.div 
              animate={{ 
                x: [-100, 50, -20], 
                y: [-50, 100, 20],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute z-20"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <User className="w-6 h-6 text-slate-900" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-900" />
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-10" />
              </div>
            </motion.div>
        </div>

        {/* Floating Info Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] z-30">
          <div className="glass p-6 rounded-[2.5rem] flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-600 rounded-2xl">
                 <Clock className="w-5 h-5 text-white" />
               </div>
               <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Estimated Arrival</span>
                 <p className="text-xl font-black text-white">14 Mins</p>
               </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-600 rounded-2xl">
                 <Package className="w-5 h-5 text-white" />
               </div>
               <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Parcel Status</span>
                 <p className="text-xl font-black text-white">{statusIndex >= 4 ? 'In Transit' : 'Pending'}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 space-y-6">
        {/* Rider Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8 rounded-[3rem] border border-white/10"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://i.pravatar.cc/150?u=rider" alt="Rider" />
            </div>
            <div>
              <h4 className="text-xl font-black">Marco Rossi</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />)}
                </div>
                <span className="text-[10px] font-bold text-slate-400">4.9 Rider Rating</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/5">
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-black uppercase">Call</span>
            </button>
            <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/5">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-black uppercase">Chat</span>
            </button>
          </div>
        </motion.div>

        {/* Timeline Log */}
        <div className="glass p-8 rounded-[3rem] border border-white/10 flex-grow">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Activity Timeline</h4>
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {statuses.slice(0, statusIndex + 1).reverse().map((status, i) => (
                <motion.div 
                  key={status}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 items-start"
                >
                  <div className={`mt-1.5 w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500 glow-pulse' : 'bg-slate-700'}`} />
                  <p className={`text-sm font-bold ${i === 0 ? 'text-white' : 'text-slate-500'}`}>{status}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Security Badge */}
        <div className="glass p-5 rounded-3xl border border-green-500/20 bg-green-500/5 flex items-center gap-4">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-green-100">Contactless Delivery Enabled</span>
        </div>
      </div>
    </div>
  );
};
