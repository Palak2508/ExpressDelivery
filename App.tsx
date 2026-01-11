
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Step1_Addresses } from './components/Step1_Addresses';
import { Step2_PackageDetails } from './components/Step2_PackageDetails';
import { Step3_Summary } from './components/Step3_Summary';
import { Step4_Checkout } from './components/Step4_Checkout';
import { Step5_Confirmation } from './components/Step5_Confirmation';
import { Step6_Tracking } from './components/Step6_Tracking';
import { BookingStep, BookingState, AddressInfo, PackageInfo, UserInfo } from './types';
import { SERVICES } from './constants';
import { Search, Map, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_STATE: BookingState = {
  address: { pickup: '', drop: '', instructions: '' },
  package: { type: 'Small', weight: 0.5, isExpress: false },
  user: { name: '', phone: '' },
  pricing: { base: 0, distance: 0, expressSurcharge: 0, total: 0 }
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.DETAILS);
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [trackingIdInput, setTrackingIdInput] = useState('');

  const calculatePrice = useCallback((pkg: PackageInfo) => {
    const basePrices = { Small: 5, Medium: 12, Large: 25 };
    const base = basePrices[pkg.type];
    const distPrice = pkg.weight * 1.5; 
    const expressSurcharge = pkg.isExpress ? 10 : 0;
    const total = base + distPrice + expressSurcharge;

    return { base, distance: distPrice, expressSurcharge, total };
  }, []);

  const handleNextStep1 = (address: AddressInfo, isExpress: boolean) => {
    setBooking(prev => {
      const updatedPackage = { ...prev.package, isExpress };
      return {
        ...prev,
        address,
        package: updatedPackage,
        pricing: calculatePrice(updatedPackage)
      };
    });
    setCurrentStep(BookingStep.PACKAGE);
  };

  const handleNextStep2 = (packageInfo: PackageInfo) => {
    setBooking(prev => ({
      ...prev,
      package: packageInfo,
      pricing: calculatePrice(packageInfo)
    }));
    setCurrentStep(BookingStep.SUMMARY);
  };

  const handleNextStep3 = () => {
    setCurrentStep(BookingStep.CHECKOUT);
  };

  const handleCompleteCheckout = (user: UserInfo) => {
    const trackingId = `LS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setBooking(prev => ({ ...prev, user, bookingId: trackingId }));
    setCurrentStep(BookingStep.CONFIRMATION);
  };

  const handleLaunchTracker = () => {
    setCurrentStep(BookingStep.TRACKING);
  };

  const handleTrackSubmit = () => {
    if (trackingIdInput.trim().startsWith('LS-')) {
      // Simulate tracking for an existing ID
      setBooking(prev => ({ ...prev, bookingId: trackingIdInput }));
      setCurrentStep(BookingStep.TRACKING);
    } else {
      alert("Please enter a valid Tracking ID starting with LS- (e.g., LS-X82F1S)");
    }
  };

  const handleReset = () => {
    setBooking(INITIAL_STATE);
    setTrackingIdInput('');
    setCurrentStep(BookingStep.DETAILS);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step as BookingStep);
  };

  return (
    <Layout currentStep={currentStep}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {currentStep === BookingStep.DETAILS && (
              <Step1_Addresses onNext={handleNextStep1} initialData={booking} />
            )}
            {currentStep === BookingStep.PACKAGE && (
              <Step2_PackageDetails 
                onNext={handleNextStep2} 
                onBack={() => setCurrentStep(BookingStep.DETAILS)} 
                initialData={booking} 
              />
            )}
            {currentStep === BookingStep.SUMMARY && (
              <Step3_Summary 
                data={booking} 
                onNext={handleNextStep3} 
                onEdit={handleEdit} 
              />
            )}
            {currentStep === BookingStep.CHECKOUT && (
              <Step4_Checkout 
                onComplete={handleCompleteCheckout} 
                onBack={() => setCurrentStep(BookingStep.SUMMARY)} 
                initialData={booking}
              />
            )}
            {currentStep === BookingStep.CONFIRMATION && (
              <Step5_Confirmation 
                data={booking} 
                onReset={handleReset} 
                onLaunchTracker={handleLaunchTracker} 
              />
            )}
            {currentStep === BookingStep.TRACKING && (
              <Step6_Tracking 
                data={booking} 
                onBack={() => setCurrentStep(BookingStep.CONFIRMATION)} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {(currentStep === BookingStep.DETAILS || currentStep === BookingStep.PACKAGE) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 space-y-24"
        >
          {/* Services Section with Stagger */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <h3 className="text-3xl font-black tracking-tight">Ecosystem Services</h3>
              <div className="h-[2px] bg-gradient-to-r from-blue-600/40 via-blue-600/10 to-transparent flex-grow rounded-full" />
            </div>
            
            <motion.div 
              variants={{
                show: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {SERVICES.map((service) => (
                <motion.div 
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.06)' }}
                  className="glass p-10 rounded-[2.5rem] flex flex-col items-start gap-8 group transition-all"
                >
                  <div className="p-5 bg-white/5 rounded-3xl group-hover:bg-blue-600 group-hover:shadow-xl group-hover:shadow-blue-600/30 transition-all duration-300">
                    <div className="group-hover:text-white transition-colors">
                      {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-3">{service.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center gap-1 text-blue-400 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Tracking Section */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-3xl shadow-blue-600/20 relative overflow-hidden"
          >
             <div className="absolute top-[-10%] right-[-10%] p-10 opacity-10 rotate-12 pointer-events-none">
                <Map className="w-[400px] h-[400px] text-white" />
             </div>
             
             <div className="text-center lg:text-left relative z-10 lg:max-w-lg">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white mb-6 w-fit mx-auto lg:mx-0"
               >
                 REAL-TIME GEOSPATIAL DATA
               </motion.div>
               <h4 className="text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter">Track Your <span className="text-blue-200">Shypment</span> Anywhere.</h4>
               <p className="text-blue-50 font-medium opacity-80 text-lg">Pinpoint precision with our global rider network. Get real-time ETA updates down to the second.</p>
             </div>

             <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 relative z-10 bg-white/10 p-4 rounded-[2.5rem] backdrop-blur-2xl border border-white/20 shadow-2xl">
                <div className="relative flex-grow min-w-[320px]">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 w-6 h-6" />
                   <input 
                    type="text" 
                    placeholder="Enter Tracking ID..." 
                    className="w-full pl-14 pr-6 py-5 bg-white/10 rounded-2xl outline-none text-white font-extrabold placeholder:text-white/40 focus:bg-white/20 transition-all border border-transparent focus:border-white/30"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value.toUpperCase())}
                   />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTrackSubmit}
                  className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-2xl whitespace-nowrap"
                >
                  Track Shypment
                </motion.button>
             </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
