import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// Stores the epoch ms when the current 57-min cycle began.
// On reload, we compute position = elapsed % CYCLE so it is
// mathematically impossible to exceed 57:00.
const TIMER_KEY = "zip_cycle_start";
const CYCLE_SECONDS = 57 * 60; // 3420 s

const getCycleStart = (): number => {
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    if (raw) {
      const ts = parseInt(raw, 10);
      if (!isNaN(ts) && ts > 0) return ts;
    }
  } catch (_e) { /* ignore */ }
  const now = Date.now();
  try { localStorage.setItem(TIMER_KEY, String(now)); } catch (_e) { /* ignore */ }
  return now;
};

const secondsFromCycle = (): number => {
  const start = getCycleStart();
  const elapsed = Math.floor((Date.now() - start) / 1000);
  // modulo keeps us inside [0, CYCLE_SECONDS)
  return Math.max(0, CYCLE_SECONDS - (elapsed % CYCLE_SECONDS));
};

const Stopwatch = () => {
  const [remaining, setRemaining] = useState(secondsFromCycle);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  useEffect(() => {
    const delay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setRemaining(secondsFromCycle());
      }, 1000);
    }, 1500);
    return () => {
      clearTimeout(delay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
      <div className="relative glass-card neon-border p-8 sm:p-12 rounded-3xl">
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <motion.span
            key={`min-${minutes}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="font-display text-7xl sm:text-9xl font-bold text-primary tabular-nums"
          >
            {pad(minutes)}
          </motion.span>
          <span className="font-display text-7xl sm:text-9xl font-bold text-primary animate-pulse-neon">:</span>
          <motion.span
            key={`sec-${seconds}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="font-display text-7xl sm:text-9xl font-bold text-primary tabular-nums"
          >
            {pad(seconds)}
          </motion.span>
        </div>
        <p className="text-center text-muted-foreground mt-4 font-body text-sm">
          Tiempo para transformar tu negocio
        </p>
      </div>
    </div>
  );
};

const AnimatedCounter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById(`counter-${label}`);
    if (el) observer.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [target, label]);

  return (
    <div id={`counter-${label}`} className="text-center">
      <span className="font-display text-4xl sm:text-5xl font-bold text-secondary">{count}+</span>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
          <Zap size={14} className="text-primary" />
          <span className="text-xs font-medium text-muted-foreground">ZipAutomation Studios</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
          REVOLUCIÓN DIGITAL{" "}
          <span className="text-gradient-gold">+57</span>
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mt-6 font-body">
          Visitamos negocios increíbles que nadie encuentra en internet…
          y los hacemos <span className="text-foreground font-semibold">visibles en 57 minutos.</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 mb-12"
      >
        <Stopwatch />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-8 sm:gap-16 relative z-10"
      >
        <AnimatedCounter target={3} label="Negocios Rescatados" />
        <AnimatedCounter target={1} label="Ciudades" />
        <AnimatedCounter target={98} label="% Satisfacción" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-12 relative z-10"
      >
        <a href="#contacto" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-display font-bold text-lg hover:brightness-110 transition neon-glow flex items-center gap-2 justify-center">
          <Timer size={20} />
          ¡Rescata mi Negocio!
        </a>
        <a href="#proceso" className="glass-card neon-border px-8 py-4 rounded-xl font-display font-semibold text-foreground text-lg hover:bg-muted/50 transition flex items-center gap-2 justify-center">
          <Globe size={20} />
          Ver Proceso
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
