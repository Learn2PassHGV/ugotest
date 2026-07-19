/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { 
  ArrowRight, Video, Shield, Navigation, Building2,
  Users, MoveRight, ChevronRight, Play, CheckCircle2, ChevronLeft,
  BookOpen, PlaneTakeoff, Film, Phone, Mail, MapPin
} from 'lucide-react';
import { cn } from './lib/utils';
import { ConciergeChat } from './components/ConciergeChat';
import { sendLead, containsContactDetails, fetchChatReply } from './lib/leads';
import { getTownBySlug } from './data/towns';

/* =========================================
   Deliverables Data
   ========================================= */

const HERO_COPIES = [
  {
    hero: "Premium Coach & Minibus Hire Nationwide.",
    sub: "Whether you are managing high-profile film productions, seamless corporate roadshows, or large-scale private events, we make sure your group travel runs completely on time. We combine premium national fleet capability with the direct, personal care of an attentive family team."
  },
  {
    hero: "The Benchmark in British Travel Logistics.",
    sub: "Whether you are managing high-profile film productions, seamless corporate roadshows, or large-scale private events, we make sure your group travel runs completely on time. We combine premium national fleet capability with the direct, personal care of an attentive family team."
  },
  {
    hero: "Elite Fleet Standards. Family-Run Accountability.",
    sub: "Whether you are managing high-profile film productions, seamless corporate roadshows, or large-scale private events, we make sure your group travel runs completely on time. We combine premium national fleet capability with the direct, personal care of an attentive family team."
  }
];

/* =========================================
   Autocomplete Suggestions Stubs
   ========================================= */

const PICKUP_SUGGESTIONS = [
  "St Albans Base, Hertfordshire (AL2)",
  "London Hotel, Central London",
  "Warner Bros. Studios, Leavesden",
  "Hatfield House, Hertfordshire",
  "Luton Airport (LTN), Bedfordshire"
];

const DESTINATION_SUGGESTIONS = [
  "Heathrow Terminal 5 (LHR)",
  "Gatwick Airport (LGW)",
  "Elstree Studios, Borehamwood",
  "Wembley Stadium, London",
  "St Albans Operations Base"
];

/* =========================================
   Sub-components
   ========================================= */

function HeroAndQuoteArea() {
  const [copyIndex, setCopyIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    journeyType: "Corporate Logistics",
    name: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [cardRotateX, setCardRotateX] = useState("0deg");
  const [cardRotateY, setCardRotateY] = useState("0deg");
  const [cardScale, setCardScale] = useState("1");
  const [isHovered, setIsHovered] = useState(false);
  const [activeFocus, setActiveFocus] = useState<string | null>(null);

  const handleConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x, y, opacity: 1 });
    setIsHovered(true);

    if (window.innerWidth >= 768) {
      const calcX = (0.5 - (y / rect.height)) * 14;
      const calcY = ((x / rect.width) - 0.5) * 14;
      setCardRotateX(`${calcX}deg`);
      setCardRotateY(`${calcY}deg`);
      setCardScale("1.02");
    }
  };

  const handleConsoleMouseLeave = () => {
    setGlowPos(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
    setCardRotateX("0deg");
    setCardRotateY("0deg");
    setCardScale("1");
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.pickup) {
        newErrors.pickup = "Please let us know your pickup point so we can map the route accurately.";
      }
      if (!formData.destination) {
        newErrors.destination = "Please let us know your destination point so we can map the route accurately.";
      }
      if (!formData.date || !formData.time) {
        newErrors.timing = "Please select your departure timing so we can verify fleet availability.";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    } else if (step === 2) {
      if (!formData.passengers || Number(formData.passengers) <= 0) {
        newErrors.passengers = "Please enter passenger count so we can match the perfect vehicle class.";
        setErrors(newErrors);
        return;
      }
    }
    setErrors({});
    setStep(s => Math.min(s + 1, 3));
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setErrors({});
    setStep(s => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name || !formData.email || !formData.phone) {
      newErrors.contact = "Please share a valid contact method so our management team can send your quote direct.";
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setIsSending(true);
    const result = await sendLead({
      type: 'quote',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      pickup: formData.pickup,
      destination: formData.destination,
      date: formData.date,
      time: formData.time,
      passengers: formData.passengers,
      journeyType: formData.journeyType,
    });
    setIsSending(false);
    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setSubmitError(
        "We couldn't send your request just now — please try again in a moment, or call us directly on 0845 8333 456 and we'll quote you over the phone."
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 50) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePreSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ passengers?: string; journeyType?: string; pickup?: string }>;
      if (customEvent.detail) {
        setFormData(prev => ({ 
          ...prev, 
          ...(customEvent.detail.passengers ? { passengers: customEvent.detail.passengers } : {}),
          ...(customEvent.detail.journeyType ? { journeyType: customEvent.detail.journeyType } : {}),
          ...(customEvent.detail.pickup ? { pickup: customEvent.detail.pickup } : {})
        }));
        setIsExpanded(true);
        if (customEvent.detail.journeyType) {
          setStep(1);
          setActiveFocus('journeyType');
        } else if (customEvent.detail.passengers) {
          setStep(2);
          setActiveFocus('passengers');
          setTimeout(() => {
            const input = document.getElementById("passenger-count-input");
            if (input) {
              input.focus();
            }
          }, 300);
        } else if (customEvent.detail.pickup) {
          setStep(1);
          setActiveFocus('pickup');
        }
        setErrors({});
      }
    };
    window.addEventListener('booking-preselect-passengers', handlePreSelect);
    return () => {
      window.removeEventListener('booking-preselect-passengers', handlePreSelect);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsInitialLoad(false);
      setCopyIndex((prev) => (prev + 1) % HERO_COPIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const scrollRatio = isExpanded ? 0 : Math.min(scrollY / 120, 1);
  const headlineScale = isExpanded ? 1.0 : (1 + (scrollRatio * 0.15));
  const containerTranslateY = isExpanded ? 0 : (scrollRatio * (screenWidth < 768 ? 20 : 65));

  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden bg-stone-50 border-b border-royal-navy/10 transition-all duration-500 ease-out",
        isExpanded ? "min-h-[145vh] lg:min-h-[125vh] pt-32 pb-12" : "min-h-[105vh] lg:min-h-[110vh] pt-32 pb-24"
      )}
    >
      {/* Cinematic Curtain Overlay */}
      <div className="ugo-cinema-curtain">
        <span>We go where UGO.</span>
      </div>

      <style>{`
        @keyframes floatSpace {
          0%, 100% {
            transform: perspective(1500px) translateY(0px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(var(--scale, 1), var(--scale, 1), var(--scale, 1));
          }
          50% {
            transform: perspective(1500px) translateY(-12px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(var(--scale, 1), var(--scale, 1), var(--scale, 1));
          }
        }
        .animate-space-float {
          animation: floatSpace 8s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .text-glow-title {
          text-shadow: 0 4px 20px rgba(255,255,255,0.15);
        }
        .horizontal-split-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(55vh + 450px);
          background: linear-gradient(to bottom, #fafaf9 0%, #fafaf9 55vh, #030F26 calc(55vh + 112.5px), rgba(3, 15, 38, 0.92) calc(55vh + 202.5px), rgba(3, 15, 38, 0.5) calc(55vh + 337.5px), transparent calc(55vh + 450px));
          pointer-events: none;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          .horizontal-split-overlay {
            height: calc(55vh + 450px);
            background: linear-gradient(to bottom, #fafaf9 0%, #fafaf9 55vh, #030F26 calc(55vh + 112.5px), rgba(3, 15, 38, 0.92) calc(55vh + 202.5px), rgba(3, 15, 38, 0.5) calc(55vh + 337.5px), transparent calc(55vh + 450px));
          }
        }

        :root {
          --luxury-inertia: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Cinematic Curtain Animations */
        @keyframes taglineReveal {
          0% { opacity: 0; transform: translate3d(0, 30px, 0) scale3d(0.96, 0.96, 1); filter: blur(10px); letter-spacing: -0.02em; }
          35% { opacity: 1; transform: translate3d(0, 0, 0) scale3d(1, 1, 1); filter: blur(0px); letter-spacing: 0.02em; }
          70% { opacity: 1; transform: translate3d(0, -10px, 0) scale3d(1.02, 1.02, 1); filter: blur(0px); letter-spacing: 0.05em; }
          100% { opacity: 0; transform: translate3d(0, -60px, 0) scale3d(1.04, 1.04, 1); filter: blur(8px); }
        }

        @keyframes curtainDissolve {
          0% { opacity: 1; visibility: visible; }
          85% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; pointer-events: none; }
        }

        @keyframes homepageDelayedCascade {
          0% { opacity: 0; transform: translate3d(0, 50px, 0); filter: blur(6px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0px); }
        }

        .ugo-cinema-curtain {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 9999 !important;
          background-color: #05070B !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          animation: curtainDissolve 2.4s var(--luxury-inertia) both !important;
        }

        .ugo-cinema-curtain span {
          color: #ffffff !important;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif !important;
          font-size: clamp(2rem, 5vw, 4.5rem) !important;
          font-weight: 500 !important;
          text-align: center !important;
          animation: taglineReveal 2.4s var(--luxury-inertia) both !important;
          will-change: transform, opacity, filter !important;
        }

        /* 1. The Global Entry Keyframe */
        @keyframes luxurySliderEntry {
          0% {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0px);
          }
        }

        /* 2. Secure Grid Container (Preserves Layout Height) */
        .hero-titles-grid-stack {
          display: grid !important;
          grid-template-columns: 1fr !important;
          grid-template-rows: 1fr !important;
          position: relative !important;
          margin-bottom: 40px !important;
          padding-bottom: 10px !important;
          opacity: 0;
          animation: homepageDelayedCascade 1.3s var(--luxury-inertia) both !important;
          animation-delay: 2.1s !important;
          will-change: transform, opacity, filter !important;
        }

        /* 3. The Safe Fallback Base Class (No Rigid Locks) */
        .hero-title-item {
          grid-area: 1 / 1 / 2 / 2 !important;
          width: 100% !important;
          line-height: 1.35 !important;
          opacity: 0;
          visibility: hidden;
          transform: translate3d(0, -25px, 0);
          transition: opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s !important;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* 4. Multi-Class Catch-All (Triggers on WHATEVER class the JS is using) */
        .hero-title-item.is-active,
        .hero-title-item.active,
        .hero-title-item[data-active="true"],
        .hero-title-item[style*="opacity: 1"] {
          opacity: 1 !important;
          visibility: visible !important;
          animation: luxurySliderEntry 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
        }

        /* 5. Clean Subtext Space Anchor */
        .hero-subtext-reveal {
          opacity: 0;
          animation: homepageDelayedCascade 1.3s var(--luxury-inertia) both !important;
          animation-delay: 2.25s !important;
          will-change: transform, opacity, filter !important;
        }

        /* 6. Smart Quote Estimator */
        #smart-quote {
          opacity: 0;
          animation: homepageDelayedCascade 1.4s var(--luxury-inertia) both !important;
          animation-delay: 2.4s !important;
          will-change: transform, opacity, filter !important;
        }
      `}</style>

      {/* EXPANDING VIDEO BACKGROUND */}
      <div 
        className={cn(
          "absolute top-0 h-full pointer-events-none transition-all duration-700 ease-in-out z-0",
          isExpanded ? "w-full right-0 lg:w-full opacity-100" : "w-full lg:w-1/2 right-0 opacity-100"
        )}
        style={{
          maxHeight: isExpanded ? "100%" : "100vh"
        }}
      >
        <div className="absolute inset-0 bg-royal-navy z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.webp"
            style={{
              objectFit: 'cover',
              objectPosition: 'center bottom',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              transform: 'scale(1.05) translateY(2%)',
              transformOrigin: 'bottom center',
              transition: 'object-position 700ms ease-in-out, transform 700ms ease-in-out'
            }}
            src="/media/hero-1280.mp4"
          />
          {/* Cinematic Navy Color Wash (Subtle 10% Opacity) */}
          <div 
            className="absolute inset-0 bg-[#030F26] pointer-events-none" 
            style={{ opacity: 0.10, zIndex: -1 }}
          />
          {/* Subtle Outer Vignette for Content Anchoring */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 40%, rgba(3, 15, 38, 0.5) 85%, rgba(3, 15, 38, 0.75) 100%)',
              zIndex: -1
            }}
          />
        </div>
        {/* Sophisticated Multi-stage Overlay Gradient for High-End Transition Blur */}
        <div 
          className={cn(
            "absolute top-0 bottom-0 left-0 w-[450px] hidden lg:block z-20 transition-opacity duration-700",
            isExpanded ? "opacity-0" : "opacity-100"
          )}
          style={{
            background: 'linear-gradient(to right, #fafaf9 0%, #030F26 25%, rgba(3, 15, 38, 0.92) 45%, rgba(3, 15, 38, 0.5) 75%, transparent 100%)'
          }}
        ></div>
        
        {/* Unified Horizontal Split Overlay */}
        <div 
          className={cn(
            "horizontal-split-overlay transition-opacity duration-700 ease-in-out",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Bottom Dark Gradient Overlay for Form Legibility */}
        <div className="absolute left-0 bottom-0 w-full h-96 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-20"></div>
      </div>

      {/* MORPHING OFF-WHITE LEFT PANEL BACKGROUND LAYER AND TEXT CONTAINER */}
      <div 
        className={cn(
          "absolute left-0 top-0 transition-all duration-500 ease-out",
          isExpanded 
            ? "w-full items-center text-center px-6" 
            : "bg-stone-50 border-stone-100/80 w-full lg:w-1/2 h-full items-start text-left px-8 sm:px-12 lg:px-20 pt-24 sm:pt-28 lg:pt-36 pb-24 border-r justify-start flex flex-col"
        )}
        style={{ 
          willChange: "transform, height",
          background: isExpanded ? "transparent" : undefined,
          zIndex: isExpanded ? 2 : 20,
          ...(isExpanded ? {
            paddingTop: "140px",
            minHeight: "55vh",
            paddingBottom: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          } : {})
        }}
      >
        <div 
          className={cn("w-full flex flex-col", isExpanded ? "items-center max-w-4xl transition-all duration-500" : "items-start max-w-2xl")}
          style={{
            transform: `translateY(${containerTranslateY}px)`,
            transformOrigin: isExpanded ? "center" : "left center",
            willChange: "transform",
            transition: isExpanded ? "transform 0.5s ease-out" : "none"
          }}
        >
          <div className={cn("flex items-center gap-3 transition-all duration-500", isExpanded ? "mb-1 justify-center" : "mb-6")}>
            {!isExpanded && <div className="w-8 h-px bg-brass"></div>}
            <span className={cn(
              "font-sans uppercase font-bold text-amber-600 font-mono tracking-widest",
              isExpanded ? "text-[8px] sm:text-[10px]" : "text-xs tracking-[0.2em] text-brass"
            )}>
              UGO Commercial & Private Hire
            </span>
          </div>
          
          <div className={cn("flex flex-col transition-all duration-500 w-full", isExpanded ? "gap-1 items-center" : "gap-4 -mt-2")}>
            {/* Single canonical H1 for search engines & screen readers; the rotating
                display copies below are decorative (aria-hidden). */}
            <h1 className="sr-only">Premium Coach &amp; Minibus Hire Nationwide — UGO, St Albans &amp; London</h1>
            <div className="hero-titles-grid-stack">
              {HERO_COPIES.map((copy, index) => {
                const isActive = index === copyIndex;
                return (
                  <p
                    aria-hidden="true"
                    key={index}
                    className={cn(
                      "font-serif text-royal-navy font-medium reveal-text-mask hero-title-item",
                      isActive ? "is-active" : "",
                      isActive && isInitialLoad ? "initial-load-animation" : "",
                      isExpanded 
                        ? "text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-center" 
                        : "text-4xl sm:text-5xl lg:text-6xl tracking-tight text-left"
                    )}
                    style={{
                      transform: `scale(${headlineScale})`,
                      transformOrigin: isExpanded ? "center" : "left center",
                      willChange: "transform",
                      transition: isExpanded ? "transform 0.5s ease-out" : "none"
                    }}
                  >
                    {copy.hero}
                  </p>
                );
              })}
            </div>
            
            <p
              className={cn(
                "font-sans text-royal-navy-light/80 font-light transition-all duration-500 hero-subtext-reveal",
                isExpanded 
                  ? "text-[10px] sm:text-xs md:text-sm line-clamp-1 sm:line-clamp-2 md:line-clamp-none max-w-2xl text-center leading-normal" 
                  : "text-base sm:text-lg lg:text-xl leading-relaxed text-left"
              )}
            >
              {HERO_COPIES[0].sub}
            </p>
          </div>
        </div>
      </div>

      {/* SMART QUOTE FORM OVERLAY */}
      <div 
        className={cn(
          "relative z-30 w-full px-6 font-sans transition-all duration-700 ease-in-out",
          isExpanded 
            ? "pt-[38vh] lg:pt-[40vh] mt-0 pb-12" 
            : "mt-[72vh] lg:mt-[78vh] pb-24"
        )} 
        id="smart-quote"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Card (Glass Console Wrapper) with Float & 3D Interactive Tilts */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[36px] relative p-[1.5px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] animate-space-float select-none"
            style={{
              '--rx': cardRotateX,
              '--ry': cardRotateY,
              '--scale': cardScale,
              transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
            } as React.CSSProperties}
            onMouseMove={handleConsoleMouseMove}
            onMouseLeave={handleConsoleMouseLeave}
          >
            {/* Perimeter Active Liquid Glowing Trace Line (Conic gradient spinning behind) */}
            <div className="absolute inset-[-400%] pointer-events-none z-0 bg-[conic-gradient(from_0deg,#f59e0b_0deg,transparent_110deg,#ffffff_180deg,transparent_290deg,#f59e0b_360deg)] animate-[spin_10s_linear_infinite] opacity-80" />

            {/* Perfect contrast, backdrop blur solidifying background legibility */}
            <div className="backdrop-blur-3xl bg-slate-950/95 rounded-[34.5px] p-8 md:p-12 relative z-10 w-full h-full">
              {/* Active Mouse Tracker Glow */}
              <div 
                id="mouse-gradient-glow"
                className="absolute pointer-events-none transition-opacity duration-500 rounded-full"
                style={{
                  left: `${glowPos.x}px`,
                  top: `${glowPos.y}px`,
                  opacity: glowPos.opacity,
                  width: '450px',
                  height: '450px',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0) 70%)',
                  zIndex: 0
                }}
              />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form-mode"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Header Cluster */}
                      <div className="text-center mb-10">
                        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-amber-400 mb-3 block">
                          FAST & SECURE ESTIMATOR
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight font-medium text-glow-title">
                          Request a Smart Quote
                        </h2>
                        <p className="text-amber-400 mt-2 text-xs md:text-sm font-sans tracking-wide font-medium">
                          Takes under 60 seconds. Guaranteed precision pricing for your itinerary.
                        </p>
                        <p className="text-slate-300 mt-3 max-w-lg mx-auto text-sm font-light leading-relaxed">
                          Select your journey details below to receive a clear quote tailored to your group needs.
                        </p>
                      </div>

                      <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Interactive Step Selector */}
                        <div className="w-full bg-white/5 p-1.5 rounded-2xl flex items-center justify-between mb-8 relative border border-white/5 font-mono text-[10px] tracking-wider">
                          {[
                            { num: 1, label: "01 JOURNEY" },
                            { num: 2, label: "02 SEATING" },
                            { num: 3, label: "03 CONTACT" }
                          ].map((t) => {
                            const isActive = step === t.num;
                            return (
                              <button
                                key={t.num}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const newErrors: Record<string, string> = {};
                                  if (t.num > 1) {
                                    if (!formData.pickup) newErrors.pickup = "Please let us know your pickup point so we can map the route accurately.";
                                    if (!formData.destination) newErrors.destination = "Please let us know your destination point so we can map the route accurately.";
                                    if (!formData.date || !formData.time) newErrors.timing = "Please select your departure timing so we can verify fleet availability.";
                                    if (Object.keys(newErrors).length > 0) {
                                      setErrors(newErrors);
                                      setStep(1);
                                      return;
                                    }
                                  }
                                  if (t.num > 2) {
                                    if (!formData.passengers || Number(formData.passengers) <= 0) {
                                      newErrors.passengers = "Please enter passenger count so we can match the perfect vehicle class.";
                                      setErrors(newErrors);
                                      setStep(2);
                                      return;
                                    }
                                  }
                                  setErrors({});
                                  setStep(t.num);
                                }}
                                className={cn(
                                  "relative flex-1 py-3 text-center rounded-xl font-bold uppercase tracking-[0.15em] transition-colors duration-500 focus:outline-none z-10",
                                  isActive ? "text-slate-950" : "text-slate-400 hover:text-white cursor-pointer"
                                )}
                              >
                                {isActive && (
                                  <motion.div
                                    layoutId="activeStepPill"
                                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] z-[-1]"
                                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                  />
                                )}
                                <span className="relative z-10">{t.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-4">
                          <AnimatePresence mode="wait">
                            {step === 1 && (
                              <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                                  className="space-y-4"
                                >
                                  <span className="block text-[10px] tracking-[0.2em] font-bold text-amber-400 uppercase font-mono">
                                    Pickup & Destination Details
                                  </span>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {/* Capsule Block 1: Pickup */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative transition-all duration-300 flex flex-col justify-center",
                                      activeFocus === 'pickup' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)] z-20" : "border-slate-800 hover:border-slate-700 z-10"
                                    )}>
                                      <label htmlFor="pickup-autocomplete-stub" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Pickup Address</label>
                                      <input 
                                        id="pickup-autocomplete-stub"
                                        type="text" 
                                        placeholder="e.g., St Albans Base or London Hotel" 
                                        value={formData.pickup}
                                        onFocus={() => {
                                          setActiveFocus('pickup');
                                        }}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => {
                                          setFormData({...formData, pickup: e.target.value});
                                          setErrors(prev => {
                                            const copy = { ...prev };
                                            delete copy.pickup;
                                            return copy;
                                          });
                                        }}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1" 
                                        required
                                      />
                                      {/* Autocomplete Suggestions Stub for Pickup */}
                                      {activeFocus === 'pickup' && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden z-50 shadow-2xl backdrop-blur-md">
                                          <div className="p-2 border-b border-white/5 text-[8px] uppercase tracking-[0.15em] text-slate-500 font-bold font-mono">
                                            Suggested Locations
                                          </div>
                                          {PICKUP_SUGGESTIONS.map((item, idx) => (
                                            <button
                                              key={idx}
                                              type="button"
                                              onMouseDown={() => {
                                                setFormData(prev => ({ ...prev, pickup: item }));
                                                setErrors(prev => {
                                                  const copy = { ...prev };
                                                  delete copy.pickup;
                                                  return copy;
                                                });
                                              }}
                                              className="w-full text-left px-4 py-2.5 hover:bg-amber-500/10 hover:text-amber-400 text-xs text-slate-300 transition-colors font-sans border-b border-white/5 last:border-0"
                                            >
                                              {item}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                      {/* Focus Ambient Micro Glow */}
                                      <AnimatePresence>
                                        {activeFocus === 'pickup' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    {/* Capsule Block 2: Destination */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                      activeFocus === 'destination' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)] z-20" : "border-slate-800 hover:border-slate-700 z-10"
                                    )}>
                                      <label htmlFor="destination-autocomplete-stub" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Destination Address</label>
                                      <input 
                                        id="destination-autocomplete-stub"
                                        type="text" 
                                        placeholder="e.g., Heathrow Terminal 5 or Event Venue" 
                                        value={formData.destination}
                                        onFocus={() => {
                                          setActiveFocus('destination');
                                        }}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => {
                                          setFormData({...formData, destination: e.target.value});
                                          setErrors(prev => {
                                            const copy = { ...prev };
                                            delete copy.destination;
                                            return copy;
                                          });
                                        }}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1" 
                                        required
                                      />
                                      {/* Autocomplete Suggestions Stub for Destination */}
                                      {activeFocus === 'destination' && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden z-50 shadow-2xl backdrop-blur-md">
                                          <div className="p-2 border-b border-white/5 text-[8px] uppercase tracking-[0.15em] text-slate-500 font-bold font-mono">
                                            Suggested Locations
                                          </div>
                                          {DESTINATION_SUGGESTIONS.map((item, idx) => (
                                            <button
                                              key={idx}
                                              type="button"
                                              onMouseDown={() => {
                                                setFormData(prev => ({ ...prev, destination: item }));
                                                setErrors(prev => {
                                                  const copy = { ...prev };
                                                  delete copy.destination;
                                                  return copy;
                                                });
                                              }}
                                              className="w-full text-left px-4 py-2.5 hover:bg-amber-500/10 hover:text-amber-400 text-xs text-slate-300 transition-colors font-sans border-b border-white/5 last:border-0"
                                            >
                                              {item}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                      <AnimatePresence>
                                        {activeFocus === 'destination' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                </motion.div>

                                {/* Active Polite Notification Alerts */}
                                {(errors.pickup || errors.destination) && (
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {errors.pickup ? (
                                      <div className="text-xs text-red-400 font-sans font-medium flex items-start gap-2 bg-red-950/20 border border-red-500/15 rounded-xl p-3">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                                        <span>{errors.pickup}</span>
                                      </div>
                                    ) : <div />}
                                    {errors.destination ? (
                                      <div className="text-xs text-red-400 font-sans font-medium flex items-start gap-2 bg-red-950/20 border border-red-500/15 rounded-xl p-3">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                                        <span>{errors.destination}</span>
                                      </div>
                                    ) : <div />}
                                  </div>
                                )}

                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
                                  className="space-y-4"
                                >
                                  <span className="block text-[10px] tracking-[0.2em] font-bold text-amber-400 uppercase font-mono">
                                    Departure Timing Details
                                  </span>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {/* Capsule Block 3: Date */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                      activeFocus === 'date' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                    )}>
                                      <label htmlFor="departure-date-input" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Departure Date</label>
                                      <input 
                                        id="departure-date-input"
                                        type="date" 
                                        value={formData.date}
                                        onFocus={() => setActiveFocus('date')}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => {
                                          setFormData({...formData, date: e.target.value});
                                          setErrors(prev => {
                                            const copy = { ...prev };
                                            delete copy.timing;
                                            return copy;
                                          });
                                        }}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1 scheme-dark cursor-pointer" 
                                        required
                                      />
                                      <AnimatePresence>
                                        {activeFocus === 'date' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    {/* Capsule Block 4: Time */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                      activeFocus === 'time' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                    )}>
                                      <label htmlFor="departure-time-input" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Departure Time</label>
                                      <input 
                                        id="departure-time-input"
                                        type="time" 
                                        value={formData.time}
                                        onFocus={() => setActiveFocus('time')}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => {
                                          setFormData({...formData, time: e.target.value});
                                          setErrors(prev => {
                                            const copy = { ...prev };
                                            delete copy.timing;
                                            return copy;
                                          });
                                        }}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1 scheme-dark cursor-pointer" 
                                        required
                                      />
                                      <AnimatePresence>
                                        {activeFocus === 'time' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                </motion.div>

                                {errors.timing && (
                                  <div className="bg-red-500/10 border border-red-500/15 rounded-2xl p-4 text-xs text-red-300 font-sans font-medium flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                                    <span>{errors.timing}</span>
                                  </div>
                                )}

                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
                                  className="pt-6 flex flex-col items-end gap-2"
                                >
                                  <button 
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-[size:200%_auto] text-slate-950 font-bold tracking-[0.2em] text-xs uppercase py-4 px-10 rounded-2xl shadow-[0_20px_40px_rgba(245,158,11,0.25)] transition-all duration-500 hover:bg-right hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(245,158,11,0.45)] active:scale-[0.98] flex items-center justify-center space-x-3 cursor-pointer btn-premium-sheen"
                                  >
                                    <span>Next: Capacity</span>
                                    <ArrowRight className="w-4 h-4 shrink-0" />
                                  </button>
                                  <p className="text-[10px] text-slate-400 font-sans tracking-wide">
                                    Your details are strictly secure and never sold to third-party brokers.
                                  </p>
                                </motion.div>
                              </motion.div>
                            )}

                            {step === 2 && (
                              <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                                  className="space-y-4"
                                >
                                  <span className="block text-[10px] tracking-[0.2em] font-bold text-amber-400 uppercase font-mono">
                                    Group Volume & Journey Profile
                                  </span>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    {/* Capsule Block 5: Passengers */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                      activeFocus === 'passengers' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                    )}>
                                      <label htmlFor="passenger-count-input" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Passenger Count</label>
                                      <input 
                                        id="passenger-count-input"
                                        type="number" 
                                        placeholder="Number of Passengers" 
                                        value={formData.passengers}
                                        onFocus={() => setActiveFocus('passengers')}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => {
                                          setFormData({...formData, passengers: e.target.value});
                                          setErrors(prev => {
                                            const copy = { ...prev };
                                            delete copy.passengers;
                                            return copy;
                                          });
                                        }}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1" 
                                        min="1"
                                        required
                                      />
                                      <AnimatePresence>
                                        {activeFocus === 'passengers' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    {/* Capsule Block 6: Profile */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center relative",
                                      activeFocus === 'journeyType' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                    )}>
                                      <label htmlFor="journey-type-selector" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Journey Profile</label>
                                      <select 
                                        id="journey-type-selector"
                                        value={formData.journeyType}
                                        onFocus={() => setActiveFocus('journeyType')}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => setFormData({...formData, journeyType: e.target.value})}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1 appearance-none cursor-pointer pr-10"
                                      >
                                        <option value="Corporate Logistics" className="bg-slate-950 text-white">Corporate Logistics</option>
                                        <option value="Staff Transport" className="bg-slate-950 text-white">Staff Transport</option>
                                        <option value="Private Event" className="bg-slate-950 text-white">Private Event</option>
                                        <option value="Airport Transfer" className="bg-slate-950 text-white">Airport Transfer</option>
                                        <option value="Sports/Music Event" className="bg-slate-950 text-white">Sports/Music Event</option>
                                      </select>
                                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <ChevronRight className="w-4 h-4 text-amber-500 rotate-90" />
                                      </div>
                                      <AnimatePresence>
                                        {activeFocus === 'journeyType' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                </motion.div>

                                {errors.passengers && (
                                  <div className="bg-red-500/10 border border-red-500/15 rounded-2xl p-4 text-xs text-red-300 font-sans font-medium flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                                    <span>{errors.passengers}</span>
                                  </div>
                                )}

                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
                                  className="border border-white/5 bg-white/5 rounded-2xl p-5"
                                >
                                  <p className="text-xs text-slate-400 font-sans italic leading-relaxed">
                                    * Operational Note: All vehicles and logistics are run un-signwritten and completely de-branded to maintain the highest levels of corporate and private guest client discretion.
                                  </p>
                                </motion.div>

                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
                                  className="pt-6 flex justify-between items-center gap-4"
                                >
                                  <button 
                                    type="button"
                                    onClick={handleBack}
                                    className="text-slate-400 hover:text-white font-sans text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                                  >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-[size:200%_auto] text-slate-950 font-bold tracking-[0.2em] text-xs uppercase py-4 px-10 rounded-2xl shadow-[0_20px_40px_rgba(245,158,11,0.25)] transition-all duration-500 hover:bg-right hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(245,158,11,0.45)] active:scale-[0.98] flex items-center justify-center space-x-3 cursor-pointer btn-premium-sheen"
                                  >
                                    <span>Next: Contact</span>
                                    <ArrowRight className="w-4 h-4 shrink-0" />
                                  </button>
                                </motion.div>
                              </motion.div>
                            )}

                            {step === 3 && (
                              <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                              >
                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                                  className="space-y-4"
                                >
                                  <span className="block text-[10px] tracking-[0.2em] font-bold text-amber-400 uppercase font-mono">
                                    Your Contact Details
                                  </span>
                                  <div className="space-y-4">
                                    {/* Capsule Block 7: Full Name */}
                                    <div className={cn(
                                      "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                      activeFocus === 'name' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                    )}>
                                      <label htmlFor="customer-name-input" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Full Name</label>
                                      <input 
                                        id="customer-name-input"
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={formData.name}
                                        onFocus={() => setActiveFocus('name')}
                                        onBlur={() => setActiveFocus(null)}
                                        onChange={(e) => {
                                          setFormData({...formData, name: e.target.value});
                                          setErrors(prev => {
                                            const copy = { ...prev };
                                            delete copy.contact;
                                            return copy;
                                          });
                                        }}
                                        className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1" 
                                        required
                                      />
                                      <AnimatePresence>
                                        {activeFocus === 'name' && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                          />
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                      {/* Capsule Block 8: Email */}
                                      <div className={cn(
                                        "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                        activeFocus === 'email' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                      )}>
                                        <label htmlFor="customer-email-input" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Email Address</label>
                                        <input 
                                          id="customer-email-input"
                                          type="email" 
                                          placeholder="Email Address" 
                                          value={formData.email}
                                          onFocus={() => setActiveFocus('email')}
                                          onBlur={() => setActiveFocus(null)}
                                          onChange={(e) => {
                                            setFormData({...formData, email: e.target.value});
                                            setErrors(prev => {
                                              const copy = { ...prev };
                                              delete copy.contact;
                                              return copy;
                                            });
                                          }}
                                          className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1" 
                                          required
                                        />
                                        <AnimatePresence>
                                          {activeFocus === 'email' && (
                                            <motion.div 
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              exit={{ opacity: 0 }}
                                              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                            />
                                          )}
                                        </AnimatePresence>
                                      </div>

                                      {/* Capsule Block 9: Phone */}
                                      <div className={cn(
                                        "bg-black/50 border rounded-2xl p-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-center",
                                        activeFocus === 'phone' ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]" : "border-slate-800 hover:border-slate-700"
                                      )}>
                                        <label htmlFor="customer-phone-input" className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 mb-1 font-mono">Direct Mobile Number</label>
                                        <input 
                                          id="customer-phone-input"
                                          type="tel" 
                                          placeholder="Direct Mobile Number" 
                                          value={formData.phone}
                                          onFocus={() => setActiveFocus('phone')}
                                          onBlur={() => setActiveFocus(null)}
                                          onChange={(e) => {
                                            setFormData({...formData, phone: e.target.value});
                                            setErrors(prev => {
                                              const copy = { ...prev };
                                              delete copy.contact;
                                              return copy;
                                            });
                                          }}
                                          className="text-white font-medium text-sm w-full bg-transparent border-none outline-none focus:ring-0 py-1" 
                                          required
                                        />
                                        <AnimatePresence>
                                          {activeFocus === 'phone' && (
                                            <motion.div 
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              exit={{ opacity: 0 }}
                                              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.08),transparent_60%)]"
                                            />
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>

                                {errors.contact && (
                                  <div className="bg-red-500/10 border border-red-500/15 rounded-2xl p-4 text-xs text-red-300 font-sans font-medium flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                                    <span>{errors.contact}</span>
                                  </div>
                                )}

                                {submitError && (
                                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-xs text-red-300 font-sans font-medium flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-1" />
                                    <span>
                                      {submitError}{' '}
                                      <a href="tel:08458333456" className="underline font-bold text-red-200 hover:text-white whitespace-nowrap">Call 0845 8333 456</a>
                                    </span>
                                  </div>
                                )}

                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
                                  className="border-l-4 border-amber-500 bg-amber-500/5 p-4 rounded-r-xl"
                                >
                                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                    <strong>Straight to the owners</strong>: your request is emailed directly to Alan and Sasha's own team — no call centres, no brokers, no middlemen.
                                  </p>
                                </motion.div>

                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
                                  className="pt-4 flex justify-between items-center gap-4"
                                >
                                  <button 
                                    type="button"
                                    onClick={handleBack}
                                    className="text-slate-400 hover:text-white font-sans text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                                  >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={isSending}
                                    className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-[size:200%_auto] text-slate-950 font-bold tracking-[0.2em] text-xs uppercase py-4 px-10 rounded-2xl shadow-[0_20px_40px_rgba(245,158,11,0.25)] transition-all duration-500 hover:bg-right hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(245,158,11,0.45)] active:scale-[0.98] flex items-center justify-center space-x-3 cursor-pointer btn-premium-sheen disabled:opacity-60 disabled:cursor-wait"
                                  >
                                    <span>{isSending ? 'Sending…' : 'Send My Quote Request'}</span>
                                    <CheckCircle2 className={cn("w-4 h-4 shrink-0", isSending && "animate-spin")} />
                                  </button>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    /* GORGEOUS TACTICAL SUCCESS HUB */
                    <motion.div
                      key="success-mode"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 rounded-full border border-amber-500/20 bg-amber-500/10 flex items-center justify-center mx-auto mb-8 animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        <CheckCircle2 className="w-10 h-10 text-amber-500" />
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-400 mb-2 block">
                        THANK YOU FOR YOUR REQUEST
                      </span>
                      <h3 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight font-medium">
                        Quote Request Received
                      </h3>
                      <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed font-light mb-10">
                        Our family team has received your details, and we are working on your custom quote now. A member of our team will contact you shortly to confirm the details.
                      </p>

                      {/* Selected Journey Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10 text-left">
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                          <span className="block text-[8px] tracking-[0.2em] font-semibold text-slate-500 uppercase mb-1">Pickup Location</span>
                          <p className="text-slate-200 text-xs font-semibold truncate">{formData.pickup}</p>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                          <span className="block text-[8px] tracking-[0.2em] font-semibold text-slate-500 uppercase mb-1">Destination</span>
                          <p className="text-slate-200 text-xs font-semibold truncate">{formData.destination}</p>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                          <span className="block text-[8px] tracking-[0.2em] font-semibold text-slate-500 uppercase mb-1">Departure timing</span>
                          <p className="text-slate-200 text-xs font-semibold truncate">{formData.date} &bull; {formData.time}</p>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                          <span className="block text-[8px] tracking-[0.2em] font-semibold text-slate-500 uppercase mb-1">Group Size</span>
                          <p className="text-slate-200 text-xs font-semibold truncate">{formData.passengers} pax &bull; {formData.journeyType}</p>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button 
                          onClick={() => {
                            setIsSubmitted(false);
                            setStep(1);
                            setFormData({
                              pickup: "",
                              destination: "",
                              date: "",
                              time: "",
                              passengers: "",
                              journeyType: "Corporate Logistics",
                              name: "",
                              email: "",
                              phone: ""
                            });
                          }}
                          className="bg-zinc-900 border border-white/10 hover:border-amber-500/50 hover:bg-zinc-800 text-white font-sans text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-xl transition-all duration-300 cursor-pointer"
                        >
                          Submit Another Route
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Client roster ticker — names confirmed as genuine past/present accounts of
 * the business by the owners. Tooltip text describes the work delivered.
 */
const ELITE_TRACK_1 = [
  { name: "Amazon", pedigree: "Corporate Staff Logistics", styleClass: "font-sans font-black tracking-widest uppercase text-base md:text-xl" },
  { name: "Royal Mail", pedigree: "Peak Period Fleet Support", styleClass: "font-serif font-extrabold tracking-wider uppercase text-base md:text-xl" },
  { name: "BP", pedigree: "Energy Sector Transport", styleClass: "font-sans font-extrabold tracking-wider uppercase text-lg md:text-2xl" },
  { name: "DHL", pedigree: "Nationwide Relay Logistics", styleClass: "font-serif italic font-black tracking-wide text-lg md:text-2xl" },
  { name: "Yodel", pedigree: "Distribution Hub Transfers", styleClass: "font-mono font-bold tracking-normal uppercase text-base md:text-xl" },
  { name: "Serco", pedigree: "Government and Public Sector", styleClass: "font-serif font-light tracking-[0.25em] uppercase text-sm md:text-lg" },
  { name: "Primark", pedigree: "Retail Staff Shuttles", styleClass: "font-sans tracking-[0.15em] font-light uppercase text-base md:text-xl" },
];

const ELITE_TRACK_2 = [
  { name: "Barclays Bank", pedigree: "Executive Roadshows", styleClass: "font-serif font-bold tracking-tight uppercase text-base md:text-xl" },
  { name: "Arsenal FC", pedigree: "VIP Team and Family Transport", styleClass: "font-sans font-semibold tracking-[0.25em] uppercase text-base md:text-lg" },
  { name: "The Royal Wedding", pedigree: "Elite Discreet Transport", styleClass: "font-serif italic font-light tracking-wide text-base md:text-xl" },
  { name: "Glastonbury Festival", pedigree: "Artist and VIP Transfers", styleClass: "font-serif tracking-[0.3em] font-medium uppercase text-sm md:text-lg" },
];

/**
 * Written references received by the business (verbatim, lightly trimmed) —
 * from the long-standing Testimonials page. Shown as spotlight cards beneath
 * the client ticker.
 */
const TESTIMONIAL_SPOTLIGHTS = [
  {
    quote: "The only company we have ever used that ensures our staff are on time every day. There is nothing they will not do to help.",
    name: "Dan Mankelow, CEO",
    context: "First Call Contract Services — staff transport for 10+ years",
  },
  {
    quote: "UGO is the only company I work with — my reputation is my business, and these guys work to the same ethics as myself.",
    name: "Darren Nash",
    context: "Falcon Coaches — North London operator",
  },
  {
    quote: "They have allowed us to take our puppies on their buses for 12 years and not once been late or let us down.",
    name: "Wood Green Animal Shelter",
    context: "Guide dog training school — 12-year client",
  },
];

function ElitePedigree() {
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    setTooltip({ visible: true, text, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <section 
      ref={sectionRef} 
      className={cn(
        "bg-[#F9F9FB] py-20 md:py-24 border-y border-slate-200/80 overflow-hidden relative font-sans elite-pedigree-section",
        isVisible && "is-visible"
      )}
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-slow-left {
          animation: marquee-left 90s linear infinite;
        }
        .animate-marquee-slow-right {
          animation: marquee-right 90s linear infinite;
        }
        .marq-container:hover .animate-marquee-slow-left,
        .marq-container:hover .animate-marquee-slow-right {
          animation-play-state: paused;
        }

        /* 1. Define the Elite Viewport Entrance (On-Scroll) */
        @keyframes eliteLogoWave {
          0% { opacity: 0; transform: translate3d(0, 35px, 0) scale(0.97); filter: blur(3px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0px); }
        }

        /* 2. Automate the Staggered Wave Delays */
        .elite-pedigree-section span {
          opacity: 0;
          transform: translate3d(0, 35px, 0) scale(0.97);
          filter: blur(3px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-in-out, filter 0.4s ease-in-out !important;
          will-change: transform, opacity !important;
        }

        .elite-pedigree-section.is-visible span {
          animation: eliteLogoWave 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
        }

        /* Staggered wave delays */
        .elite-pedigree-section.is-visible span:nth-child(1),
        .elite-pedigree-section.is-visible span:nth-child(2),
        .elite-pedigree-section.is-visible span:nth-child(3) {
          animation-delay: 0s !important;
        }
        .elite-pedigree-section.is-visible span:nth-child(4),
        .elite-pedigree-section.is-visible span:nth-child(5),
        .elite-pedigree-section.is-visible span:nth-child(6) {
          animation-delay: 0.1s !important;
        }
        .elite-pedigree-section.is-visible span:nth-child(7),
        .elite-pedigree-section.is-visible span:nth-child(8),
        .elite-pedigree-section.is-visible span:nth-child(9) {
          animation-delay: 0.2s !important;
        }
        .elite-pedigree-section.is-visible span:nth-child(n+10) {
          animation-delay: 0.3s !important;
        }

        /* 3. Implement the Premium "Focus Mask" Hover System */
        .marq-container:hover span {
          animation: none !important;
          opacity: 0.35 !important;
          transform: translate3d(0, 0, 0) scale(1) !important;
          filter: blur(0px) !important;
        }

        .marq-container span:hover {
          opacity: 1 !important;
          transform: translate3d(0, 0, 0) scale3d(1.06, 1.06, 1) !important;
        }

        /* 4. Title Accent Subtlety */
        .elite-pedigree-section h4 {
          opacity: 0;
          transform: translate3d(0, 15px, 0);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-in-out;
        }
        .elite-pedigree-section.is-visible h4 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      `}</style>
      
      {/* Tooltip */}
      <div 
        className={cn(
          "fixed z-50 bg-slate-900/95 text-stone-50 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-md shadow-2xl rounded-sm pointer-events-none transition-opacity duration-200 border border-slate-700",
          tooltip.visible ? "opacity-100" : "opacity-0"
        )}
        style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
      >
        {tooltip.text}
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center select-none">
        <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-slate-800 leading-relaxed font-sans max-w-4xl mx-auto">
          TRUSTED BY LEADING BUSINESSES, LOCAL COUNCILS, SCHOOLS AND FAMILIES FOR OVER 15 YEARS
        </h4>
        <p className="mt-3 text-[11px] text-slate-500 font-sans tracking-wide">
          A selection of accounts our family team has proudly served — hover any name to see the work.
        </p>
      </div>

      <div className="flex flex-col gap-10 md:gap-14 marq-container relative">
        {/* Soft linear gradient fade masks to the left and right edges */}
        <div className="absolute inset-y-0 left-0 w-28 md:w-64 bg-gradient-to-r from-[#F9F9FB] via-[#F9F9FB]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 md:w-64 bg-gradient-to-l from-[#F9F9FB] via-[#F9F9FB]/70 to-transparent z-10 pointer-events-none" />

        {/* Track 1 (Left) */}
        <div className="w-full overflow-hidden relative">
          <div className="flex w-max animate-marquee-slow-left">
            {[...ELITE_TRACK_1, ...ELITE_TRACK_1].map((client, idx) => (
              <span
                key={`t1-${idx}`}
                className={cn(
                  "inline-block mx-10 md:mx-16 text-[#0f2142]/35 hover:text-[#0f2142]/80 transition-all duration-300 transform hover:scale-105 cursor-crosshair select-none whitespace-nowrap",
                  client.styleClass
                )}
                onMouseEnter={(e) => handleMouseEnter(e, client.pedigree)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>

        {/* Track 2 (Right) */}
        <div className="w-full overflow-hidden relative">
          <div className="flex w-max animate-marquee-slow-right">
            {[...ELITE_TRACK_2, ...ELITE_TRACK_2].map((client, idx) => (
              <span
                key={`t2-${idx}`}
                className={cn(
                  "inline-block mx-10 md:mx-16 text-[#0f2142]/35 hover:text-[#0f2142]/80 transition-all duration-300 transform hover:scale-105 cursor-crosshair select-none whitespace-nowrap",
                  client.styleClass
                )}
                onMouseEnter={(e) => handleMouseEnter(e, client.pedigree)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Written references — spotlight cards (real quotes from the business's reference file) */}
      <div className="max-w-6xl mx-auto px-6 mt-16 md:mt-20 grid md:grid-cols-3 gap-6">
        {TESTIMONIAL_SPOTLIGHTS.map((t) => (
          <figure key={t.name} className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm flex flex-col justify-between">
            <blockquote className="font-serif italic text-slate-800 text-[15px] leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-slate-100">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-slate-900">{t.name}</p>
              <p className="font-sans text-[11px] text-slate-500 mt-0.5">{t.context}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function LiveAIConciergeHub() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showHumanContact, setShowHumanContact] = useState<boolean>(false);
  
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user'|'bot', text: string}>>([
    {
      role: 'bot', 
      text: "Welcome to UGO. I am your transport booking assistant. Tell me about your journey, passenger numbers, and timings so I can recommend the perfect executive coach or minibus for you."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + 
        ' ' + (now.getTimezoneOffset() === 0 ? 'UTC' : 'LOCAL')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const forwardedCountRef = useRef(0);
  const [leadDelivered, setLeadDelivered] = useState(false);

  /** Once the customer has shared a phone number or email, email the transcript to the team. */
  const maybeForwardLead = async (all: Array<{role: 'user'|'bot', text: string}>) => {
    const hasContact = all.some(m => m.role === 'user' && containsContactDetails(m.text));
    if (!hasContact || all.length <= forwardedCountRef.current) return;
    forwardedCountRef.current = all.length;
    const result = await sendLead({ type: 'concierge', transcript: all });
    if (result.ok) {
      setLeadDelivered(true);
    } else {
      setMessages(prev => [...prev, { role: 'bot', text: "I couldn't reach our booking system just now — to make sure you're looked after, please call the family team directly on 0845 8333 456 (out of hours: 07833 226 623)." }]);
    }
  };

  const processResponse = async (chatHistory: Array<{role: 'user'|'bot', text: string}>) => {
    setIsTyping(true);
    const reply = await fetchChatReply(chatHistory);
    setIsTyping(false);
    const text = reply?.text || "Apologies, I'm having a temporary technical issue. Please call our family team directly on 0845 8333 456 for immediate assistance.";
    const withReply = [...chatHistory, { role: 'bot' as const, text }];
    setMessages(withReply);
    void maybeForwardLead(withReply);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userText = inputValue;
    setInputValue('');
    
    const updatedMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(updatedMessages);
    
    processResponse(updatedMessages);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleChipClick = (keyword: string, label: string) => {
    if (isTyping) return;
    const userText = `I am interested in ${label}`;
    const updatedMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(updatedMessages);
    processResponse(updatedMessages);
  };

  return (
    <section className="bg-[#F9F9FB] py-24 border-t border-slate-200 font-sans relative overflow-hidden">
      {/* Decorative subtle ambient warm glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 items-stretch">
        
        {/* Left Column: Human Accountability Core */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <div className="flex items-center gap-6 mb-8">
            {/* Clock & Status */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-sm shadow-sm">
              <span className="font-mono text-amber-600 text-sm tracking-wider">{currentTime || '00:00:00'}</span>
              <div className="w-px h-4 bg-slate-200 mx-1" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                <span className="font-sans font-medium text-slate-705 text-[10px] tracking-widest uppercase mt-0.5">Direct Line: Active</span>
              </div>
            </div>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight mb-8">
            Human Accountability,<br />24/7.
          </h2>
          
          <p className="font-sans text-slate-700 font-light text-base md:text-lg leading-relaxed mb-10">
            UGO is a completely family-run logistics company. We bypass automated call centres entirely, giving our corporate and institutional clients direct mobile access to our management team, available twenty-four hours a day, every day of the year.
          </p>
          
          <ul className="space-y-6 border-l border-slate-250 pl-6">
            <li className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
              <h4 className="font-sans text-slate-900 font-bold uppercase tracking-[0.1em] text-xs mb-1">Live Itinerary Mapping</h4>
              <p className="font-sans text-slate-650 font-light text-sm">Select your sector profile or input your parameters to instantly generate a clean structural routing framework.</p>
            </li>
            <li className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
              <h4 className="font-sans text-slate-900 font-bold uppercase tracking-[0.1em] text-xs mb-1">Immediate Account Escort</h4>
              <p className="font-sans text-slate-650 font-light text-sm">Skip the automated phone queues. Click 'Reveal Direct Lines' at any point for an un-brokered connection straight to our family base.</p>
            </li>
          </ul>
        </div>
        
        {/* Right Column: The Luxury AI Travel Concierge */}
        <div className="w-full lg:w-[55%]" id="ugo-chat-container">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 relative flex flex-col justify-between min-h-[550px] lg:h-[600px] shadow-sm overflow-hidden">
            
            {/* The Human Operator Standby Banner */}
            <div className="mb-4 flex flex-col gap-3 z-20 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-700">
                     Human Operator: Standby
                   </span>
                 </div>
                 <button 
                   onClick={() => setShowHumanContact(!showHumanContact)}
                   className="text-[10px] uppercase font-bold tracking-widest bg-white border border-slate-200 hover:bg-slate-50 text-slate-850 py-2 px-4 rounded-md transition-colors"
                 >
                   Reveal Direct Lines
                 </button>
              </div>
              
              {/* Expandable Human Contact Card */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showHumanContact ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-slate-800 font-light font-sans">
                  <span className="block text-amber-700 font-medium mb-1">
                    Office: <a href="tel:08458333456" className="hover:underline">0845 8333 456</a> · Out-of-hours: <a href="tel:07833226623" className="hover:underline">07833 226 623</a>
                  </span>
                  Call any time — evenings, weekends and bank holidays included — for direct, human coordination of your journey.
                </div>
              </div>
            </div>

            {leadDelivered && (
              <div className="mb-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center gap-2 z-20 relative">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-sans text-xs text-emerald-800">Your details have been emailed to Alan &amp; Sasha's team — they'll be in touch with your quote.</span>
              </div>
            )}

            {/* The Interactive Chat Window */}
            <div id="chat-history-log" className="flex-1 flex flex-col gap-6 overflow-y-auto mb-4 pr-2 custom-scrollbar z-10 relative scroll-smooth">
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  {msg.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 7.1"></path><path d="m12 12 9.9 4.9"></path></svg>
                    </div>
                  )}
                  <div className={`${
                    msg.role === 'user' 
                      ? 'bg-amber-500/10 border border-amber-500/20 rounded-2xl rounded-tr-sm text-slate-900' 
                      : 'bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm text-slate-800'
                    } p-4 text-sm font-light leading-relaxed max-w-[85%] shadow-sm`}
                  >
                    {msg.role === 'bot' ? (
                      msg.text.split(/(Passenger Count.*?Tim(?:es|ings|ing parameters))/i).map((part, i) => 
                        /(Passenger Count.*?Tim(?:es|ings|ing parameters))/i.test(part) ? <span key={i} className="text-amber-600 font-medium">{part}</span> : part
                      )
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
 
              {isTyping && (
                <div className="flex items-start gap-4 animate-in fade-in duration-300">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 7.1"></path><path d="m12 12 9.9 4.9"></path></svg>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-800 font-light flex items-center gap-2 max-w-[85%] shadow-sm">
                    <span className="text-slate-500 italic text-xs mr-2 font-sans">Assistant is compiling itinerary</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                </div>
              )}
 
              <div ref={chatEndRef} />
            </div>
 
            {/* Quick Action Chips */}
            <div className="flex flex-wrap gap-2 pl-0 sm:pl-12 mb-4 z-10 shrink-0">
              {[
                { keyword: 'school', label: 'School Contract' },
                { keyword: 'corporate', label: 'Corporate Shuttle' },
                { keyword: 'production', label: 'Media Production' },
                { keyword: 'ascot', label: 'Private Event' }
              ].map(chip => (
                <button
                  key={chip.keyword}
                  onClick={() => handleChipClick(chip.keyword, chip.label)}
                  disabled={isTyping}
                  className="font-sans text-[11px] md:text-xs px-3 py-2 rounded-full border border-slate-205 bg-slate-50 text-slate-600 transition-all duration-300 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {chip.label}
                </button>
              ))}
            </div>
 
            {/* The Simulated Chat Input Zone */}
            <div className="mt-auto relative z-10 w-full pt-2 border-t border-slate-100 font-sans">
              <div className="flex items-center bg-slate-50 border border-slate-250 rounded-full pr-2 pl-5 py-2 hover:border-slate-300 transition-colors focus-within:border-amber-600/50 focus-within:bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                 <input 
                   id="chat-user-input"
                   type="text" 
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={handleKeyDown}
                   disabled={isTyping}
                   placeholder="Describe your journey requirements here..." 
                   className="bg-transparent flex-1 outline-none text-sm text-slate-800 placeholder:text-slate-400 font-light disabled:opacity-50"
                 />
                 <button 
                   id="chat-send-btn"
                   onClick={handleSend}
                   disabled={!inputValue.trim() || isTyping}
                   className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700 hover:bg-amber-500/20 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                 </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumFooterSection({ onNavigate }: { onNavigate?: (page: PageType) => void }) {
  return (
    <footer className="bg-slate-950 border-t border-white/5 text-slate-300 font-sans relative overflow-hidden text-left" id="global-footer">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-8 pt-20 pb-12">
        {/* Column 1: Left Editorial Block & Micro-Tags (Width: lg:col-span-3) */}
        <div className="lg:col-span-3" id="footer-editorial-block">
          <h3 className="text-xl font-medium text-amber-500 tracking-wide mb-4 font-serif" id="footer-brand-heading">
            We go where UGO.
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-light" id="footer-editorial-text">
            UGO delivers premium, unbranded ground logistics and high-capacity fleet deployment across the UK. From corporate staff shuttles and airport terminal movements to complex multi-vehicle event transit frameworks, we back every route with 24/7 human dispatch control and absolute compliance.
          </p>
          <div className="mt-6 flex flex-col space-y-2 text-[10px] font-mono font-bold tracking-wider text-slate-400" id="footer-micro-tags">
            <span className="block" id="footer-tag-dvsa">• DVSA REGISTERED OPERATOR</span>
            <span className="block" id="footer-tag-dbs">• ALL DRIVERS ENHANCED DBS VETTED</span>
          </div>
        </div>

        {/* Column 2: Reconciled Services (Width: lg:col-span-3) */}
        <div className="lg:col-span-3" id="footer-services-column">
          <h4 className="text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-6 font-mono font-black" id="footer-services-heading">
            SERVICES
          </h4>
          <ul className="space-y-1" id="footer-services-list">
            <li>
              <a 
                href="/corporate-accounts" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('corporate'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-corporate-frameworks"
              >
                Corporate Frameworks
              </a>
            </li>
            <li>
              <a 
                href="/workplace-shuttles" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('workplace-shuttles'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-workplace-shuttles"
              >
                Workplace Shuttles
              </a>
            </li>
            <li>
              <a 
                href="/private-luxury" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('private-luxury'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-private-luxury"
              >
                Private Luxury Hire
              </a>
            </li>
            <li>
              <a 
                href="/strategic-event-logistics" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('strategic-event-logistics'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-strategic-event-logistics"
              >
                Strategic Event Logistics
              </a>
            </li>
            <li>
              <a 
                href="/film-tv-logistics" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('film-tv-logistics'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-film-tv-logistics"
              >
                Film &amp; TV Logistics
              </a>
            </li>
            <li>
              <a 
                href="/mass-transit-shuttles" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('mass-transit-shuttles'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-mass-transit-shuttles"
              >
                Mass Transit Shuttles
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Reconciled Regional Networks (Width: lg:col-span-2) */}
        <div className="lg:col-span-2" id="footer-locations-column">
          <h4 className="text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-6 font-mono font-black" id="footer-locations-heading">
            REGIONAL NETWORKS
          </h4>
          <ul className="space-y-1" id="footer-locations-list">
            <li>
              <a 
                href="/locations/greater-london" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('greater-london'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-greater-london"
              >
                Greater London Coverage
              </a>
            </li>
            <li>
              <a 
                href="/locations/st-albans" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('st-albans'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-st-albans"
              >
                St Albans Operational Base
              </a>
            </li>
            <li>
              <a 
                href="/locations/watford" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('watford'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-watford"
              >
                Watford &amp; Elstree Hub
              </a>
            </li>
            <li>
              <a 
                href="/locations/hemel-hempstead" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('hemel'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-hemel-hempstead"
              >
                Hemel Hempstead Core
              </a>
            </li>
            <li>
              <a 
                href="/locations/luton" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('luton'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-luton"
              >
                Luton &amp; Regional Access
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Reconciled Company & Insights Core (Width: lg:col-span-2) */}
        <div className="lg:col-span-2" id="footer-company-column">
          <h4 className="text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-6 font-mono font-black" id="footer-company-heading">
            COMPANY
          </h4>
          <ul className="space-y-1" id="footer-company-list">
            <li>
              <a 
                href="/about" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('about'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-about"
              >
                About Our Brand
              </a>
            </li>
            <li>
              <a 
                href="/blog" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('blog'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-blog"
              >
                Transport Logistics Blog
              </a>
            </li>
            <li>
              <a 
                href="/csr" 
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('csr'); }}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1.5"
                id="footer-link-csr"
              >
                Corporate Responsibility
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Operational Coordinates & Access (Width: lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-6" id="footer-contact-column">
          <h4 className="text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-6 font-mono font-black" id="footer-contact-heading">
            CONTACTS &amp; CONNECT
          </h4>
          <div className="space-y-4" id="footer-contact-details">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a 
                href="tel:08458333456" 
                className="text-sm font-bold text-white hover:text-amber-400 transition-colors duration-200 tracking-[0.05em]"
                id="footer-phone"
              >
                0845 8333 456
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a 
                href="mailto:sasha@coaches.business" 
                className="text-xs text-slate-300 hover:text-amber-400 transition-colors duration-200"
                id="footer-email"
              >
                sasha@coaches.business
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a
                href="tel:07833226623"
                className="text-xs text-slate-300 hover:text-amber-400 transition-colors duration-200"
                id="footer-mobile"
              >
                Out-of-hours: 07833 226 623
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
              <p className="text-xs text-slate-300 leading-relaxed font-light" id="footer-address">
                Wellington House,<br />
                273-275 High Street, London Colney,<br />
                St Albans, Herts. AL2 1HA
              </p>
            </div>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed" id="footer-hours">
              Office hours 08:00–18:00, with our out-of-hours line covering evenings, weekends and bank holidays.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 space-y-4" id="footer-social-section">
            <div className="font-sans text-[9px] uppercase text-amber-500 tracking-[0.18em] font-bold" id="footer-branch-label">
              ST ALBANS OPERATIONS BASE • FAMILY OFFICE
            </div>
          </div>
        </div>
      </div>

      {/* The Absolute Base Bar & Compliance Validation */}
      <div className="max-w-7xl mx-auto px-8 pb-12" id="footer-bottom-bar">
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col lg:flex-row justify-between items-center text-[11px] text-slate-500 tracking-wider gap-4">
          <span className="text-center lg:text-left font-light" id="footer-copyright">
            &copy; {new Date().getFullYear()} UGO Coach &amp; Minibus Hire. UGO is a trading name of Pullman Direct Ltd.<br className="hidden lg:block" />
            <span className="text-slate-600"> Registered office: Wellington House, 273-275 High Street, London Colney, St Albans AL2 1HA.</span>
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 font-semibold" id="footer-legal-links">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('privacy'); }} className="hover:text-amber-500 transition-colors" id="footer-privacy-policy">PRIVACY POLICY</a>
            <span className="hidden sm:inline text-white/10">•</span>
            <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('terms'); }} className="hover:text-amber-500 transition-colors" id="footer-terms-of-service">TERMS OF HIRE</a>
            <span className="hidden sm:inline text-white/10">•</span>
            <a href="/compliance" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('compliance'); }} className="hover:text-amber-500 transition-colors" id="footer-fleet-compliance">FLEET COMPLIANCE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BespokeJourneyRunway({ onNavigate }: { onNavigate?: (page: PageType) => void }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const hubs = [
    {
      num: "01",
      title: "Greater London",
      detail: "Navigating tight central corridors for multi-coach corporate roadshows with absolute timing precision.",
      page: 'greater-london' as const,
      path: '/locations/greater-london',
      ctaText: "Explore Greater London Services"
    },
    {
      num: "02",
      title: "The Home Counties",
      detail: "Coordinating seamless guest and delegate arrivals through regional business parks and historic private estates.",
      page: 'home-counties' as const,
      path: '/locations/home-counties',
      ctaText: "Explore Home Counties Coverage"
    },
    {
      num: "03",
      title: "UK Airport Hubs",
      detail: "Synchronizing VIP ground transport across Heathrow, Gatwick, and private aviation terminals with unbranded discretion.",
      page: 'airport-hubs' as const,
      path: '/locations/airport-hubs',
      ctaText: "View Airport Connections"
    },
    {
      num: "04",
      title: "Nationwide Film & Events",
      detail: "Tracking and managing long-distance fleet routing for remote TV production crews and major festivals.",
      page: 'film-and-events' as const,
      path: '/locations/film-and-events',
      ctaText: "View Film & Event Logistics"
    }
  ];

  const paths = [
    "M 45 52 C 240 52, 440 130, 650 210",
    "M 45 157 C 240 157, 440 180, 650 210",
    "M 45 262 C 240 262, 440 240, 650 210",
    "M 45 367 C 240 367, 440 290, 650 210"
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "bg-slate-950 py-24 md:py-32 border-t border-slate-900 relative overflow-hidden font-sans regional-section",
        isVisible && "regional-active"
      )}
    >
      <style>{`
        :root {
          --regional-inertia: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes regionalLabelReveal {
          0% { opacity: 0; transform: translate3d(0, 15px, 0); letter-spacing: 0.05em; }
          100% { opacity: 1; transform: translate3d(0, 0, 0); letter-spacing: 0.15em; }
        }

        @keyframes regionalHeaderReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 45px, 0) scale3d(0.99, 0.99, 1);
            filter: blur(8px);
            letter-spacing: -0.02em;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            filter: blur(0px);
            letter-spacing: normal;
          }
        }

        @keyframes regionalBodyReveal {
          0% { opacity: 0; transform: translate3d(0, 30px, 0); filter: blur(4px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0px); }
        }

        .regional-label, .regional-header, .regional-body {
          opacity: 0;
          will-change: transform, opacity, filter !important;
          backface-visibility: hidden !important;
        }

        .regional-active .regional-label {
          animation: regionalLabelReveal 1s var(--regional-inertia) both !important;
          animation-delay: 0.25s !important;
        }

        .regional-active .regional-header {
          animation: regionalHeaderReveal 1.3s var(--regional-inertia) both !important;
          animation-delay: 0.38s !important;
          line-height: 1.3 !important;
        }

        .regional-active .regional-body {
          animation: regionalBodyReveal 1.1s var(--regional-inertia) both !important;
          animation-delay: 0.55s !important;
        }
      `}</style>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <span className="inline-block text-[10px] md:text-sm font-bold uppercase tracking-[0.25em] text-amber-500 mb-4 font-mono regional-label">
            BESPOKE REGIONAL OPERATIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6 regional-header">
            Our Regional Hubs
          </h2>
          <p className="font-sans text-slate-300 text-sm md:text-base lg:text-lg font-light leading-relaxed regional-body">
            While our roots are deeply grounded as an attentive family team, our premium fleet network provides flawless travel management across the entire region and beyond.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-12 items-center relative h-[420px]">
          <div className="absolute inset-0 w-full h-[420px] pointer-events-none z-0">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 420" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              <circle cx="650" cy="210" r="100" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
              <circle cx="650" cy="210" r="220" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />
              <circle cx="650" cy="210" r="340" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 8" opacity="0.1" />

              {/* Destination Point Node */}
              <circle cx="650" cy="210" r="4" fill="#f59e0b" />
              
              {/* Premium glowing custom liquid-pulse ripple animations synchronized to path arrival */}
              <motion.circle
                key={`ripple-1-${activeIndex}`}
                cx="650"
                cy="210"
                initial={{ r: 4, opacity: 0 }}
                animate={{ r: [4, 4, 75], opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 2.0,
                  times: [0, 0.45, 1], // Exactly 0.9s delay (0.45 * 2.0) before expanding
                  ease: "easeOut"
                }}
                stroke="#f59e0b"
                strokeWidth="1.5"
                fill="none"
              />
              <motion.circle
                key={`ripple-2-${activeIndex}`}
                cx="650"
                cy="210"
                initial={{ r: 4, opacity: 0 }}
                animate={{ r: [4, 4, 110], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 2.3,
                  times: [0, 0.39, 1], // Exactly 0.9s delay (0.39 * 2.3) before expanding
                  ease: "easeOut"
                }}
                stroke="#f59e0b"
                strokeWidth="1"
                fill="none"
              />

              {paths.map((d, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <g key={idx}>
                    <path 
                      d={d} 
                      stroke="#1e293b" 
                      strokeWidth="1" 
                      strokeDasharray={isActive ? "none" : "2 4"} 
                      opacity={isActive ? 0.8 : 0.25}
                      className="transition-all duration-700"
                    />
                    
                    {isActive && (
                      <motion.path 
                        d={d} 
                        stroke="#f59e0b" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0.1 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        style={{
                          filter: "drop-shadow(0px 0px 6px rgba(245, 158, 11, 0.6))"
                        }}
                      />
                    )}

                    {/* Left side node anchor aligned to active item index */}
                    <circle 
                      cx="45"
                      cy={idx === 0 ? 52 : idx === 1 ? 157 : idx === 2 ? 262 : 367}
                      r={isActive ? 4 : 2}
                      fill={isActive ? "#f59e0b" : "#475569"}
                      className="transition-all duration-500"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Grid rows perfectly vertical centered so they span the exact centers of the SVG paths */}
          <div className="col-span-7 grid grid-rows-4 h-[420px] relative z-10">
            {hubs.map((hub, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    if (onNavigate) onNavigate(hub.page);
                  }}
                  className="group cursor-pointer select-none flex items-center py-1"
                >
                  <a
                    href={hub.path}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate(hub.page);
                    }}
                    className="flex items-baseline gap-6 origin-left transition-all duration-500 transform group-hover:translate-x-3 cursor-pointer"
                  >
                    <span className={`font-mono text-xs md:text-sm transition-colors duration-500 ${isActive ? 'text-amber-500 font-bold' : 'text-slate-600'}`}>
                      {hub.num}
                    </span>
                    <span 
                      className={`font-serif text-3xl md:text-4xl lg:text-4xl xl:text-5xl transition-all duration-500 tracking-tight leading-none ${
                        isActive 
                          ? 'text-white' 
                          : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    >
                      {hub.title}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>

          <div className="col-span-5 relative z-10 flex flex-col justify-center min-h-[220px]">
            <div className="pl-8 border-l border-slate-900 py-2 relative">
              {/* Sleek vertical indicator line sliding on active state change */}
              <motion.div
                className="absolute left-0 w-0.5 bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                animate={{
                  top: `${activeIndex * 25}%`,
                  height: "25%"
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 32
                }}
                style={{ originY: 0 }}
              />
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, x: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ 
                    opacity: 0, 
                    x: -12, 
                    filter: "blur(6px)",
                    transition: { duration: 0.15, ease: "easeIn" } 
                  }}
                  transition={{
                    ease: [0.16, 1, 0.3, 1], // Cinematic ease-out
                    duration: 0.4
                  }}
                  className="space-y-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">
                    Regional Travel Overview
                  </span>
                  <p className="font-serif text-2xl text-stone-100 tracking-wide leading-relaxed font-light">
                    {hubs[activeIndex].title}
                  </p>
                  <p className="font-sans text-sm md:text-base text-slate-400 font-light leading-relaxed mt-2">
                    {hubs[activeIndex].detail}
                  </p>
                  <div className="pt-4">
                    <a
                      href={hubs[activeIndex].path}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) onNavigate(hubs[activeIndex].page);
                      }}
                      className="inline-flex items-center gap-2 group/cta text-amber-500 hover:text-amber-400 font-sans text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200 cursor-pointer min-h-[44px]"
                    >
                      <span className="border-b border-amber-500/30 group-hover/cta:border-amber-400 pb-0.5">
                        {hubs[activeIndex].ctaText}
                      </span>
                      <span className="transform group-hover/cta:translate-x-1 transition-transform duration-200">
                        &rarr;
                      </span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="block lg:hidden space-y-10">
          {hubs.map((hub, idx) => (
            <div 
              key={idx} 
              className="border-b border-slate-900 pb-8 last:border-0"
            >
              <div className="flex gap-4 items-baseline mb-4">
                <span className="font-mono text-xs text-amber-500 font-bold">
                  {hub.num}
                </span>
                <a
                  href={hub.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(hub.page);
                  }}
                  className="font-serif text-2xl text-stone-100 tracking-tight hover:text-amber-500 transition-colors cursor-pointer"
                >
                  {hub.title}
                </a>
              </div>
              <p className="font-sans text-sm font-light text-slate-400 leading-relaxed pl-8 mb-4">
                {hub.detail}
              </p>
              <div className="pl-8">
                <a
                  href={hub.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(hub.page);
                  }}
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-sans text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer"
                >
                  <span className="border-b border-amber-500/30 pb-0.5">
                    {hub.ctaText}
                  </span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 lg:mt-32 pt-8 border-t border-slate-900/50 text-left">
          <p className="font-sans text-xs md:text-sm text-slate-400 font-light">
            Planning a journey outside these regions?{' '}
            <a 
              href="tel:08458333456" 
              className="text-amber-500 font-semibold hover:text-amber-400 transition-colors uppercase tracking-widest text-[11px] inline-block ml-1 min-h-[44px] py-2"
            >
              Speak directly with our family management team on 0845 8333 456 &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function SiteHeader({ onNavigate }: { onNavigate?: (page: PageType) => void }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<'corporate' | 'private' | 'events' | null>(null);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [mobileLocCategoryOpen, setMobileLocCategoryOpen] = useState<'regions' | 'bases' | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Lock page scroll while the mobile drawer is open (the drawer scrolls itself).
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const openDropdownNow = (name: string) => {
    if (closeTimerRef.current) { window.clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setOpenDropdown(name);
  };
  const scheduleDropdownClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 180);
  };

  const handleNav = (page: PageType) => {
    if (onNavigate) onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleRequestQuoteClick = () => {
    handleNav('home');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <motion.nav 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 w-full z-50 bg-white/95 border-b border-stone-100 font-sans backdrop-blur-md"
    >
      {/* Dynamic Style Injection for Premium Aesthetics & Interaction */}
      <style>{`
        @keyframes doubleSonarPulse1 {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes doubleSonarPulse2 {
          0% { transform: scale(1); opacity: 0; }
          25% { transform: scale(1); opacity: 0.6; }
          75% { transform: scale(3.0); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes shimmerShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-sonar1 {
          animation: doubleSonarPulse1 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .animate-sonar2 {
          animation: doubleSonarPulse2 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .shimmer-bg {
          background: linear-gradient(90deg, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(245,158,11,0.1) 100%);
          background-size: 200% auto;
          animation: shimmerShift 6s linear infinite;
        }
      `}</style>

      <div className="w-full py-6 px-8 flex flex-row items-center justify-between max-w-7xl mx-auto z-50 relative">
        {/* Left Block: Logo Grid Decompressor (Fixing image_4b5c63.png Squash) */}
        <div 
          className="flex flex-col items-start space-y-1 cursor-pointer text-left select-none z-50"
          onClick={() => handleNav('home')}
        >
          <span className="font-serif text-2xl font-bold tracking-[0.05em] text-slate-950 leading-none">UGO</span>
          <span className="mt-1 text-[9px] tracking-[0.25em] font-bold uppercase text-amber-600 font-mono leading-none block">
            COACH & MINIBUS HIRE
          </span>
        </div>

        {/* Center Block: Sleek Professional Dropdown Link Tracks */}
        <div className="hidden lg:flex flex-row items-center space-x-10 z-40">
          
          {/* OUR SERVICES Dropdown */}
          <div
            className="group"
            onMouseEnter={() => openDropdownNow('services')}
            onMouseLeave={scheduleDropdownClose}
          >
            <button className="hover:text-slate-950 text-slate-500 transition-all duration-300 py-2 flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-bold focus:outline-none">
              <span className="relative">
                OUR SERVICES
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1.5px] bg-amber-500 transition-all duration-300 origin-center" />
              </span>
              <ChevronRight className={cn("w-3.5 h-3.5 text-amber-600 transition-transform duration-300", openDropdown === 'services' && 'rotate-90')} />
            </button>
            <AnimatePresence>
              {openDropdown === 'services' && (
                <motion.div 
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 15 }}
                   transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[min(850px,calc(100vw-32px))] bg-white border border-stone-200/80 border-b-2 border-b-stone-300/80 shadow-[0_20px_50px_rgba(0,0,0,0.12)] py-8 px-10 z-50 rounded-2xl mt-2 grid grid-cols-3 gap-8 overflow-hidden text-left"
                >
                  {/* Column 01 (Corporate Focus) */}
                  <div className="flex flex-col space-y-4">
                    <a 
                      href="/corporate-accounts" 
                      onClick={(e) => { e.preventDefault(); handleNav('corporate'); }} 
                      className="font-serif text-[13px] tracking-wider font-extrabold text-amber-600 hover:text-amber-700 transition-colors uppercase block mb-1"
                    >
                      01 / Corporate Frameworks
                    </a>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="/our-services" 
                        onClick={(e) => { e.preventDefault(); handleNav('commercial'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Commercial Contracts
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                      <a 
                        href="/workplace-shuttles" 
                        onClick={(e) => { e.preventDefault(); handleNav('workplace-shuttles'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Workplace Shuttles
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                      <a 
                        href="/corporate-roadshows" 
                        onClick={(e) => { e.preventDefault(); handleNav('corporate-roadshows'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Corporate Roadshows
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                    </div>
                  </div>

                  {/* Column 02 (Private Focus) */}
                  <div className="flex flex-col space-y-4">
                    <a 
                      href="/private-luxury" 
                      onClick={(e) => { e.preventDefault(); handleNav('private-luxury'); }} 
                      className="font-serif text-[13px] tracking-wider font-extrabold text-amber-600 hover:text-amber-700 transition-colors uppercase block mb-1"
                    >
                      02 / Private Luxury
                    </a>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="/private-coach-hire" 
                        onClick={(e) => { e.preventDefault(); handleNav('private'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Private Coach Hire
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                      <a 
                        href="/luxury-minibus-hire" 
                        onClick={(e) => { e.preventDefault(); handleNav('private-luxury'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Luxury Minibus Hire
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                      <a 
                        href="/wedding-transport" 
                        onClick={(e) => { e.preventDefault(); handleNav('wedding-transport'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Wedding Transport
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                    </div>
                  </div>

                  {/* Column 03 (Events Focus) */}
                  <div className="flex flex-col space-y-4">
                    <a 
                      href="/strategic-events" 
                      onClick={(e) => { e.preventDefault(); handleNav('strategic-events'); }} 
                      className="font-serif text-[13px] tracking-wider font-extrabold text-amber-600 hover:text-amber-700 transition-colors uppercase block mb-1"
                    >
                      03 / Strategic Events
                    </a>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="/strategic-events" 
                        onClick={(e) => { e.preventDefault(); handleNav('strategic-event-logistics'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Strategic Event Logistics
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                      <a 
                        href="/film-tv-logistics" 
                        onClick={(e) => { e.preventDefault(); handleNav('film-tv-logistics'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Film &amp; TV Logistics
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                      <a 
                        href="/mass-transit-shuttles" 
                        onClick={(e) => { e.preventDefault(); handleNav('mass-transit-shuttles'); }} 
                        className="group/sub font-sans text-[11px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 relative inline-block self-start"
                      >
                        Mass Transit Shuttles
                        <span className="absolute bottom-0 left-0 w-0 group-hover/sub:w-full h-[1px] bg-slate-900 transition-all duration-300" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* THE FLEET Direct Link */}
          <a 
            href="/the-fleet" 
            onClick={(e) => { e.preventDefault(); handleNav('fleet'); }} 
            className="hover:text-slate-950 text-slate-500 transition-all duration-300 py-2 relative group text-xs font-bold tracking-[0.22em] uppercase"
          >
            <span className="relative">
              THE FLEET
              <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1.5px] bg-amber-500 transition-all duration-300 origin-center" />
            </span>
          </a>

          {/* LOCATIONS Dropdown */}
          <div
            className="group"
            onMouseEnter={() => openDropdownNow('locations')}
            onMouseLeave={scheduleDropdownClose}
          >
            <button className="hover:text-slate-950 text-slate-500 transition-all duration-300 py-2 flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-bold focus:outline-none">
              <span className="relative">
                LOCATIONS
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1.5px] bg-amber-500 transition-all duration-300 origin-center" />
              </span>
              <ChevronRight className={cn("w-3.5 h-3.5 text-amber-600 transition-transform duration-300", openDropdown === 'locations' && 'rotate-90')} />
            </button>
            <AnimatePresence>
              {openDropdown === 'locations' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[min(580px,calc(100vw-32px))] bg-white border border-stone-150 shadow-2xl p-8 z-50 rounded-2xl mt-1 grid grid-cols-2 gap-8 border-b-2"
                >
                  {/* Column 01: Core Transit Regions */}
                  <div className="flex flex-col space-y-4 text-left">
                    <h4 className="font-serif text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-600">
                      CORE TRANSIT REGIONS
                    </h4>
                    <div className="flex flex-col space-y-3">
                      {[
                        { name: 'Greater London Central Coverage', path: '/locations/greater-london', page: 'greater-london' as const },
                        { name: 'The Home Counties Network', path: '/locations/home-counties', page: 'home-counties' as const },
                        { name: 'UK Airport Hub Connections', path: '/locations/airport-hubs', page: 'airport-hubs' as const },
                        { name: 'Nationwide Film & Event Transport', path: '/locations/film-and-events', page: 'film-and-events' as const }
                      ].map((region) => (
                        <a 
                          key={region.name}
                          href={region.path}
                          onClick={(e) => { 
                            e.preventDefault(); 
                            if (region.page) {
                              handleNav(region.page);
                            } else {
                              handleNav('home'); 
                              setTimeout(() => { 
                                const mapSection = document.getElementById('regional-dispatch-network') || document.getElementById('locations');
                                if (mapSection) {
                                  mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                } else {
                                  window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }); 
                                }
                              }, 150); 
                            }
                          }}
                          className="group/loc relative block text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-[#050C1A] transition-colors py-1 self-start"
                        >
                          <span className="relative z-10">{region.name}</span>
                          <span className="absolute bottom-0 left-0 w-0 group-hover/loc:w-6 h-[1.5px] bg-amber-500 transition-all duration-300" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Column 02: Regional Dispatch Hubs */}
                  <div className="flex flex-col space-y-4 text-left">
                    <h4 className="font-serif text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-600">
                      LOCAL OPERATIONAL BASES
                    </h4>
                    <div className="flex flex-col space-y-3">
                      {[
                        { name: 'St Albans Operational Base', path: '/locations/st-albans', page: 'st-albans' as const },
                        { name: 'Watford & Elstree Hub', path: '/locations/watford', page: 'watford' as const },
                        { name: 'Hemel Hempstead Core', path: '/locations/hemel-hempstead', page: 'hemel' as const },
                        { name: 'Luton & Regional Access', path: '/locations/luton', page: 'luton' as const }
                      ].map((base) => (
                        <a 
                          key={base.name}
                          href={base.path}
                          onClick={(e) => { 
                            e.preventDefault(); 
                            if (base.page) {
                              handleNav(base.page);
                            } else {
                              handleNav('home'); 
                              setTimeout(() => { 
                                const mapSection = document.getElementById('regional-dispatch-network') || document.getElementById('locations');
                                if (mapSection) {
                                  mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                } else {
                                  window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }); 
                                }
                              }, 150); 
                            }
                          }}
                          className="group/loc relative block text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-[#050C1A] transition-colors py-1 self-start"
                        >
                          <span className="relative z-10">{base.name}</span>
                          <span className="absolute bottom-0 left-0 w-0 group-hover/loc:w-6 h-[1.5px] bg-amber-500 transition-all duration-300" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Full-width footer link: every town page */}
                  <div className="col-span-2 border-t border-stone-100 pt-4 mt-2">
                    <a
                      href="/locations"
                      onClick={(e) => { e.preventDefault(); handleNav('locations-index'); }}
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      View all 25+ areas we cover
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CORPORATE ACCOUNTS Direct Link */}
          <a 
            href="#corporate" 
            onClick={(e) => { e.preventDefault(); handleNav('corporate'); }} 
            className="hover:text-slate-950 text-slate-500 transition-all duration-300 py-2 relative group text-xs font-bold tracking-[0.22em] uppercase"
          >
            <span className="relative">
              CORPORATE ACCOUNTS
              <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1.5px] bg-amber-500 transition-all duration-300 origin-center" />
            </span>
          </a>

        </div>

        {/* Right Node with Mobile Call Capsule (Always visible call capsule + toggler on mobile) */}
        <div className="flex items-center space-x-4 z-50">
          {/* Right Block: The Immersive 24/7 Call Beacon (Replaces CTA Quote Button) */}
          <a 
            href="tel:08458333456" 
            className="bg-slate-950 text-white rounded-full py-2.5 px-4 sm:py-3.5 sm:px-6 flex items-center space-x-3 sm:space-x-4 shadow-[0_10px_30px_rgba(15,23,42,0.15)] border border-slate-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)] relative overflow-hidden group shrink-0"
          >
            {/* Ambient Shifting Light Perimeter */}
            <div className="absolute inset-0 shimmer-bg pointer-events-none opacity-40" />
            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-70 group-hover:via-amber-300 transition-all duration-500" />
            <div className="absolute inset-0 border border-amber-500/15 rounded-full group-hover:border-amber-400/30 transition-colors duration-500 pointer-events-none" />

            {/* Double-Stage Sonar Pulse Indicator */}
            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-sonar2" />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-sonar1" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>

            {/* The Telephone Coordinates Node */}
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-200">
              <span className="hidden md:inline">24/7 CONTACT: </span>
              <span className="text-amber-400 group-hover:text-amber-300 transition-colors font-extrabold ml-1 font-mono">
                0845 8333 456
              </span>
            </span>
          </a>

          {/* Hamburger Menu Toggle Button (Visible exclusively on mobile screens) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-950 transition-colors duration-200 flex items-center justify-center text-slate-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Flyout Drawer with clean height/opacity transition animations */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-2xl overflow-hidden lg:hidden flex flex-col px-6 py-6 space-y-6 z-30 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain"
            >
              {/* Condensed Track */}
              <div className="flex flex-col space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-amber-600 border-b border-stone-100 pb-1">
                  NAVIGATION
                </span>

                {/* OUR SERVICES Accordion Option */}
                <div className="border-b border-stone-100 pb-3">
                  <button 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-2 text-xs font-bold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors focus:outline-none"
                  >
                    <span>OUR SERVICES</span>
                    <ChevronRight className={cn("w-3.5 h-3.5 text-amber-500 transition-transform duration-200", mobileServicesOpen && "rotate-90")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="pl-4 mt-2 space-y-4 overflow-hidden text-left"
                      >
                        {/* Category 1: Corporate Focus */}
                        <div className="border-l-2 border-amber-500/20 pl-3">
                          <button
                            onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'corporate' ? null : 'corporate')}
                            className="w-full flex items-center justify-between py-1 text-[11px] font-bold tracking-wider font-serif text-amber-500 hover:text-amber-600 transition-colors focus:outline-none"
                          >
                            <span>01 / Corporate Frameworks</span>
                            <ChevronRight className={cn("w-3 h-3 text-amber-500 transition-transform duration-200", mobileCategoryOpen === 'corporate' && "rotate-90")} />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileCategoryOpen === 'corporate' && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 mt-1.5 flex flex-col space-y-2 text-[10px] uppercase tracking-wider text-slate-500 font-mono"
                              >
                                <a href="/commercial-contracts" onClick={(e) => { e.preventDefault(); handleNav('commercial'); }} className="hover:text-amber-500 py-1 transition-colors">Commercial Contracts</a>
                                <a href="/workplace-shuttles" onClick={(e) => { e.preventDefault(); handleNav('workplace-shuttles'); }} className="hover:text-amber-500 py-1 transition-colors">Workplace Shuttles</a>
                                <a href="/corporate-roadshows" onClick={(e) => { e.preventDefault(); handleNav('corporate-roadshows'); }} className="hover:text-amber-500 py-1 transition-colors">Corporate Roadshows</a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Category 2: Private Focus */}
                        <div className="border-l-2 border-amber-500/20 pl-3">
                          <button
                            onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'private' ? null : 'private')}
                            className="w-full flex items-center justify-between py-1 text-[11px] font-bold tracking-wider font-serif text-amber-500 hover:text-amber-600 transition-colors focus:outline-none"
                          >
                            <span>02 / Private Luxury</span>
                            <ChevronRight className={cn("w-3 h-3 text-amber-500 transition-transform duration-200", mobileCategoryOpen === 'private' && "rotate-90")} />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileCategoryOpen === 'private' && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 mt-1.5 flex flex-col space-y-2 text-[10px] uppercase tracking-wider text-slate-500 font-mono"
                              >
                                <a href="/private-coach-hire" onClick={(e) => { e.preventDefault(); handleNav('private'); }} className="hover:text-amber-500 py-1 transition-colors">Private Coach Hire</a>
                                <a href="/luxury-minibus-hire" onClick={(e) => { e.preventDefault(); handleNav('private-luxury'); }} className="hover:text-amber-500 py-1 transition-colors">Luxury Minibus Hire</a>
                                <a href="/wedding-transport" onClick={(e) => { e.preventDefault(); handleNav('wedding-transport'); }} className="hover:text-amber-500 py-1 transition-colors">Wedding Transport</a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Category 3: Events Focus */}
                        <div className="border-l-2 border-amber-500/20 pl-3">
                          <button
                            onClick={() => setMobileCategoryOpen(mobileCategoryOpen === 'events' ? null : 'events')}
                            className="w-full flex items-center justify-between py-1 text-[11px] font-bold tracking-wider font-serif text-amber-500 hover:text-amber-600 transition-colors focus:outline-none"
                          >
                            <span>03 / Strategic Events</span>
                            <ChevronRight className={cn("w-3 h-3 text-amber-500 transition-transform duration-200", mobileCategoryOpen === 'events' && "rotate-90")} />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileCategoryOpen === 'events' && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 mt-1.5 flex flex-col space-y-2 text-[10px] uppercase tracking-wider text-slate-500 font-mono"
                              >
                                <a href="/strategic-events" onClick={(e) => { e.preventDefault(); handleNav('strategic-event-logistics'); }} className="hover:text-amber-500 py-1 transition-colors">Strategic Event Logistics</a>
                                <a href="/film-tv-logistics" onClick={(e) => { e.preventDefault(); handleNav('film-tv-logistics'); }} className="hover:text-amber-500 py-1 transition-colors">Film &amp; TV Logistics</a>
                                <a href="/mass-transit-shuttles" onClick={(e) => { e.preventDefault(); handleNav('mass-transit-shuttles'); }} className="hover:text-amber-500 py-1 transition-colors">Mass Transit Shuttles</a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="/the-fleet"
                  onClick={(e) => { e.preventDefault(); handleNav('fleet'); }}
                  className="text-xs font-semibold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors py-1"
                >
                  The Fleet
                </a>
                <a
                  href="/corporate-accounts"
                  onClick={(e) => { e.preventDefault(); handleNav('corporate'); }}
                  className="text-xs font-semibold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors py-1"
                >
                  Corporate Accounts
                </a>
                {/* Mobile LOCATIONS Accordion */}
                <div className="border-t border-stone-100/60 pt-2 flex flex-col">
                  <button 
                    onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                    className="w-full flex items-center justify-between py-2 text-xs font-bold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors focus:outline-none"
                  >
                    <span>LOCATIONS</span>
                    <ChevronRight className={cn("w-3.5 h-3.5 text-amber-500 transition-transform duration-200", mobileLocationsOpen && "rotate-90")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileLocationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="pl-4 mt-2 space-y-4 overflow-hidden text-left"
                      >
                        {/* Sub-Category 1: Core Transit Regions */}
                        <div className="border-l-2 border-amber-500/20 pl-3">
                          <button
                            onClick={() => setMobileLocCategoryOpen(mobileLocCategoryOpen === 'regions' ? null : 'regions')}
                            className="w-full flex items-center justify-between py-1 text-[11px] font-bold tracking-wider font-serif text-amber-500 hover:text-amber-600 transition-colors focus:outline-none"
                          >
                            <span>CORE TRANSIT REGIONS</span>
                            <ChevronRight className={cn("w-3 h-3 text-amber-500 transition-transform duration-200", mobileLocCategoryOpen === 'regions' && "rotate-90")} />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileLocCategoryOpen === 'regions' && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 mt-1.5 flex flex-col space-y-2 text-[10px] uppercase tracking-wider text-slate-500 font-mono"
                              >
                                {[
                                  { name: 'Greater London Central Coverage', path: '/locations/greater-london', page: 'greater-london' as const },
                                  { name: 'The Home Counties Network', path: '/locations/home-counties', page: 'home-counties' as const },
                                  { name: 'UK Airport Hub Connections', path: '/locations/airport-hubs', page: 'airport-hubs' as const },
                                  { name: 'Nationwide Film & Event Transport', path: '/locations/film-and-events', page: 'film-and-events' as const }
                                ].map((region) => (
                                  <a 
                                    key={region.name}
                                    href={region.path}
                                    onClick={(e) => { 
                                      e.preventDefault(); 
                                      if (region.page) {
                                        handleNav(region.page);
                                      } else {
                                        handleNav('home'); 
                                        setTimeout(() => { 
                                          const mapSection = document.getElementById('regional-dispatch-network') || document.getElementById('locations');
                                          if (mapSection) {
                                            mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                          } else {
                                            window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }); 
                                          }
                                        }, 150); 
                                      }
                                    }} 
                                    className="hover:text-amber-600 py-1 transition-colors"
                                  >
                                    {region.name}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Sub-Category 2: Local Operational Bases */}
                        <div className="border-l-2 border-amber-500/20 pl-3">
                          <button
                            onClick={() => setMobileLocCategoryOpen(mobileLocCategoryOpen === 'bases' ? null : 'bases')}
                            className="w-full flex items-center justify-between py-1 text-[11px] font-bold tracking-wider font-serif text-amber-500 hover:text-amber-600 transition-colors focus:outline-none"
                          >
                            <span>LOCAL OPERATIONAL BASES</span>
                            <ChevronRight className={cn("w-3 h-3 text-amber-500 transition-transform duration-200", mobileLocCategoryOpen === 'bases' && "rotate-90")} />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileLocCategoryOpen === 'bases' && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 mt-1.5 flex flex-col space-y-2 text-[10px] uppercase tracking-wider text-slate-500 font-mono"
                              >
                                {[
                                  { name: 'St Albans Operational Base', path: '/locations/st-albans', page: 'st-albans' as const },
                                  { name: 'Watford & Elstree Hub', path: '/locations/watford', page: 'watford' as const },
                                  { name: 'Hemel Hempstead Core', path: '/locations/hemel-hempstead', page: 'hemel' as const },
                                  { name: 'Luton & Regional Access', path: '/locations/luton', page: 'luton' as const }
                                ].map((base) => (
                                  <a 
                                    key={base.name}
                                    href={base.path}
                                    onClick={(e) => { 
                                      e.preventDefault(); 
                                      if (base.page) {
                                        handleNav(base.page);
                                      } else {
                                        handleNav('home'); 
                                        setTimeout(() => { 
                                          const mapSection = document.getElementById('regional-dispatch-network') || document.getElementById('locations');
                                          if (mapSection) {
                                            mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                          } else {
                                            window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }); 
                                          }
                                        }, 150); 
                                      }
                                    }} 
                                    className="hover:text-amber-600 py-1 transition-colors"
                                  >
                                    {base.name}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col space-y-1 pt-2 border-t border-stone-100">
                <a href="/about" onClick={(e) => { e.preventDefault(); handleNav('about'); }} className="text-xs font-semibold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors py-2">About Us</a>
                <a href="/locations" onClick={(e) => { e.preventDefault(); handleNav('locations-index'); }} className="text-xs font-semibold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors py-2">Areas We Cover</a>
                <a href="/contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} className="text-xs font-semibold tracking-widest uppercase text-slate-700 hover:text-amber-600 transition-colors py-2">Contact</a>
              </div>

              {/* Call Details & Direct Actions inside Drawer */}
              <div className="flex flex-col space-y-4 pt-4 border-t border-stone-100">
                <a 
                  href="tel:08458333456" 
                  className="text-xs font-bold tracking-[0.15em] text-slate-900 hover:text-amber-600 transition-colors duration-200 flex items-center justify-center py-3 bg-stone-50 rounded-xl"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-2" />
                  CONTACT OFFICE: 0845 8333 456
                </a>

                <button 
                  onClick={handleRequestQuoteClick}
                  className="w-full border border-amber-500 hover:bg-amber-500 hover:text-slate-950 text-amber-600 font-bold tracking-[0.15em] text-xs uppercase py-4 rounded-xl transition-all duration-300 shadow-sm animate-pulse"
                >
                  Request a Smart Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}


function TheDirectRoute() {
  const [toggledState, setToggledState] = useState<'broker' | 'ugo'>('ugo');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "bg-slate-950 py-24 md:py-32 relative overflow-hidden border-t border-slate-900 font-sans text-white groundbreaking-section",
        isVisible && "groundbreaking-active"
      )}
    >
      <style>{`
        :root {
          --luxury-deceleration: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes groundbreakingHeaderReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 50px, 0);
            letter-spacing: -0.04em;
            filter: blur(8px);
            clip-path: inset(0 0 100% 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            letter-spacing: normal;
            filter: blur(0px);
            clip-path: inset(0 0 0 0);
          }
        }

        .groundbreaking-header {
          opacity: 0;
          will-change: transform, opacity, filter, clip-path !important;
          line-height: 1.35 !important;
        }

        .groundbreaking-active .groundbreaking-header {
          animation: groundbreakingHeaderReveal 1.4s var(--luxury-deceleration) both !important;
          animation-delay: 0.35s !important;
        }
      `}</style>
      {/* Visual background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-y-1/2 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] -translate-y-1/2 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight groundbreaking-header">
            Our Primary Transport Services
          </h2>
        </div>

        {/* Desktop Layout Interactive Canvas */}
        <div className="hidden lg:block">
          {/* The Toggle Switch System: Place two minimalist horizontally aligned toggles at the top with generous tracking */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 mb-16 relative z-10 select-none">
            <button 
              onClick={() => setToggledState('broker')}
              onMouseEnter={() => setToggledState('broker')}
              className={`font-mono text-xs sm:text-sm uppercase tracking-[0.2em] py-2 relative transition-all duration-300 min-h-[44px] flex items-center ${
                toggledState === 'broker' 
                  ? 'text-stone-100 font-semibold' 
                  : 'text-stone-100/30 hover:text-stone-100/60'
              }`}
            >
              [ 01 / Booking Through Brokers ]
              {toggledState === 'broker' && (
                <motion.div 
                  layoutId="toggleUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>

            <button 
              onClick={() => setToggledState('ugo')}
              onMouseEnter={() => setToggledState('ugo')}
              className={`font-mono text-xs sm:text-sm uppercase tracking-[0.2em] py-2 relative transition-all duration-300 min-h-[44px] flex items-center ${
                toggledState === 'ugo' 
                  ? 'text-stone-100 font-semibold' 
                  : 'text-stone-100/30 hover:text-stone-100/60'
              }`}
            >
              [ 02 / Booking Direct with Us ]
              {toggledState === 'ugo' && (
                <motion.div 
                  layoutId="toggleUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Morphing Kinetic Filament Logic Canvas */}
          <div className="relative w-full h-[240px] mb-12 flex items-center justify-center pointer-events-none select-none">
            <svg 
              className="w-full h-full absolute inset-0" 
              viewBox="0 0 1000 240" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="120" r="3" fill="#64748b" />
              
              {/* Morphing Path */}
              <motion.path
                d={toggledState === 'ugo' 
                  ? "M 50 120 L 250 120 L 500 120 L 750 120 L 920 120" 
                  : "M 50 120 L 250 50 L 500 190 L 750 60 L 920 120"
                }
                stroke="#f59e0b"
                strokeWidth={toggledState === 'ugo' ? "2.5" : "1.5"}
                strokeDasharray={toggledState === 'ugo' ? "none" : "2 5"}
                fill="none"
                animate={{
                  d: toggledState === 'ugo' 
                    ? "M 50 120 L 250 120 L 500 120 L 750 120 L 920 120" 
                    : "M 50 120 L 250 50 L 500 190 L 750 60 L 920 120",
                  stroke: toggledState === 'ugo' ? "#f59e0b" : "#64748b"
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  filter: toggledState === 'ugo' 
                    ? "drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.7))" 
                    : "none"
                }}
              />

              {/* Node 1: Automated Call Centres */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: toggledState === 'broker' ? 1 : 0.05 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none select-none"
              >
                <circle cx="250" cy="50" r="5" fill="#f43f5e" />
                <circle cx="250" cy="50" r="10" stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.4" className="animate-ping" style={{ animationDuration: '3s' }} />
                <text x="250" y="32" textAnchor="middle" className="font-mono text-[10px] sm:text-xs fill-slate-300 tracking-wider">
                  Automated Call Centres
                </text>
              </motion.g>

              {/* Node 2: Complex Ticketing Queues */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: toggledState === 'broker' ? 1 : 0.05 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none select-none"
              >
                <circle cx="500" cy="190" r="5" fill="#f43f5e" />
                <circle cx="500" cy="190" r="10" stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.4" className="animate-ping" style={{ animationDuration: '3.5s' }} />
                <text x="500" y="212" textAnchor="middle" className="font-mono text-[10px] sm:text-xs fill-slate-300 tracking-wider">
                  Complex Ticketing Queues
                </text>
              </motion.g>

              {/* Node 3: Third-Party Middlemen */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: toggledState === 'broker' ? 1 : 0.05 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none select-none"
              >
                <circle cx="750" cy="60" r="5" fill="#f43f5e" />
                <circle cx="750" cy="60" r="10" stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.4" className="animate-ping" style={{ animationDuration: '4s' }} />
                <text x="750" y="42" textAnchor="middle" className="font-mono text-[10px] sm:text-xs fill-slate-300 tracking-wider">
                  Third-Party Middlemen
                </text>
              </motion.g>

              {/* Node: Family Management Core with glowing destination pulse ripple */}
              <g className="pointer-events-none select-none">
                {toggledState === 'ugo' && (
                  <>
                    <motion.circle
                      key="ugo-ripple-1"
                      cx="920"
                      cy="120"
                      r="6"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      fill="none"
                      initial={{ r: 6, opacity: 0.9 }}
                      animate={{ r: 65, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: "easeOut" }}
                    />
                    <motion.circle
                      key="ugo-ripple-2"
                      cx="920"
                      cy="120"
                      r="6"
                      stroke="#f59e0b"
                      strokeWidth="1"
                      fill="none"
                      initial={{ r: 6, opacity: 0.6 }}
                      animate={{ r: 110, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: "easeOut", delay: 1.4 }}
                    />
                  </>
                )}

                {/* Center dot */}
                <circle 
                  cx="920" 
                  cy="120" 
                  r="6" 
                  fill={toggledState === 'ugo' ? '#f59e0b' : '#334155'} 
                  className="transition-colors duration-500"
                />
                <motion.circle
                  cx="920"
                  cy="120"
                  r={toggledState === 'ugo' ? 12 : 0}
                  stroke="#f59e0b"
                  strokeWidth="1"
                  fill="none"
                  animate={{
                    r: toggledState === 'ugo' ? 12 : 0,
                    opacity: toggledState === 'ugo' ? 0.8 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <text 
                  x="938" 
                  y="124" 
                  className={`font-serif text-[13px] md:text-sm font-semibold transition-all duration-300 tracking-wider ${
                    toggledState === 'ugo' ? 'fill-amber-400' : 'fill-slate-600'
                  }`}
                >
                  Family Management Team
                </text>
              </g>
            </svg>
          </div>

          {/* High-ROI Copy Mapping Column Container */}
          <div className="min-h-[220px] pt-12 border-t border-slate-900">
            <AnimatePresence mode="wait">
              {toggledState === 'ugo' ? (
                <motion.div
                  key="copy-ugo"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h3 className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight leading-tight">
                      Reliable Services. Personal Family Care.
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                      Large transport brokers distance you with automated ticketing loops and call centres. We work differently. We back our carefully maintained unbranded fleet with the direct, personal attention of our family management team. When schedules shift or plan changes require immediate attention, you have an immediate phone line straight to the owners of the company.
                    </p>
                  </div>
                  
                  <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                    <div className="space-y-6 text-left">
                      <div className="font-serif text-lg text-amber-500 flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-slate-600 mt-1">01</span>
                        <span>True 24/7 Human Dispatch (Zero phone menus)</span>
                      </div>
                      <div className="font-serif text-lg text-amber-500 flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-slate-600 mt-1">02</span>
                        <span>Direct Owner-Level Accountability on every route</span>
                      </div>
                      <div className="font-serif text-lg text-amber-500 flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-slate-600 mt-1">03</span>
                        <span>Family-Owned Pride in pristine fleet presentation</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="copy-broker"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h3 className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight leading-tight">
                      The Broker Dilemma
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                      When you book through a massive digital broker, your itinerary is outsourced to anonymous subcontractors. If a vehicle delays or a flight time shifts, your request gets trapped in automated call queues, complex ticket escalations, and detached administrative layers.
                    </p>
                  </div>
                  
                  <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                    <div className="space-y-6 text-left">
                      <div className="font-serif text-lg text-slate-500 flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-slate-700 mt-1">01</span>
                        <span>Automated response trees</span>
                      </div>
                      <div className="font-serif text-lg text-slate-500 flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-slate-700 mt-1">02</span>
                        <span>Zero asset control</span>
                      </div>
                      <div className="font-serif text-lg text-slate-500 flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-slate-700 mt-1">03</span>
                        <span>Hidden broker markups</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout (Solid Deep Navy background, static stack of UGO mode copy only) */}
        <div className="block lg:hidden space-y-12">
          <div className="space-y-6">
            <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500 font-bold">
              UGO DIRECT LINE &amp; SUPPORT
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight leading-tight mb-4">
              National Scale. Zero Corporate Friction.
            </h3>
            <p className="font-sans text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Large transport brokers distance you with disconnected management layers and automated ticketing loops. UGO flattens the distance. We back our elite national vehicle network with the direct, un-compromised attention of an active family management team. When timelines shift or critical operations require instant adjustments, you possess an immediate phone line straight to the owners of the company.
            </p>
          </div>
          
          <div className="space-y-6 pt-8 border-t border-slate-900/40">
            <div className="font-serif text-lg text-amber-500 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-slate-600 mt-1">01</span>
              <span>True 24/7 Human Dispatch (Zero phone menus)</span>
            </div>
            <div className="font-serif text-lg text-amber-500 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-slate-600 mt-1">02</span>
              <span>Direct Owner-Level Accountability on every route</span>
            </div>
            <div className="font-serif text-lg text-amber-500 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-slate-600 mt-1">03</span>
              <span>Family-Owned Pride in pristine fleet presentation</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


function FleetShowroom() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const fleet = [
    {
      title: "Executive Minibuses",
      capacity: "10 to 16 Passengers",
      capacityValue: "16",
      imgAlt: "Executive Minibus for 16 passengers",
      imgSrc: "/images/executive-minibus-for-16-passengers.webp",
      description: "Optimised for elite small groups, executive board members, and confidential corporate shifts.",
      specs: [
        "100% Unbranded Canvas",
        "Live GPS Dispatch Tracking",
        "Climate Controlled Interior",
        "Dedicated Baggage Allocation"
      ]
    },
    {
      title: "Luxury Midi Coaches",
      capacity: "29 to 35 Passengers",
      capacityValue: "35",
      imgAlt: "Executive Midi coach 35 passengers",
      imgSrc: "/images/executive-midi-coach-35-passengers.webp",
      description: "The ideal balance of style and occupancy for high-profile group logistics and regional corporate events.",
      specs: [
        "100% Unbranded Canvas",
        "Live GPS Dispatch Tracking",
        "Climate Controlled Interior",
        "Dedicated Baggage Allocation"
      ]
    },
    {
      title: "Elite Grand Tourers",
      capacity: "49 to 53 Passengers",
      capacityValue: "53",
      imgAlt: "Executive Coach",
      imgSrc: "/images/executive-coach.webp",
      description: "Our ultimate high-capacity flagship vehicles, built for long-distance corporate travel and luxury tours.",
      specs: [
        "100% Unbranded Canvas",
        "Live GPS Dispatch Tracking",
        "Climate Controlled Interior",
        "Dedicated Baggage Allocation"
      ]
    }
  ];

  const handleQuoteClick = (capacityValue: string) => {
    window.dispatchEvent(new CustomEvent('select-capacity-quote-trigger', {
      detail: { passengers: capacityValue }
    }));
  };

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "bg-[#F9F9FB] border-y border-slate-200 font-sans relative py-24 lg:py-32 overflow-hidden fleet-section",
        isVisible && "fleet-active"
      )}
    >
      <style>{`
        .spotlight-radial-light {
          background: radial-gradient(circle at center, rgba(217, 119, 6, 0.05) 0%, rgba(217, 119, 6, 0.01) 50%, transparent 80%);
        }

        :root {
          --fleet-inertia: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fleetHeaderReveal {
          0% {
            opacity: 0;
            transform: translate3d(-30px, 0, 0);
            letter-spacing: -0.02em;
            filter: blur(6px);
            clip-path: inset(0 100% 0 0); /* Unmasks smoothly from left to right */
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            letter-spacing: normal;
            filter: blur(0px);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes fleetSubtextReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0px);
          }
        }

        .fleet-header {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity, filter, clip-path !important;
          line-height: 1.3 !important;
        }

        .fleet-subtext {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity, filter !important;
        }

        .fleet-active .fleet-header {
          visibility: visible;
          animation: fleetHeaderReveal 1.2s var(--fleet-inertia) both !important;
          animation-delay: 0.3s !important;
        }

        .fleet-active .fleet-subtext {
          visibility: visible;
          animation: fleetSubtextReveal 1.4s var(--fleet-inertia) both !important;
          animation-delay: 0.48s !important;
        }
      `}</style>

      {/* The Spotlight Light background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] max-w-6xl aspect-square spotlight-radial-light blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Elite Visual Hierarchy Heading Area */}
        <div className="mb-16 lg:mb-20 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-3xl text-slate-900 leading-tight mb-6 fleet-header">
            The Fleet
          </h2>
          <p className="font-sans text-slate-700 text-sm md:text-base lg:text-lg font-light leading-relaxed fleet-subtext">
            Managed directly by our dedicated family operation. From executive minibuses for corporate teams to high-capacity grand touring coaches, we ensure every vehicle is kept in pristine, immaculate condition. Our entire fleet operates completely un-signwritten to maintain absolute professional discretion, backed by live GPS dispatch tracking and rigorous safety audits.
          </p>
        </div>

        {/* 3-Column Interactive Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {fleet.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-slate-50/80 hover:border-slate-300 custom-flat-plate reveal-card-premium is-revealed"
            >
              <div>
                {/* High-Fidelity Vehicle Image Showcase */}
                <div className="overflow-hidden aspect-[16/10] relative bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                  <img 
                    src={item.imgSrc} loading="lazy" decoding="async" width={1536} height={1024} 
                    alt={item.imgAlt} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info & Branding */}
                <h3 className="font-serif text-2xl lg:text-3xl text-slate-900 tracking-tight leading-tight mb-2">
                  {item.title}
                </h3>
                
                <div className="inline-block border border-amber-500/30 bg-amber-500/5 px-3 py-1.5 rounded-sm mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-amber-600">
                    {item.capacity}
                  </span>
                </div>

                {/* MOBILE OPTIMIZATION: Static scannable rows */}
                <div className="block lg:hidden space-y-3.5 pt-6 border-t border-slate-100">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                      <span className="font-sans text-xs md:text-sm font-light tracking-wide">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* DESKTOP OPTIMIZATION: Hover spec-reveal container */}
                <div className="hidden lg:block relative h-28 overflow-hidden pt-6 border-t border-slate-100">
                  {/* Default State: Short Grounded Description */}
                  <div className="absolute inset-0 transition-all duration-500 ease-out transform group-hover:-translate-y-full group-hover:opacity-0">
                    <p className="text-sm font-light text-slate-500 leading-relaxed italic">
                      {item.description}
                    </p>
                  </div>

                  {/* Hovered State: Crisp Micro-spec Reveal with dark typography */}
                  <div className="absolute inset-0 transition-all duration-500 ease-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 grid grid-cols-2 gap-4">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px] font-semibold tracking-wide leading-snug">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Clean, High-ROI quote action anchor */}
              <div className="pt-8 mt-8 border-t border-slate-100 flex justify-start">
                <button
                  type="button"
                  onClick={() => handleQuoteClick(item.capacityValue)}
                  className="text-slate-950 hover:text-amber-600 transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 group/anchor cursor-pointer min-h-[44px] px-2"
                >
                  <span>Select Capacity &amp; Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/anchor:translate-x-1 text-amber-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="font-sans text-slate-600 text-xs md:text-sm italic font-light">
            All assets are subject to daily detailing, routine structural safety vetting, and regular enhanced deep cleaning protocols by our family team.
          </p>
        </div>

      </div>
    </section>
  );
}

function UGOStandardsGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const standards = [
    {
      id: "01",
      header: "Impeccable Unbranded Fleet",
      copy: "Every coach and minibus in our network operates completely free of commercial signwriting or branding, providing a clean, professional, and discreet executive appearance for your guests and VIP clients."
    },
    {
      id: "02",
      header: "Direct 24/7 Support",
      copy: "We do not use automated call centres or complex phone menus. Our clients get direct phone numbers linking straight to our family management team for real human support around the clock."
    },
    {
      id: "03",
      header: "Professional Vetted Drivers",
      copy: "Every driver we deploy is meticulously selected, smartly dressed, and fully background checked to ensure the absolute safety, comfort, and protection of your passengers."
    },
    {
      id: "04",
      header: "Dependable Support Network",
      copy: "We cut no corners. Every journey is backed by comprehensive fleet insurance, real-time vehicle tracking, and an active regional support backup system to guarantee a smooth trip from start to finish."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "bg-stone-50 py-24 md:py-32 border-y border-stone-200 protocol-section",
        isVisible && "protocol-active"
      )}
    >
      <style>{`
        :root {
          --agency-inertia: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes premiumRevealUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 60px, 0) scale3d(0.98, 0.98, 1);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            filter: blur(0px);
          }
        }

        /* Default state of target elements */
        .protocol-section .protocol-animate-left-h2,
        .protocol-section .protocol-animate-left-p,
        .protocol-section .protocol-animate-item {
          opacity: 0;
          will-change: transform, opacity, filter !important;
          backface-visibility: hidden !important;
        }

        /* Viewport Trigger (On-Scroll) */
        .protocol-section.protocol-active .protocol-animate-item {
          animation: premiumRevealUp 1.1s var(--agency-inertia) both !important;
        }

        /* Staggered delay for the left text column and the right standards cards */
        .protocol-section.protocol-active .protocol-animate-left-h2 {
          animation: premiumRevealUp 1.1s var(--agency-inertia) both !important;
          animation-delay: 0s !important;
        }
        .protocol-section.protocol-active .protocol-animate-left-p {
          animation: premiumRevealUp 1.1s var(--agency-inertia) both !important;
          animation-delay: 0.1s !important;
        }

        /* Flawless Staggered Wave for the existing blocks */
        .protocol-section.protocol-active .protocol-animate-item:nth-child(1) {
          animation-delay: 0s !important;
        }
        .protocol-section.protocol-active .protocol-animate-item:nth-child(2) {
          animation-delay: 0.12s !important;
        }
        .protocol-section.protocol-active .protocol-animate-item:nth-child(3) {
          animation-delay: 0.24s !important;
        }
        .protocol-section.protocol-active .protocol-animate-item:nth-child(4) {
          animation-delay: 0.36s !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left Anchor Column */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight mb-6 protocol-animate-left-h2">
              The Zero-Compromise Protocol.
            </h2>
            <p className="font-sans text-slate-600 font-light text-base md:text-lg leading-relaxed max-w-sm protocol-animate-left-p">
              Four operational anchors that separate our family-run fleet from standard commercial transport providers.
            </p>
          </div>

          {/* Right Cascading Standards */}
          <div className="w-full lg:w-2/3 flex flex-col gap-16 md:gap-20 mt-8 lg:mt-0">
            {standards.map((standard, index) => {
              // Creating the asymmetric staggered effect
              const isEven = index % 2 !== 0;
              
              return (
                <div 
                  key={index}
                  className={`group relative pl-6 md:pl-10 lg:pl-12 border-l-2 border-stone-200 transition-all duration-300 hover:border-amber-500 hover:scale-[1.02] flex flex-col justify-center ${isEven ? 'lg:ml-24' : 'lg:mr-24'} protocol-animate-item`}
                >
                  <span className="block font-sans text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-4 lg:mb-6">
                    Our Standard {standard.id}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4 transition-colors duration-300">
                    {standard.header}
                  </h3>
                  <p className="font-sans text-slate-600 leading-relaxed font-light text-base md:text-lg transition-colors duration-300 group-hover:text-slate-900">
                    {standard.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogisticsArchitectureSection({ onNavigate }: { onNavigate?: (page: PageType) => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Corporate Frameworks",
      preview: "Engineered for enterprise precision, daily workplace commutes, and multi-vehicle conference moves.",
      expandedCopy: "Managing daily employee shuttles, complex conference transfers, and confidential executive roadshows with dedicated account escort teams.",
      buttonText: "Configure Corporate Account →",
      targetType: "Corporate Logistics"
    },
    {
      num: "02",
      title: "Private Luxury",
      preview: "Tailored for bespoke itineraries, high-end private tours, and VIP hospitality transfers.",
      expandedCopy: "Catering to high-end private tours, premium wedding transport, and VIP hospitality transfers using entirely unbranded, pristine fleet assets.",
      buttonText: "Curate Luxury Itinerary →",
      targetType: "Private Event"
    },
    {
      num: "03",
      title: "Strategic Events",
      preview: "Mobilised for high-capacity group transport, sports teams, film production, and major festivals.",
      expandedCopy: "Synchronising mass transport networks for filming crews, sports teams, major festivals, and urgent multi-coach deployments.",
      buttonText: "Deploy Event Logistics →",
      targetType: "Sports/Music Event"
    }
  ];

  const handleTriptychClick = (type: string) => {
    if (type === "Corporate Logistics" && onNavigate) {
      onNavigate('corporate');
      return;
    }
    if (type === "Private Event" && onNavigate) {
      onNavigate('private-luxury');
      return;
    }
    if (type === "Sports/Music Event" && onNavigate) {
      onNavigate('strategic-events');
      return;
    }
    const formContainer = document.getElementById("smart-quote");
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.dispatchEvent(
      new CustomEvent("booking-preselect-passengers", {
        detail: { journeyType: type }
      })
    );
  };

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "bg-[#020617] py-24 lg:py-32 border-y border-slate-900 relative overflow-hidden font-sans kinetic-section",
        isVisible && "kinetic-active"
      )}
    >
      <style>{`
        :root {
          --luxury-inertia: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes badgePop {
          0% { opacity: 0; transform: scale3d(0.85, 0.85, 1) translate3d(0, 15px, 0); }
          100% { opacity: 1; transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
        }
        @keyframes titleKineticReveal {
          0% { clip-path: inset(0 0 100% 0); transform: translate3d(0, 60px, 0); letter-spacing: -0.03em; opacity: 0; }
          100% { clip-path: inset(0 0 0 0); transform: translate3d(0, 0, 0); letter-spacing: normal; opacity: 1; }
        }
        @keyframes subtextDrift {
          0% { opacity: 0; transform: translate3d(0, 30px, 0); filter: blur(3px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0px); }
        }

        /* Elements default state to prevent flash before observer activates */
        .kinetic-section .mb-16 span.font-mono,
        .kinetic-section h2,
        .kinetic-section p.font-sans.text-slate-400 {
          opacity: 0;
          will-change: transform, opacity, clip-path !important;
          backface-visibility: hidden !important;
        }

        /* Viewport Entrance Actions */
        .kinetic-section.kinetic-active .mb-16 span.font-mono {
          animation: badgePop 0.8s var(--luxury-inertia) both !important;
        }

        .kinetic-section.kinetic-active h2 {
          animation: titleKineticReveal 1.3s var(--luxury-inertia) both !important;
          animation-delay: 0.12s !important;
          line-height: 1.3 !important;
        }

        .kinetic-section.kinetic-active p.font-sans.text-slate-400 {
          animation: subtextDrift 1.1s var(--luxury-inertia) both !important;
          animation-delay: 0.3s !important;
        }
      `}</style>
      {/* Decorative background visual ambient deep navy glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-slate-900/40 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0c1830]/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto">
          <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-amber-500 mb-4 font-mono">
            FLEET ALIGNMENT &amp; SECTORS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
            Our Executive Transport Services
          </h2>
          <p className="font-sans text-slate-400 font-light text-sm md:text-base leading-relaxed">
            Select your sector framework below. Choosing a dedicated travel profile instantly tailors our fleet resources to your specific market requirements and connects you directly with a senior coordinator.
          </p>
        </div>

        {/* Triptych Canvas Container */}
        <div className="relative min-h-[500px] lg:h-[580px] w-full flex flex-col lg:flex-row rounded-3xl border border-slate-900 overflow-hidden bg-[#030712] shadow-2xl">
          
          {pillars.map((pillar, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <motion.div
                key={pillar.num}
                id={`triptych-column-${pillar.num}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                animate={{
                  flexGrow: isMobile ? 1 : (isHovered ? 2.2 : (isAnyHovered ? 0.8 : 1))
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                  mass: 0.9,
                  duration: 0.4
                }}
                className={cn(
                  "relative flex flex-col justify-between p-8 md:p-12 cursor-pointer transition-all duration-500 overflow-hidden select-none group min-h-[350px] lg:min-h-0 bg-[#050C1A]",
                  idx < 2 && "border-b lg:border-b-0 lg:border-r border-[#0f2142]/40"
                )}
                onClick={() => handleTriptychClick(pillar.targetType)}
              >
                {/* 1. Immersive dark bronze / dark gradient overlay inside hovered column */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-[#1E150F] via-[#100D0A] to-[#050C1A] transition-opacity duration-500 ease-in-out pointer-events-none z-0",
                  isHovered ? "opacity-100" : "opacity-0"
                )} />

                {/* Accent amber border on hover */}
                <div className={cn(
                  "absolute inset-0 border border-amber-500/15 pointer-events-none transition-all duration-500 z-10",
                  isHovered ? "opacity-100" : "opacity-0"
                )} />

                {/* Ambient glow accent inside hovered card (bottom gradient) */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                {/* 2. Top Banner Information: Number & Chevron Indicator */}
                <div className="relative z-10 flex justify-between items-center w-full">
                  <span className="font-mono text-xs tracking-[0.2em] font-bold text-slate-500 group-hover:text-amber-500/90 transition-colors duration-300">
                    Sector {pillar.num}
                  </span>
                  
                  {/* Subtle chevron that lights up on hover */}
                  <svg className="w-5 h-5 text-slate-650 group-hover:text-amber-500 transition-all duration-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>

                {/* 3. Horizontal Typography and Content Container */}
                <div className="relative z-10 mt-auto flex flex-col justify-end w-full h-[75%] lg:h-[80%]">
                  <div className="space-y-4">
                    
                    {/* Category Serif Title */}
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white font-medium mb-1 group-hover:text-amber-100 transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-amber-500/80 mt-3 group-hover:w-20 transition-all duration-500" />
                    </div>

                    {/* Standard High-Value Preview Sentence (Always visible) */}
                    <p className="font-sans text-xs md:text-sm text-slate-350 leading-relaxed max-w-full font-light">
                      {pillar.preview}
                    </p>

                    {/* Deeper high-converting operational proof expanded paragraph (Reveals on hover) */}
                    <div className="opacity-100 lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-60 overflow-hidden transition-all duration-500 ease-out">
                      <p className="font-sans text-xs md:text-sm text-[#94A3B8] font-light leading-relaxed pt-3 border-t border-[#0f2142]/40">
                        {pillar.expandedCopy}
                      </p>
                    </div>

                    {/* Luxurious Solid Action Button */}
                    <div className="opacity-100 lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-out pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTriptychClick(pillar.targetType);
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-sans text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-[1.02] cursor-pointer"
                      >
                        {pillar.buttonText}
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

      <style>{`
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
}

function InstitutionalTenderBanner() {
  return (
    <section className="bg-[#030712] border-t border-slate-900 w-full font-sans text-white py-20 relative overflow-hidden">
      {/* Decorative subtle ambient blue/gold glows behind */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Column: Context Copy & Dash Integration */}
        <div className="flex-1 max-w-4xl text-left space-y-8">
          <div>
            <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-amber-500 mb-4 font-mono">
              CONTRACT TRANSPORT &amp; TENDERS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
              School, College &amp; Contract Tenders
            </h2>
            <p className="text-sm md:text-base text-slate-350 font-light leading-relaxed">
              We understand that student safety, absolute punctuality, and strict compliance are your highest priorities. As an experienced family-run provider, we welcome formal invitations to tender for daily school routes, academy transport, and college contract networks. Submit your requirements or share your specifications directly with our team for a fast, straightforward response.
            </p>
          </div>

          {/* Secure Compliance Dashboard Component */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-900">
            <div className="bg-[#080E1C] border border-slate-900/80 p-4 rounded-xl flex flex-col justify-between">
              <span className="font-mono text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-2">DRIVER SAFETY</span>
              <span className="font-sans text-xs font-bold text-emerald-400 uppercase tracking-wider">● ENHANCED DBS</span>
            </div>
            <div className="bg-[#080E1C] border border-slate-900/80 p-4 rounded-xl flex flex-col justify-between">
              <span className="font-mono text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-2">OPERATOR STATUS</span>
              <span className="font-sans text-xs font-bold text-slate-200 tracking-wider uppercase">DVSA REGISTERED</span>
            </div>
            <div className="bg-[#080E1C] border border-slate-900/80 p-4 rounded-xl flex flex-col justify-between">
              <span className="font-mono text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-2">FLEET TRACKING</span>
              <span className="font-sans text-xs font-bold text-amber-500 tracking-wider uppercase">GPS AUTOLINKED</span>
            </div>
            <div className="bg-[#080E1C] border border-slate-900/80 p-4 rounded-xl flex flex-col justify-between">
              <span className="font-mono text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-2">BRAND DISCRETION</span>
              <span className="font-sans text-xs font-bold text-blue-400 tracking-wider uppercase">100% UNBRANDED</span>
            </div>
          </div>
        </div>
        
        {/* Right Column: Promotional Secure Submission Tile wrapper */}
        <div className="shrink-0 w-full lg:w-[35%] flex justify-start lg:justify-end">
           <div className="w-full bg-[#080E1C] border border-slate-900 p-8 rounded-2xl flex flex-col justify-between items-stretch gap-6 relative shadow-lg">
             <div className="space-y-2">
               <span className="block font-mono text-[9px] text-[#94A3B8] uppercase tracking-widest font-bold">GET IN TOUCH</span>
               <h4 className="font-serif text-lg text-slate-100">Submit Your Tender</h4>
               <p className="font-sans text-xs text-slate-450 font-light leading-relaxed">
                 Send your transport specifications directly to our management team.
               </p>
             </div>
             <button 
               className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] border border-amber-400 font-sans text-xs uppercase tracking-[0.15em] font-bold py-4 px-6 rounded-xl transition-all duration-300 text-center whitespace-nowrap cursor-pointer shadow-md select-none mt-2"
               onClick={() => {
                 const contactSection = document.getElementById('smart-quote');
                 if (contactSection) {
                   contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 }
               }}
             >
               Submit Tender Details
             </button>
           </div>
        </div>
        
      </div>
    </section>
  );
}

const CommercialLogisticsPage = React.lazy(() => import('./CommercialLogisticsPage').then(m => ({ default: m.CommercialLogisticsPage })));
const CorporateFrameworks = React.lazy(() => import('./CorporateFrameworks').then(m => ({ default: m.CorporateFrameworks })));
const PrivateLuxury = React.lazy(() => import('./PrivateLuxury').then(m => ({ default: m.PrivateLuxury })));
const StrategicEvents = React.lazy(() => import('./StrategicEvents').then(m => ({ default: m.StrategicEvents })));
const StrategicEventLogistics = React.lazy(() => import('./StrategicEventLogistics').then(m => ({ default: m.StrategicEventLogistics })));
const FilmTvLogistics = React.lazy(() => import('./FilmTvLogistics').then(m => ({ default: m.FilmTvLogistics })));
const MassTransitShuttles = React.lazy(() => import('./MassTransitShuttles').then(m => ({ default: m.MassTransitShuttles })));
const WorkplaceShuttles = React.lazy(() => import('./WorkplaceShuttles').then(m => ({ default: m.WorkplaceShuttles })));
const CorporateRoadshows = React.lazy(() => import('./CorporateRoadshows').then(m => ({ default: m.CorporateRoadshows })));
const PrivateCoachHire = React.lazy(() => import('./PrivateCoachHire').then(m => ({ default: m.PrivateCoachHire })));
const WeddingTransport = React.lazy(() => import('./WeddingTransport').then(m => ({ default: m.WeddingTransport })));
const FleetPage = React.lazy(() => import('./FleetPage').then(m => ({ default: m.FleetPage })));
const GreaterLondon = React.lazy(() => import('./GreaterLondon').then(m => ({ default: m.GreaterLondon })));
const HomeCountiesNetwork = React.lazy(() => import('./HomeCountiesNetwork').then(m => ({ default: m.HomeCountiesNetwork })));
const AirportHubs = React.lazy(() => import('./AirportHubs').then(m => ({ default: m.AirportHubs })));
const NationwideFilmEvents = React.lazy(() => import('./NationwideFilmEvents').then(m => ({ default: m.NationwideFilmEvents })));
const StAlbansBase = React.lazy(() => import('./StAlbansBase').then(m => ({ default: m.StAlbansBase })));
const WatfordElstreeHub = React.lazy(() => import('./WatfordElstreeHub').then(m => ({ default: m.WatfordElstreeHub })));
const HemelHempsteadCore = React.lazy(() => import('./HemelHempsteadCore').then(m => ({ default: m.HemelHempsteadCore })));
const LutonRegionalAccess = React.lazy(() => import('./LutonRegionalAccess').then(m => ({ default: m.LutonRegionalAccess })));
const FleetCompliance = React.lazy(() => import('./FleetCompliance').then(m => ({ default: m.FleetCompliance })));
const AboutOurBrand = React.lazy(() => import('./AboutOurBrand').then(m => ({ default: m.AboutOurBrand })));
const TransportLogisticsBlog = React.lazy(() => import('./TransportLogisticsBlog').then(m => ({ default: m.TransportLogisticsBlog })));
const CorporateResponsibility = React.lazy(() => import('./CorporateResponsibility').then(m => ({ default: m.CorporateResponsibility })));
const TownLandingPage = React.lazy(() => import('./TownLandingPage').then(m => ({ default: m.TownLandingPage })));
const PrivacyPolicy = React.lazy(() => import('./PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import('./TermsOfService').then(m => ({ default: m.TermsOfService })));
const ContactPage = React.lazy(() => import('./ContactPage').then(m => ({ default: m.ContactPage })));
const LocationsIndex = React.lazy(() => import('./LocationsIndex').then(m => ({ default: m.LocationsIndex })));
const NotFoundPage = React.lazy(() => import('./NotFoundPage').then(m => ({ default: m.NotFoundPage })));

type PageType = 'home' | 'commercial' | 'private' | 'fleet' | 'corporate' | 'private-luxury' | 'strategic-events' | 'strategic-event-logistics' | 'film-tv-logistics' | 'mass-transit-shuttles' | 'workplace-shuttles' | 'corporate-roadshows' | 'wedding-transport' | 'greater-london' | 'home-counties' | 'airport-hubs' | 'film-and-events' | 'st-albans' | 'watford' | 'hemel' | 'luton' | 'compliance' | 'about' | 'blog' | 'csr' | 'privacy' | 'terms' | 'contact' | 'locations-index' | 'not-found' | `town-${string}`;

const METADATA_MAP: Partial<Record<PageType, { title: string; description: string }>> = {
  'home': {
    title: "UGO | Premium Coach & Minibus Hire | Nationwide Transport",
    description: "The benchmark in British travel logistics. Premium coaches, chauffeured minibuses, and executive shuttles for corporate frameworks, film productions, and major events nationwide."
  },
  'commercial': {
    title: "Our Commercial Services | Premium Fleet Hire | UGO",
    description: "Tailored national fleet logistics, school routes, employee shuttles, and commercial contracts. Safe, dependable transit frameworks with dedicated direct support."
  },
  'fleet': {
    title: "The Executive Fleet | Premium Coach & Minibus Hire | UGO",
    description: "Explore our pristine, elite national fleet of luxury coaches and chauffeured minibuses. Tailored transport configurations for corporate events and high-profile film productions."
  },
  'corporate': {
    title: "Corporate Accounts & Travel Frameworks | UGO",
    description: "Premium corporate travel logistics. Establish dedicated transport networks, employee shuttles, roadshows, and events with absolute compliance and un-signwritten elite black fleets."
  },
  'private': {
    title: "Private Coach & Minibus Hire | Nationwide Group Travel | UGO",
    description: "Bespoke private group hire. Luxury mini-coaches and coaches for family events, tours, and nationwide group transit with personal, direct family care 24/7."
  },
  'private-luxury': {
    title: "Elite Private Luxury Minibus Hire | UGO",
    description: "Exquisite VIP travel experiences. Travel in pristine, unbranded luxury Mercedes-Benz minibuses with premium climate control, plush leather seating, and discrete professional drivers."
  },
  'wedding-transport': {
    title: "Luxury Wedding Guest Transport & Coach Hire | UGO",
    description: "Impeccable wedding guest transport. Timed shuttles, unbranded executive vehicles and a family team that makes sure every guest arrives seamlessly, on time and in comfort."
  },
  'strategic-events': {
    title: "Large-Scale Strategic Event Transport Management | UGO",
    description: "End-to-end transport planning and execution for major events. Logistics architecture, traffic routing management, and high-capacity dispatch networks."
  },
  'strategic-event-logistics': {
    title: "Strategic Event Logistics & Traffic Management | UGO",
    description: "Advanced transport blueprint planning. Custom route mapping, marshaling systems, and large-scale passenger transit for national festivals and elite sporting events."
  },
  'film-tv-logistics': {
    title: "Film & TV Production Unit Logistics | Elite Studio Transit | UGO",
    description: "Serving Warner Bros. Leavesden, Elstree, Pinewood and major UK studio lots. 100% unmarked black fleet, strict safeguarding, and full NDA privacy compliance."
  },
  'mass-transit-shuttles': {
    title: "High-Capacity Mass Transit Shuttles & Commutes | UGO",
    description: "Relieve local infrastructure bottlenecks with scalable mass shuttle operations. High-capacity, multi-vehicle logistics coordination for major venues and enterprises."
  },
  'workplace-shuttles': {
    title: "Workplace Shuttles & Corporate Commute Logistics | UGO",
    description: "Secure, reliable workforce transport links. Servicing major fulfillment centers, business parks, and corporate offices with dedicated employee commute solutions."
  },
  'corporate-roadshows': {
    title: "Chauffeured Corporate Roadshows & Executive Transport | UGO",
    description: "Flawless multi-stop executive travel itineraries. Premium unbranded vehicles with dedicated operational oversight to guarantee absolute timing accuracy."
  },
  'greater-london': {
    title: "Greater London Coach & Minibus Hire | UGO",
    description: "Pristine, Euro 6/ULEZ exempt coach hire across Central London and major boroughs. Ideal for corporate groups, media tours, and strategic city transfers."
  },
  'home-counties': {
    title: "The Home Counties Network | Hertfordshire, Beds & Bucks Transport | UGO",
    description: "Comprehensive group transit network spanning Hertfordshire, Bedfordshire, and Buckinghamshire. Reliable family-managed regional dispatch and route planning."
  },
  'airport-hubs': {
    title: "UK Airport Hub Connections | Premium Transfer Shuttle Services | UGO",
    description: "Seamless transfers to Heathrow, Gatwick, Luton, and Stansted. Real-time flight tracking, massive luggage arrays, and 24/7 dispatch coordination."
  },
  'film-and-events': {
    title: "Nationwide Film & Event Transport Network | UGO",
    description: "National group transport services designed for high-profile film shoots, sports tournaments, and grand scale corporate events across the United Kingdom."
  },
  'st-albans': {
    title: "St Albans Operational Base | Hertfordshire Group Coach Hire | UGO",
    description: "Our core local family dispatch hub located in St Albans (AL2 1HA). Direct 24/7 service line, regular DBS-checked drivers, and immediate regional coverage."
  },
  'watford': {
    title: "Watford & Elstree Hub | Leavesden Studio Media Transit | UGO",
    description: "Elite media and studio transit dispatch. Serving Warner Bros. Leavesden and Elstree film productions with unbranded executive fleets under strict NDAs."
  },
  'hemel': {
    title: "Hemel Hempstead Core | Industrial & Warehouse Commute Shuttles | UGO",
    description: "Corporate shuttle transit networks and industrial park employee commutes around Hemel Hempstead. Custom contract scheduling and volume logistics."
  },
  'luton': {
    title: "Luton & Regional Access | Airport Shuttle & Coach Hire | UGO",
    description: "Providing premium passenger transfers and group coach hire across Luton, Dunstable, and the surrounding Bedfordshire region. Convenient airport link."
  },
  'compliance': {
    title: "Regulatory Compliance & Safety Frameworks | UGO",
    description: "Our uncompromising stance on safety. 100% regular enhanced DBS/CRB checked drivers, Euro 6 clean-air compliance, and comprehensive high-tier public liability insurance."
  },
  'about': {
    title: "About UGO | Family-Run Coach Hire, St Albans | UGO",
    description: "Discover the story of Alan and our local family management team. We combine high-capacity national transport capabilities with the ultimate standard of direct personal care."
  },
  'blog': {
    title: "Transport Insights & Guides | UGO Blog",
    description: "Expert advice on event transport planning, studio logistics under strict NDAs, local Hertfordshire group travel tips, and fleet management insights."
  },
  'csr': {
    title: "Corporate Responsibility & Sustainable Logistics | UGO",
    description: "Our commitment to green travel. Standardised modern Euro 6 vehicles, efficient routing technology, and local community transport support initiatives."
  }
};

const getPageFromPath = (path: string): PageType => {
  // Normalise: strip trailing slashes and lowercase
  let p = (path || '/').replace(/\/+$/, '').toLowerCase() || '/';

  // Legacy/alias paths — every href that has ever been linked keeps working.
  const ALIASES: Record<string, string> = {
    '/our-services': '/our-services',
    '/commercial': '/our-services',
    '/commercial-contracts': '/our-services',
    '/services/corporate-frameworks': '/corporate-accounts',
    '/services/workplace-shuttles': '/workplace-shuttles',
    '/services/private-luxury': '/private-luxury',
    '/services/strategic-event-logistics': '/strategic-event-logistics',
    '/services/film-tv-logistics': '/film-tv-logistics',
    '/services/mass-transit-shuttles': '/mass-transit-shuttles',
    '/company/about': '/about',
    '/company/csr': '/csr',
    '/fleet': '/the-fleet',
    '/corporate': '/corporate-accounts',
    '/private': '/private-coach-hire',
    '/luxury-minibus-hire': '/private-luxury',
    '/locations/hemel': '/locations/hemel-hempstead',
    '/privacy': '/privacy-policy',
    '/terms-of-service': '/terms',
  };
  p = ALIASES[p] || p;

  // Town landing pages: /coach-hire-<slug>
  const townMatch = p.match(/^\/coach-hire-([a-z0-9-]+)$/);
  if (townMatch) {
    if (getTownBySlug(townMatch[1])) return `town-${townMatch[1]}` as PageType;
    return 'not-found';
  }

  switch (p) {
    case '/':
    case '':
      return 'home';
    case '/our-services':
      return 'commercial';
    case '/the-fleet':
      return 'fleet';
    case '/corporate-accounts':
      return 'corporate';
    case '/private-coach-hire':
      return 'private';
    case '/private-luxury':
      return 'private-luxury';
    case '/wedding-transport':
      return 'wedding-transport';
    case '/strategic-events':
      return 'strategic-events';
    case '/strategic-event-logistics':
      return 'strategic-event-logistics';
    case '/film-tv-logistics':
      return 'film-tv-logistics';
    case '/mass-transit-shuttles':
      return 'mass-transit-shuttles';
    case '/workplace-shuttles':
      return 'workplace-shuttles';
    case '/corporate-roadshows':
      return 'corporate-roadshows';
    case '/locations':
      return 'locations-index';
    case '/locations/greater-london':
      return 'greater-london';
    case '/locations/home-counties':
      return 'home-counties';
    case '/locations/airport-hubs':
      return 'airport-hubs';
    case '/locations/film-and-events':
      return 'film-and-events';
    case '/locations/st-albans':
      return 'st-albans';
    case '/locations/watford':
      return 'watford';
    case '/locations/hemel-hempstead':
      return 'hemel';
    case '/locations/luton':
      return 'luton';
    case '/compliance':
      return 'compliance';
    case '/about':
      return 'about';
    case '/blog':
      return 'blog';
    case '/csr':
      return 'csr';
    case '/privacy-policy':
      return 'privacy';
    case '/terms':
      return 'terms';
    case '/contact':
      return 'contact';
    default:
      return 'not-found';
  }
};

const PAGE_TO_PATH_MAP: Record<string, string> = {
  'home': '/',
  'commercial': '/our-services',
  'fleet': '/the-fleet',
  'corporate': '/corporate-accounts',
  'private': '/private-coach-hire',
  'private-luxury': '/private-luxury',
  'wedding-transport': '/wedding-transport',
  'strategic-events': '/strategic-events',
  'strategic-event-logistics': '/strategic-event-logistics',
  'film-tv-logistics': '/film-tv-logistics',
  'mass-transit-shuttles': '/mass-transit-shuttles',
  'workplace-shuttles': '/workplace-shuttles',
  'corporate-roadshows': '/corporate-roadshows',
  'greater-london': '/locations/greater-london',
  'home-counties': '/locations/home-counties',
  'airport-hubs': '/locations/airport-hubs',
  'film-and-events': '/locations/film-and-events',
  'st-albans': '/locations/st-albans',
  'watford': '/locations/watford',
  'hemel': '/locations/hemel-hempstead',
  'luton': '/locations/luton',
  'compliance': '/compliance',
  'about': '/about',
  'blog': '/blog',
  'csr': '/csr',
  'privacy': '/privacy-policy',
  'terms': '/terms',
  'contact': '/contact',
  'locations-index': '/locations',
};

const pageToPath = (page: PageType): string => {
  if (page.startsWith('town-')) return `/coach-hire-${page.slice(5)}`;
  return PAGE_TO_PATH_MAP[page] || '/';
};

const SITE_URL = 'https://www.coaches.business';

/** Resolve title/description for any page, including town pages. */
const getMetaForPage = (page: PageType): { title: string; description: string } => {
  if (page.startsWith('town-')) {
    const town = getTownBySlug(page.slice(5));
    if (town) {
      return {
        title: `Coach Hire ${town.name} | Minibus Hire ${town.name} | UGO`,
        description: town.metaDescription,
      };
    }
  }
  if (page === 'privacy') {
    return { title: 'Privacy Policy | UGO Coach & Minibus Hire', description: 'How UGO Coach & Minibus Hire (Pullman Direct Ltd) collects, uses and protects your personal data.' };
  }
  if (page === 'terms') {
    return { title: 'Terms & Conditions of Hire | UGO Coach & Minibus Hire', description: 'The conditions of hire for Pullman Direct Ltd, trading as UGO Coach & Minibus Hire — deposits, cancellations, passenger safety and more.' };
  }
  if (page === 'contact') {
    return { title: 'Contact Us | UGO Coach & Minibus Hire, St Albans', description: 'Speak directly with our family management team. Call 0845 8333 456, email sasha@coaches.business, or send your journey details for a fast personal quote.' };
  }
  if (page === 'locations-index') {
    return { title: 'Areas We Cover | Coach & Minibus Hire Across Herts, London & Home Counties | UGO', description: 'Every area our family-run coach and minibus fleet serves — St Albans, Watford, Luton, Hemel Hempstead, North London and 20+ towns across the Home Counties.' };
  }
  if (page === 'not-found') {
    return { title: 'Page Not Found | UGO Coach & Minibus Hire', description: 'That page could not be found. Explore our coach and minibus hire services or call 0845 8333 456.' };
  }
  return METADATA_MAP[page] || METADATA_MAP['home'];
};

export default function App() {
  const [currentPage, setCurrentPageState] = useState<PageType>(() => {
    return getPageFromPath(window.location.pathname);
  });

  const setCurrentPage = (page: PageType) => {
    setCurrentPageState(page);
    const path = pageToPath(page);
    if (page !== 'not-found' && window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  /** Navigate helper that also accepts 'path:/some/path' targets (used by
      the town pages' nearby links) and scroll-to-quote requests. */
  const navigateAny = (target: string) => {
    if (target.startsWith('path:')) {
      setCurrentPage(getPageFromPath(target.slice(5)));
      return;
    }
    setCurrentPage(target as PageType);
  };

  const goToQuote = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const formContainer = document.getElementById('smart-quote');
      if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath(window.location.pathname);
      setCurrentPageState(page);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const meta = getMetaForPage(currentPage);
    document.title = meta.title;

    const setMetaByName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const setMetaByProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaByName('description', meta.description);

    // Canonical URL
    const canonicalUrl = SITE_URL + (currentPage === 'not-found' ? window.location.pathname : pageToPath(currentPage));
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Open Graph / Twitter cards
    setMetaByProp('og:title', meta.title);
    setMetaByProp('og:description', meta.description);
    setMetaByProp('og:url', canonicalUrl);
    setMetaByProp('og:type', 'website');
    setMetaByProp('og:site_name', 'UGO Coach & Minibus Hire');
    setMetaByProp('og:image', SITE_URL + '/og-image.jpg');
    setMetaByName('twitter:card', 'summary_large_image');

    // Robots: keep the 404 page out of the index
    setMetaByName('robots', currentPage === 'not-found' ? 'noindex, follow' : 'index, follow');
  }, [currentPage]);

  // Reveal safety net: the scroll-reveal system hides content until an
  // IntersectionObserver fires. If the observer misses (keyboard jumps, fast
  // scrolling, anchor links, observers registered before elements mount),
  // sections stayed invisible — including the footer. This sweep force-reveals
  // anything in or near the viewport, and periodically anything left behind.
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll('.reveal-layer-hidden:not(.reveal-layer-visible)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.25 && r.bottom > -250) {
          el.classList.add('reveal-layer-visible');
        }
      });
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(reveal);
    };
    const warmup = window.setTimeout(reveal, 900);
    const sweeper = window.setInterval(reveal, 2500);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reveal();
    return () => {
      window.clearTimeout(warmup);
      window.clearInterval(sweeper);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [currentPage]);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customVal = (e as CustomEvent).detail?.passengers;
      // Change page to home
      setCurrentPage('home');
      
      // Delay slightly for the DOM to render the home page and its booking form
      setTimeout(() => {
        const formContainer = document.getElementById('smart-quote');
        if (formContainer) {
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Dispatch child custom event to set values
        window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: customVal } }));
      }, 150);
    };

    window.addEventListener('select-capacity-quote-trigger', handleTrigger);
    return () => {
      window.removeEventListener('select-capacity-quote-trigger', handleTrigger);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-alabaster font-sans text-royal-navy">
      <SiteHeader onNavigate={(page) => setCurrentPage(page)} />

      <main>
        <React.Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
        {currentPage === 'home' && (
          <>
            <HeroAndQuoteArea />
            <ElitePedigree />
            <LogisticsArchitectureSection onNavigate={(page) => setCurrentPage(page)} />
            <UGOStandardsGrid />
            <TheDirectRoute />
            <FleetShowroom />
            <BespokeJourneyRunway onNavigate={(page) => setCurrentPage(page)} />
            <LiveAIConciergeHub />
            <InstitutionalTenderBanner />
          </>
        )}
        {currentPage === 'commercial' && (
          <CommercialLogisticsPage onRequestQuote={goToQuote} />
        )}
        {currentPage === 'corporate' && (
          <CorporateFrameworks onNavigateToHomeAndBook={() => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              // Set the passenger capacity preset or hire type preset
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'private' && (
          <PrivateCoachHire onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'wedding-transport' && (
          <WeddingTransport onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Wedding Transport", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'private-luxury' && (
          <PrivateLuxury onNavigateToHomeAndBook={() => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'strategic-events' && (
          <StrategicEvents onNavigateToHomeAndBook={() => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Event Logistics" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'strategic-event-logistics' && (
          <StrategicEventLogistics onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Event Logistics", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'film-tv-logistics' && (
          <FilmTvLogistics onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'mass-transit-shuttles' && (
          <MassTransitShuttles onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'fleet' && (
          <FleetPage />
        )}
        {currentPage === 'workplace-shuttles' && (
          <WorkplaceShuttles onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: "Workplace Shuttle" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'corporate-roadshows' && (
          <CorporateRoadshows onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: "Corporate Roadshow" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'greater-london' && (
          <GreaterLondon onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'home-counties' && (
          <HomeCountiesNetwork onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'airport-hubs' && (
          <AirportHubs onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'film-and-events' && (
          <NationwideFilmEvents onNavigateToHomeAndBook={(journeyType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { passengers: "Private & Corporate Hire", journeyType: journeyType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'st-albans' && (
          <StAlbansBase onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: "St Albans Base, Hertfordshire (AL2)" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'watford' && (
          <WatfordElstreeHub onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: "Warner Bros. Studios, Leavesden" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'hemel' && (
          <HemelHempsteadCore onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: "Hemel Hempstead Core" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'luton' && (
          <LutonRegionalAccess onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: "Luton Airport, Luton" } }));
            }, 150);
          }} />
        )}
        {currentPage === 'compliance' && (
          <FleetCompliance onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: targetType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'about' && (
          <AboutOurBrand onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: targetType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'blog' && (
          <TransportLogisticsBlog onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: targetType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'csr' && (
          <CorporateResponsibility onNavigateToHomeAndBook={(targetType) => {
            setCurrentPage('home');
            setTimeout(() => {
              const formContainer = document.getElementById('smart-quote');
              if (formContainer) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              window.dispatchEvent(new CustomEvent('booking-preselect-passengers', { detail: { pickup: targetType } }));
            }, 150);
          }} />
        )}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsOfService />}
        {currentPage === 'contact' && <ContactPage onRequestQuote={goToQuote} />}
        {currentPage === 'locations-index' && (
          <LocationsIndex onNavigate={(page) => navigateAny(page)} />
        )}
        {currentPage === 'not-found' && (
          <NotFoundPage onNavigate={(page) => navigateAny(page)} />
        )}
        {currentPage.startsWith('town-') && (() => {
          const town = getTownBySlug(currentPage.slice(5));
          return town ? (
            <TownLandingPage
              town={town}
              onNavigate={(page) => navigateAny(page)}
              onRequestQuote={goToQuote}
            />
          ) : (
            <NotFoundPage onNavigate={(page) => navigateAny(page)} />
          );
        })()}
        </React.Suspense>
      </main>

      <ConciergeChat />
      
      <PremiumFooterSection onNavigate={(page) => setCurrentPage(page)} />
    </div>
  );
}

