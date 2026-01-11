
import React from 'react';
// Add Zap and ShieldCheck to lucide-react imports
import { FileText, ArrowLeft, ArrowRight, MapPin, Package, Edit2, Info, ChevronRight, Navigation, Zap, ShieldCheck } from 'lucide-react';
import { BookingState } from '../types';
import { motion } from 'framer-motion';

interface Step3Props {
  data: BookingState;
  onNext: () => void;
  onEdit: (step: number) => void;
}

export const Step3_Summary: React.FC<Step3Props> = ({ data, onNext, onEdit }) => {
  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Summary Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-8"
        >
          <header>
            <h2 className="text-5xl font-black tracking-tighter mb-2">Review Shypment</h2>
            <p className="text-slate-400 text-lg font-medium">Double check your details before we dispatch.</p>
          </header>

          <div className="space-y-6">
            {/* Liquid Route Visualization */}
            <div className="glass p-10 rounded-[3.5rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Navigation className="w-32 h-32 -rotate-12" />
              </div>
              
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 glow-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Dispatch Route</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  onClick={() => onEdit(0)} 
                  className="p-3 rounded-2xl transition-all"
                >
                  <Edit2 className="w-5 h-5 text-slate-500" />
                </motion.button>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-blue-500 border-4 border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                  />
                  <div className="w-1 flex-grow bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full my-3 min-h-[80px]" />
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                    className="w-5 h-5 rounded-full bg-purple-500 border-4 border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.5)]" 
                  />
                </div>
                <div className="flex-1 space-y-12">
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <span className="block text-[10px] text-slate-500 font-black tracking-widest mb-2">PICKUP LOCATION</span>
                    <p className="text-2xl font-black text-slate-100 leading-tight">{data.address.pickup}</p>
                  </motion.div>
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                    <span className="block text-[10px] text-slate-500 font-black tracking-widest mb-2">DROPOFF LOCATION</span>
                    <p className="text-2xl font-black text-slate-100 leading-tight">{data.address.drop}</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Compact Specs Card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass p-8 rounded-[2.5rem] border border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="p-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] shadow-xl shadow-indigo-500/20">
                  <Package className="text-white w-7 h-7" />
                </div>
                <div>
                  <span className="block font-black text-xl mb-1">{data.package.type} Tier Parcel</span>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[11px] font-black text-slate-400 border border-white/5 uppercase">{data.package.weight} KG Total</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider ${data.package.isExpress ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`}>
                      {data.package.isExpress ? 'Lightning Express' : 'Standard Speed'}
                    </span>
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, x: 5 }}
                onClick={() => onEdit(1)} 
                className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-slate-400" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Price Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="bg-white text-slate-900 p-10 md:p-12 rounded-[4rem] shadow-3xl flex flex-col h-full sticky top-12 border border-slate-100">
            <h3 className="text-3xl font-black mb-10 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <FileText className="text-blue-600 w-7 h-7" />
              </div>
              Cost Breakdown
            </h3>
            
            <div className="space-y-6 flex-grow">
              <div className="flex justify-between items-center px-2">
                <span className="text-slate-500 font-bold text-base">Standard Base Rate</span>
                <span className="font-black text-lg">INR {data.pricing.base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="text-slate-500 font-bold text-base">Distance & Weight</span>
                <span className="font-black text-lg">INR {data.pricing.distance.toFixed(2)}</span>
              </div>
              
              {data.package.isExpress && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 bg-blue-50 rounded-[1.5rem] border-2 border-dashed border-blue-200 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="text-blue-600 w-5 h-5" />
                    <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Express Priority Fee</span>
                  </div>
                  <span className="font-black text-xl text-blue-600">+INR {data.pricing.expressSurcharge.toFixed(2)}</span>
                </motion.div>
              )}

              <div className="pt-10 mt-10 border-t-2 border-slate-50 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-300">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100" />)}
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Final Amount</span>
                  <span className="text-6xl font-black tracking-tighter text-blue-600 leading-none">INR{data.pricing.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 justify-end text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Taxes & Insurance Incl.</span>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-5">
              <div className="bg-slate-50 p-5 rounded-3xl flex items-center gap-4">
                <div className="p-2 bg-slate-200 rounded-lg">
                  <Info className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed"> Dispatching a shyp confirms you agree to our automated routing and <span className="text-blue-600 font-black">Cargo Protection Terms</span>.</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNext}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-3xl shadow-blue-500/40 relative overflow-hidden"
              >
                Proceed to Checkout
                <ArrowRight className="w-7 h-7" />
                <div className="absolute inset-0 shimmer opacity-20" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
