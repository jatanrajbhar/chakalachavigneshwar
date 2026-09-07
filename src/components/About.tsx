import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import ganeshLights from "@/assets/ganesh-lights.jpg";
import rajComputersLogo from "@/assets/sponsors/Raj Computers.webp";
import primeComputersLogo from "@/assets/sponsors/pride computers.png";
import SectionHeading from "@/components/SectionHeading";
import Mandala from "@/components/ornaments/Mandala";
import { sabhasadCount } from "@/components/Karyakarta";
import { labelClasses } from "@/lib/script";

const partners = [
  { name: "Raj Computers", logo: rajComputersLogo },
  { name: "Prime Computers", logo: primeComputersLogo },
];

const About = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const stats = [
    { value: "10+", label: t.statsYears },
    { value: `${sabhasadCount}`, label: t.statsMembers },
    { value: "5", label: t.statsFounders },
  ];

  return (
    <section ref={ref} id="about" className="relative py-20 md:py-28 overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10">
        <img
          src={ganeshLights}
          alt="Ganesh celebration"
          className="w-full h-[130%] object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </motion.div>

      {/* Corner mandala */}
      <Mandala
        className="absolute -left-40 top-16 w-[28rem] text-[hsl(var(--gold-soft))]/[0.05] animate-spin-slow pointer-events-none"
        petals={20}
      />

      <div ref={containerRef} className="section-container relative z-10">
        <SectionHeading
          kicker={t.kickerAbout}
          title={
            <>
              <span className="text-gradient-saffron">{t.aboutTitle1}</span>{" "}
              <span className="text-foreground">{t.aboutTitle2}</span>
            </>
          }
          className="mb-14"
        />

        <div className="max-w-4xl mx-auto text-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-ornate p-8 md:p-12"
          >
            {/* Gold corner ticks */}
            <span className="absolute left-5 top-5 h-5 w-5 border-l border-t border-[hsl(var(--gold-soft))]/40 rounded-tl" />
            <span className="absolute right-5 top-5 h-5 w-5 border-r border-t border-[hsl(var(--gold-soft))]/40 rounded-tr" />
            <span className="absolute left-5 bottom-5 h-5 w-5 border-l border-b border-[hsl(var(--gold-soft))]/40 rounded-bl" />
            <span className="absolute right-5 bottom-5 h-5 w-5 border-r border-b border-[hsl(var(--gold-soft))]/40 rounded-br" />

            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-body">
              {t.aboutPara1Start}
              <span className="text-secondary font-semibold">
                {t.aboutMandalName}
              </span>
              {t.aboutPara1Mid}
              <span className="text-accent font-semibold">{t.aboutYouthLed}</span>
              {t.aboutPara1End}
            </p>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold-soft))]/40 to-transparent" />

            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-body">
              <span className="text-secondary font-semibold">
                {t.aboutCcvName}
              </span>
              {t.aboutPara2}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 grid grid-cols-3 divide-x divide-[hsl(var(--gold-soft))]/15 rounded-2xl border border-[hsl(var(--gold-soft))]/15 bg-card/40 backdrop-blur-sm py-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 md:px-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl md:text-5xl font-display font-bold text-gold-leaf animate-shimmer">
                    {stat.value}
                  </span>
                  <span
                    className={`mt-1 block text-muted-foreground ${labelClasses(
                      stat.label,
                      "uppercase tracking-[0.18em] text-[0.7rem] md:text-xs"
                    )}`}
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Official Partners */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16"
          >
            <p
              className={`section-kicker justify-center mb-6 ${labelClasses(
                t.aboutPartnersTitle
              )}`}
            >
              <span className="h-px w-6 bg-[hsl(var(--gold-soft))]/50" />
              {t.aboutPartnersTitle}
              <span className="h-px w-6 bg-[hsl(var(--gold-soft))]/50" />
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="card-ornate group flex items-center justify-center px-6 py-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 md:h-16 w-auto object-contain opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
