import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Images, CalendarHeart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import heroImage from "@/assets/ganesh-hero.jpg";
import logoMain from "@/assets/logo-main.png";
import Mandala from "@/components/ornaments/Mandala";
import Toran from "@/components/ornaments/Toran";

const Hero = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Raw scrollYProgress jumps in large per-frame steps on a fast flick
  // scroll, which reads as glitching once it drives translateY/opacity on
  // the photo, logo and text. Spring-smoothing it (as Header already does
  // for its progress bar) makes those follow the scroll instead of snapping.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "45%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Parallax photograph */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -top-20">
        <img
          src={heroImage}
          alt="Chakala Cha Vighneshwar"
          className="w-full h-[120%] object-cover object-top brightness-[1.15]"
        />
        {/* Scrims: keep type legible without burying the idol. Kept light —
            the photograph is already a night shot. */}
        <div className="absolute inset-0 bg-background/15" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />
        {/* Deep base fade — the name, location and buttons sit in this band,
            so it has to carry them over the garlands. */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-background via-background/85 to-transparent" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 45%, hsl(var(--background) / 0.6) 100%)",
          }}
        />
      </motion.div>

      {/* Festoon across the top */}
      <div className="absolute inset-x-0 top-20 z-20">
        <Toran opacity={0.55} />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-28"
      >
        {/* Invocation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-devanagari text-base md:text-xl text-[hsl(var(--gold-soft))] tracking-wide mb-4 text-shadow-ember"
        >
          {t.heroInvocation}
        </motion.p>

        {/* Logo inside counter-rotating mandala rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center my-2"
        >
          {/* Ember bloom */}
          <div className="absolute w-[130%] aspect-square rounded-full bg-secondary/20 blur-3xl" />

          {/* will-change-transform promotes these to their own GPU layer, so
              the continuous rotate is a cheap composite instead of a
              software repaint of the whole SVG every frame — the biggest
              single cause of Android jank here. */}
          <Mandala
            className="absolute w-[168%] max-w-none aspect-square text-[hsl(var(--gold-soft))]/25 animate-spin-slow will-change-transform"
            petals={28}
          />
          <Mandala
            className="absolute w-[128%] max-w-none aspect-square text-secondary/20 animate-spin-slow-reverse will-change-transform"
            petals={16}
          />

          <div className="animate-float will-change-transform">
            <img
              src={logoMain}
              alt="Chakala Cha Vighneshwar"
              className="relative w-52 sm:w-64 md:w-80 lg:w-[22rem] drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Mandal name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-lg md:text-2xl font-display text-foreground/90 text-shadow-ember"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-3 flex items-center gap-2 text-xs sm:text-sm md:text-base text-foreground/70 uppercase tracking-[0.1em] sm:tracking-[0.2em]"
        >
          <MapPin className="w-4 h-4 text-secondary" />
          {t.heroLocation}
        </motion.p>

        {/* Calls to action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.74 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#ganesh-utsav"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-saffron font-semibold text-secondary-foreground shadow-gold transition-transform duration-300 hover:scale-105"
          >
            <Images className="w-4 h-4" />
            {t.heroCtaGallery}
          </a>
          <a
            href="#contact"
            // backdrop-blur-sm stays constant on hover — animating the
            // background's opacity underneath a backdrop-filter forces a
            // full blur resample every transition frame, which is brutal
            // on Android. Only border/text color change now.
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[hsl(var(--gold-soft))]/40 bg-background/40 backdrop-blur-sm font-medium text-[hsl(var(--gold-soft))] transition-colors duration-300 hover:border-[hsl(var(--gold-soft))]/80 hover:text-secondary"
          >
            <CalendarHeart className="w-4 h-4" />
            {t.heroCtaVisit}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-foreground/50 hover:text-secondary transition-colors"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em] mb-2">
            {t.heroScroll}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-9 border border-current rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1 h-1.5 bg-current rounded-full"
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
