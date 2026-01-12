import React from 'react';
import {
  FileText, ArrowRight, Package, Edit2, Info,
  ChevronRight, Navigation, Zap, ShieldCheck
} from 'lucide-react';
import { BookingState } from '../types';
import { motion } from 'framer-motion';

interface Step3Props {
  data: BookingState;
  onNext: () => void;
  onEdit: (step: number) => void;
}

export const Step3_Summary: React.FC<Step3Props> = ({ data, onNext, onEdit }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-6 sm:space-y-8"
        >
          <header>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              Review Shypment
            </h2>
            <p className="text-slate-400 text-sm sm:text-lg font-medium">
              Double check your details before dispatch.
            </p>
          </header>

          {/* Route Card */}
          <div className="glass p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/10 relative overflow-hidden">
            <Navigation className="absolute right-6 top-6 w-24 h-24 opacity-5 hidden sm:block" />

            <div className="flex justify-between items-center mb-6 sm:mb-10">
              <span className="text-[10px] font-black tracking-widest text-blue-400">
                DISPATCH ROUTE
              </span>
              <button
                onClick={() => onEdit(0)}
                className="p-3 rounded-xl hover:bg-white/10"
              >
                <Edit2 className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="flex sm:flex-col items-center gap-3 sm:gap-0">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <div className="w-10 sm:w-1 sm:h-24 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <div className="w-4 h-4 rounded-full bg-purple-500" />
              </div>

              <div className="space-y-6 sm:space-y-12">
                <div>
                  <span className="text-[10px] text-slate-500 font-black tracking-widest">
                    PICKUP
                  </span>
                  <p className="text-lg sm:text-2xl font-black text-slate-100">
                    {data.address.pickup}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-black tracking-widest">
                    DROPOFF
                  </span>
                  <p className="text-lg sm:text-2xl font-black text-slate-100">
                    {data.address.drop}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Package Card */}
          <div className="glass p-5 sm:p-8 rounded-3xl border border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                <Package className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-base sm:text-xl">
                  {data.package.type} Tier Parcel
                </p>
                <p className="text-xs text-slate-400">
                  {data.package.weight} KG • {data.package.isExpress ? 'Express' : 'Standard'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onEdit(1)}
              className="p-3 sm:p-4 bg-white/5 rounded-xl"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 lg:sticky lg:top-12">
            <h3 className="text-xl sm:text-3xl font-black mb-6 sm:mb-10 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Cost Breakdown
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <Row label="Base Rate" value={data.pricing.base} />
              <Row label="Distance & Weight" value={data.pricing.distance} />

              {data.package.isExpress && (
                <div className="p-4 bg-blue-50 rounded-xl flex justify-between items-center">
                  <Zap className="text-blue-600 w-4 h-4" />
                  <span className="font-black text-blue-600">
                    +INR {data.pricing.expressSurcharge.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="pt-6 border-t">
                <p className="text-xs uppercase text-slate-400 font-black mb-1">
                  Final Amount
                </p>
                <p className="text-3xl sm:text-5xl font-black text-blue-600">
                  INR {data.pricing.total.toFixed(2)}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  Taxes included
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="w-full mt-8 py-4 sm:py-6 bg-blue-600 text-white rounded-2xl font-black text-lg sm:text-2xl flex justify-center gap-3"
            >
              Proceed to Checkout
              <ArrowRight />
            </motion.button>

            <div className="mt-4 bg-slate-50 p-4 rounded-2xl flex gap-3">
              <Info className="w-4 h-4 text-slate-500" />
              <p className="text-[11px] text-slate-500">
                By continuing you accept Cargo Protection Terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="font-black">INR {value.toFixed(2)}</span>
  </div>
);
