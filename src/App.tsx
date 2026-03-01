import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Home,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  MapPin
} from 'lucide-react';

// --- Utility Components ---

const LetterReveal = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-wrap ${className}`}
    >
      {text.split(" ").map((word, idx) => (
        <span key={idx} className="mr-3 flex">
          {Array.from(word).map((char, index) => (
            <motion.span variants={child} key={index} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const GlowButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group p-[2px] rounded-full overflow-hidden inline-flex"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#00F2FE] via-[#0044FF] to-[#00F2FE] rounded-full animate-spin-slow blur-sm group-hover:blur-md transition-all duration-300"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-[#00F2FE] to-[#1A365D] rounded-full animate-[spin_3s_linear_infinite]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
      <div className="relative z-10 bg-[#02040A] px-8 py-4 rounded-full flex items-center gap-2 text-white font-medium tracking-wide border border-white/5 backdrop-blur-xl transition-all group-hover:bg-transparent group-hover:text-white">
        {children}
      </div>
    </motion.button>
  );
};

const FloatingOrb = ({ color, size, top, left, delay, duration }: { color: string, size: string, top: string, left: string, delay: number, duration: number }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    className="absolute rounded-full blur-[100px] opacity-20 mix-blend-screen pointer-events-none"
    style={{ background: color, width: size, height: size, top, left }}
  />
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Shared Layout Components ---

const GlassNavBar = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-6xl flex items-center justify-between bg-[#0B0C10]/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.8)] pointer-events-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/dingdong_logo_1772329850996.png" alt="DingDong Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,242,254,0.3)] group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-widest hidden sm:block text-white group-hover:text-[#00F2FE] transition-colors">DINGDONG</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link to="/" className={`hover:text-[#00F2FE] transition-colors flex items-center gap-2 ${location.pathname === '/' ? 'text-[#00F2FE]' : ''}`}>
            <Home size={16} /> Home
          </Link>
          <Link to="/#services" className="hover:text-[#00F2FE] transition-colors flex items-center gap-2">
            <Sparkles size={16} /> Services
          </Link>
          <Link to="/contact" className={`hover:text-[#00F2FE] transition-colors flex items-center gap-2 ${location.pathname === '/contact' ? 'text-[#00F2FE]' : ''}`}>
            <MessageSquare size={16} /> Contact
          </Link>
        </nav>

        <button className="px-6 py-2.5 text-sm font-bold bg-white text-black rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:bg-gray-200 transition-all">
          Log in
        </button>
      </div>
    </motion.header>
  );
};

const FooterCTA = () => {
  return (
    <footer className="relative bg-[#010205] pt-32 pb-10 overflow-hidden border-t border-white/10">
      <FloatingOrb color="#0044FF" size="600px" top="-50%" left="20%" delay={0} duration={15} />
      <FloatingOrb color="#00F2FE" size="400px" top="-20%" left="70%" delay={2} duration={12} />

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">Ready for a <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0044FF] to-[#00F2FE]">Spotless Home?</span></h2>
          <p className="text-gray-400 text-xl max-w-xl mx-auto mb-10">Stop stressing over chores. Let Germany's most elite cleaning professionals handle it.</p>

          <Link to="/contact">
            <GlowButton>
              Schedule Your First Clean <Sparkles size={18} />
            </GlowButton>
          </Link>
        </motion.div>

        <div className="w-full h-px bg-[#0044FF]/20 my-10" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img src="/dingdong_logo_1772329850996.png" alt="DingDong Logo" className="w-8 h-8 object-contain" />
            <span className="text-white font-bold tracking-widest">DINGDONG</span>
            <span className="ml-2">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">Imprint</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Abstract AI Background */}
      <div className="absolute inset-0 z-0 bg-[#02040A]">
        <img src="/hero_background_1772329907510.png" alt="Abstract Hero Background" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040A]/80 via-transparent to-[#02040A]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="px-4 py-1.5 rounded-full border border-[#00F2FE]/30 bg-[#0044FF]/20 text-[#00F2FE] text-sm font-semibold tracking-wider mb-8 flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] backdrop-blur-md"
        >
          <Sparkles size={16} className="animate-pulse text-[#00F2FE]" />
          AVAILABLE ACROSS GERMANY
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-tight drop-shadow-2xl text-white">
          <LetterReveal text="THE FUTURE" delay={0.1} className="justify-center" />
          <LetterReveal text="OF CLEAN" delay={0.5} className="justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-white to-[#0044FF]" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light mb-12 drop-shadow-[0_2px_10px_rgba(0,68,255,0.5)]"
        >
          Elite house cleaning, redefined for the modern age. Spotless execution, total security, and seamless booking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link to="/contact">
            <GlowButton>
              Book An Appointment <ArrowRight size={18} />
            </GlowButton>
          </Link>
          <a href="#services" className="px-8 py-4 rounded-full text-white font-medium tracking-wide border border-[#0044FF]/50 hover:bg-[#0044FF]/20 shadow-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] backdrop-blur-md transition-all duration-300 flex items-center justify-center">
            View Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  const items = [
    "DEEP CLEANING", "GERMAN PRECISION", "MOVE-IN / MOVE-OUT", "ECO-FRIENDLY", "RECURRING SERVICES", "FULLY INSURED", "PREMIUM EQUIPMENT"
  ];

  return (
    <div className="py-8 bg-[#02040A] border-y border-[#0044FF]/20 overflow-hidden flex relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#02040A] before:via-transparent before:to-[#02040A] before:z-10 before:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-32 after:bg-gradient-to-l after:from-[#02040A] after:to-transparent after:z-10">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex whitespace-nowrap items-center min-w-max"
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center text-2xl font-bold tracking-widest text-[#00F2FE]/20 mx-8">
            <span className="text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-[#00F2FE] hover:to-[#0044FF] transition-all duration-300 cursor-default">
              {item}
            </span>
            <Sparkles size={24} className="ml-8 text-[#00F2FE]/40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      img: "/service_deep_clean_real_1772330999537.png",
      title: "Deep Cleaning",
      desc: "High-tech microscopic particle removal. Every corner meticulously sanitized to perfection."
    },
    {
      img: "/service_eco_real_1772331012118.png",
      title: "Eco-Friendly Routine",
      desc: "Weekly visits using non-toxic, premium German products. Safe for your family and pets."
    },
    {
      img: "/service_move_real_1772331028469.png",
      title: "Move-In/Out",
      desc: "Ensure your old or new property is absolutely flawless for the handover and inspection."
    },
  ];

  return (
    <section id="services" className="py-32 px-6 relative z-10 bg-[#02040A]">
      <div className="container mx-auto">
        <div className="text-center mb-20 text-left md:text-center w-full flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#0044FF]">DingDong</span> Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#00F2FE]/70 max-w-2xl mx-auto text-lg"
          >
            Powered by advanced nano-technologies and German precision to restore harmony to your living space.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl bg-[#040816] border border-[#0044FF]/20 overflow-hidden hover:border-[#00F2FE]/60 hover:shadow-[0_0_40px_rgba(0,102,255,0.2)] transition-all duration-500 shadow-xl"
            >
              {/* Image Header */}
              <div className="h-48 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#040816] to-transparent z-10" />
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700" />
              </div>

              {/* Content Body */}
              <div className="p-8 relative z-20 -mt-6">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#00F2FE] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {svc.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#00F2FE] font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Select <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
    </motion.div>
  );
};

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[90vh] pt-40 pb-20 px-6 w-full flex flex-col items-center justify-start relative"
    >
      <FloatingOrb color="#00F2FE" size="300px" top="10%" left="15%" delay={1} duration={12} />
      <FloatingOrb color="#0044FF" size="250px" top="60%" left="75%" delay={2} duration={15} />

      <div className="text-center mb-16 relative z-10 w-full max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter text-white">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#0044FF]">DingDong</span>
        </h1>
        <p className="text-[#00F2FE]/80 text-xl max-w-2xl mx-auto">
          Ready to experience the future of house cleaning? Reach out to our German headquarters to book a consultation or cleaning appointment today.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto relative z-10">
        {/* Contact Info Cards */}
        <div className="space-y-6 flex flex-col">
          <div className="flex-1 bg-[#040816]/50 border border-[#0044FF]/30 backdrop-blur-xl p-10 rounded-3xl hover:border-[#00F2FE]/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all flex flex-col justify-center items-start">
            <MapPin className="text-[#00F2FE] mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-3 text-white">Headquarters</h3>
            <p className="text-gray-300 text-lg">Friedrichstraße 123<br />10117 Berlin, Germany</p>
          </div>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-[#040816]/50 border border-[#0044FF]/30 backdrop-blur-xl p-8 rounded-3xl hover:border-[#00F2FE]/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all flex flex-col justify-center">
              <Phone className="text-[#00F2FE] mb-4" size={28} />
              <h3 className="text-xl font-bold mb-2 text-white">Phone</h3>
              <p className="text-gray-300">+49 30 1234 5678</p>
            </div>
            <div className="bg-[#040816]/50 border border-[#0044FF]/30 backdrop-blur-xl p-8 rounded-3xl hover:border-[#00F2FE]/50 hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all flex flex-col justify-center">
              <Mail className="text-[#00F2FE] mb-4" size={28} />
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <p className="text-gray-300">hello@dingdong.de</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#040816]/80 border border-[#0044FF]/30 backdrop-blur-2xl p-10 lg:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,68,255,0.2)] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00F2FE]/20 to-transparent blur-[50px] pointer-events-none" />
          <h2 className="text-3xl font-bold mb-8 text-white">Send a Message</h2>
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#00F2FE]/70 mb-2">First Name</label>
                <input type="text" className="w-full bg-[#02040A] border border-[#0044FF]/40 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all" placeholder="Lukas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#00F2FE]/70 mb-2">Last Name</label>
                <input type="text" className="w-full bg-[#02040A] border border-[#0044FF]/40 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all" placeholder="Müller" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00F2FE]/70 mb-2">Email Address</label>
              <input type="email" className="w-full bg-[#02040A] border border-[#0044FF]/40 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all" placeholder="lukas@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00F2FE]/70 mb-2">Message</label>
              <textarea rows={5} className="w-full bg-[#02040A] border border-[#0044FF]/40 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all resize-none" placeholder="I need a deep clean for my apartment..." />
            </div>
            <GlowButton>
              Send Request <ArrowRight size={18} />
            </GlowButton>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// --- App Root ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#02040A] text-white selection:bg-[#00F2FE] selection:text-black font-sans overflow-x-hidden">
        <GlassNavBar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <FooterCTA />
      </div>
    </Router>
  );
}
