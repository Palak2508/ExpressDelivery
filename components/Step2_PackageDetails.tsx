import React, { useState } from 'react';
import { Package, ArrowLeft, ArrowRight, Weight, AlertCircle, Sparkles } from 'lucide-react';
import { PackageInfo, BookingState } from '../types';
import { PACKAGE_TYPES } from '../constants';
import { motion } from 'framer-motion';

interface Step2Props {
  onNext: (data: PackageInfo) => void;
  onBack: () => void;
  initialData: BookingState;
}

export const Step2_PackageDetails: React.FC<Step2Props> = ({ onNext, onBack, initialData }) => {
  const [type, setType] = useState(initialData.package.type);
  const [weight, setWeight] = useState(initialData.package.weight);

  const selectedType = PACKAGE_TYPES.find(t => t.name === type);
  const isWeightValid = weight > 0 && (selectedType ? weight <= selectedType.maxWeight : true);

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2 tracking-tight">Select Size</h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">Choose the size that best fits your parcel.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 bg-blue-600/10 px-3 sm:px-4 py-1 sm:py-2 rounded-2xl border border-blue-500/20 h-fit text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="font-bold">
              {initialData.package.isExpress ? 'Express Enabled' : 'Standard Delivery'}
            </span>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {PACKAGE_TYPES.map((pkg, i) => (
            <motion.button
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setType(pkg.name as any)}
              className={`p-4 sm:p-8 rounded-[2rem] border-2 transition-all text-left flex flex-col gap-4 sm:gap-6 relative overflow-hidden group ${
                type === pkg.name 
                  ? 'border-blue-500 bg-blue-500/10 ring-4 ring-blue-500/10 shadow-2xl shadow-blue-500/20' 
                  : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              {type === pkg.name && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-blue-500 p-1 rounded-full">
                  <Package className="w-3 h-3 text-white" />
                </div>
              )}
              <div className={`p-3 sm:p-4 rounded-2xl w-fit ${type === pkg.name ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' : 'bg-white/10 text-slate-400 group-hover:bg-white/20 transition-colors'}`}>
                {pkg.icon}
              </div>
              <div>
                <span className={`block font-extrabold text-lg sm:text-xl mb-1 ${type === pkg.name ? 'text-white' : 'text-slate-300'}`}>{pkg.name}</span>
                <span className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Max {pkg.maxWeight}kg</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Weight Section */}
        <div className="glass p-6 sm:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5">
            <Weight className="w-32 sm:w-48 h-32 sm:h-48 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <label className="block mb-4 sm:mb-6 text-[10px] sm:text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Weight className="w-4 h-4 text-blue-400" />
              </div>
              Define Precise Weight
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <input
                type="range"
                min="0.1"
                max={selectedType?.maxWeight || 25}
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="flex-grow h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="min-w-[100px] sm:min-w-[120px] bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl text-center">
                <span className="text-2xl sm:text-3xl font-black text-blue-400">{weight}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 ml-1">KG</span>
              </div>
            </div>

            {!isWeightValid && weight > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-xs sm:text-sm font-bold mt-4 sm:mt-6 flex items-center gap-2 bg-red-500/10 p-2 sm:p-3 rounded-xl border border-red-500/20 w-fit"
              >
                <AlertCircle className="w-4 h-4" /> Capacity overflow for {type} package tier.
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="flex-1 p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all font-bold flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isWeightValid}
            onClick={() => onNext({ type, weight, isExpress: initialData.package.isExpress })}
            className={`flex-[2] p-4 sm:p-5 rounded-2xl font-black flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-2xl text-sm sm:text-base ${
              isWeightValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed shadow-none'
            }`}
          >
            Review Summary <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
