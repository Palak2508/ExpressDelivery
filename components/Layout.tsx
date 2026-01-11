import React, { useState } from 'react';
import { Hexagon, Facebook, Twitter, Instagram, Menu, X } from 'lucide-react';
import { BookingStep } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: BookingStep;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentStep }) => {
  const steps = ['Details', 'Package', 'Summary', 'Checkout'];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white flex flex-col items-center px-4 md:px-12 relative overflow-x-hidden">
      {/* Container for ambient orbs to prevent vertical scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [20, -20, 20], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full"
        />
      </div>

      {/* HEADER */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl glass rounded-[3rem] p-4 md:p-5 mb-12 flex items-center justify-between shadow-2xl relative z-50 border border-white/10"
      >
        {/* LOGO */}
        <div className="flex items-center gap-4 group cursor-pointer pl-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg"
          >
            <Hexagon className="w-6 h-6" />
          </motion.div>
          <span className="text-2xl font-black tracking-tight">
            Let's <span className="gradient-text">Shyp</span>
          </span>
        </div>

        {/* DESKTOP STEPS */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-[2rem] border border-white/5">
          {steps.map((step, idx) => (
            <div key={step} className="relative px-6 py-2.5 z-10">
              <span className={`text-xs font-bold ${currentStep === idx ? 'text-white' : 'text-slate-500'}`}>
                {step}
              </span>
              {currentStep === idx && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-[2rem] -z-10"
                />
              )}
            </div>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex items-center gap-6 pr-4">
          <button className="text-xs font-bold text-slate-400 hover:text-white">Support</button>
          <button className="bg-white text-slate-900 px-7 py-3 rounded-2xl text-xs font-black">
            Get the App
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-3 rounded-2xl bg-white/10 border border-white/10"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden w-full max-w-6xl glass rounded-[2.5rem] p-6 mb-10 border border-white/10"
          >
            <div className="flex flex-col gap-4">
              {steps.map((step, idx) => (
                <div
                  key={step}
                  className={`px-6 py-4 rounded-2xl text-sm font-black ${
                    currentStep === idx
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {step}
                </div>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <button className="text-sm font-bold text-slate-300 text-left">Support</button>
              <button className="bg-white text-slate-900 py-4 rounded-2xl font-black">
                Get the App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <main className="w-full max-w-6xl flex-grow relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <div className="w-full max-w-6xl mt-20 grid grid-cols-1 md:grid-cols-4 gap-12 p-12 glass rounded-[4rem]">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Hexagon className="w-7 h-7 text-blue-500" />
            <span className="text-2xl font-black">Let's Shyp</span>
          </div>
          <p className="text-slate-400 max-w-md">
            Premium hyperlocal express delivery with unmatched speed.
          </p>
          <div className="flex gap-4 mt-10">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl">
                <Icon className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
