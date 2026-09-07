import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

/** An eagerly globbed image asset — Vite exports the resolved URL as default. */
type ImageModule = { default: string };

// Load all images placed in `src/assets/ganesh utsav` (year-wise uploads)
const ganeshModules = import.meta.glob('../assets/ganesh utsav/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, ImageModule>;

const getImageForYear = (year: string) => {
  const key = Object.keys(ganeshModules).find((p) => p.includes(year));
  return key ? ganeshModules[key].default : null;
};

const years = [
  { year: "2017", image: getImageForYear("2017") },
  { year: "2018", image: getImageForYear("2018") },
  { year: "2019", image: getImageForYear("2019") },
  // removed 2020 and 2021 as requested
  { year: "2022", image: getImageForYear("2022") },
  { year: "2023", image: getImageForYear("2023") },
  { year: "2024", image: getImageForYear("2024") },
  { year: "2025", image: getImageForYear("2025") },
];

/** Only years that actually have a photo can be opened in the lightbox. */
const viewable = years.filter((y) => y.image);

const GaneshUtsav = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback((delta: number) => {
    setActiveIndex((current) =>
      current === null
        ? current
        : (current + delta + viewable.length) % viewable.length
    );
  }, []);

  // Keyboard control and scroll lock while the lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : viewable[activeIndex];

  return (
    <section
      id="ganesh-utsav"
      className="relative py-20 md:py-28 bg-gradient-dark overflow-hidden"
    >
      {/* Warm bloom behind the grid */}
      <div className="absolute inset-0 bg-ember-glow pointer-events-none" />

      <div ref={containerRef} className="section-container relative z-10">
        <SectionHeading
          kicker={t.kickerGanesh}
          title={
            <>
              <span className="text-foreground">{t.ganeshTitle1}</span>{" "}
              <span className="text-gradient-saffron">{t.ganeshTitle2}</span>
            </>
          }
          subtitle={t.ganeshSubtitle}
          className="mb-14"
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((item, index) => {
            const lightboxIndex = viewable.findIndex((v) => v.year === item.year);
            const openable = lightboxIndex !== -1;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.5) }}
              >
                <button
                  type="button"
                  onClick={() => openable && setActiveIndex(lightboxIndex)}
                  disabled={!openable}
                  aria-label={`Ganesh Utsav ${item.year}`}
                  className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[hsl(var(--gold-soft))]/15 transition-all duration-300 hover:border-[hsl(var(--gold-soft))]/50 enabled:hover:-translate-y-1 disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`Ganesh Utsav ${item.year}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
                      <span className="text-muted-foreground/50 text-sm">
                        {t.ganeshPhotoSoon}
                      </span>
                    </div>
                  )}

                  {/* Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Year plaque */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-4 py-1.5 rounded-lg bg-background/70 backdrop-blur-sm border border-[hsl(var(--gold-soft))]/40">
                      <span className="text-xl md:text-2xl font-display font-bold text-gold-leaf">
                        {item.year}
                      </span>
                    </span>
                  </div>

                  {/* Expand affordance */}
                  {openable && (
                    <span className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-[hsl(var(--gold-soft))]/30 text-[hsl(var(--gold-soft))] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Expand className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Ganesh Utsav ${active.year}`}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full border border-[hsl(var(--gold-soft))]/30 text-[hsl(var(--gold-soft))] hover:bg-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous / Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous year"
              className="absolute left-3 md:left-8 grid place-items-center w-11 h-11 rounded-full border border-[hsl(var(--gold-soft))]/30 text-[hsl(var(--gold-soft))] hover:bg-card transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next year"
              className="absolute right-3 md:right-8 grid place-items-center w-11 h-11 rounded-full border border-[hsl(var(--gold-soft))]/30 text-[hsl(var(--gold-soft))] hover:bg-card transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.figure
              key={active.year}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={active.image}
                alt={`Ganesh Utsav ${active.year}`}
                className="w-full max-h-[76vh] object-contain rounded-2xl border border-[hsl(var(--gold-soft))]/25"
              />
              <figcaption className="mt-4 text-center">
                <span className="text-2xl md:text-3xl font-display font-bold text-gold-leaf">
                  {active.year}
                </span>
                <span className="block text-sm text-muted-foreground mt-1">
                  {t.ganeshTitle1} {t.ganeshTitle2}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GaneshUtsav;
