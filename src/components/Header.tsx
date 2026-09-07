import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoWhite from "@/assets/ccv-white.png";

const Header = () => {
  const { t, lang, toggle } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { label: t.navAbout, href: "#about" },
    { label: t.navGaneshUtsav, href: "#ganesh-utsav" },
    { label: t.navSabhasad, href: "#karyakarta" },
    { label: t.navContact, href: "#contact" },
    { label: t.navDonation, href: "#donation" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight whichever section is crossing the middle of the viewport
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // navItems is rebuilt each render but the hrefs never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-lg border-b border-[hsl(var(--gold-soft))]/20"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <img
              src={logoWhite}
              alt="Chakala Cha Vighneshwar"
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeId === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-secondary"
                        : "text-foreground/75 hover:text-secondary"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute left-3 right-3 -bottom-0.5 h-px bg-gold-leaf"
                      />
                    )}
                  </a>
                </li>
              );
            })}
            <li className="ml-2">
              <button
                onClick={toggle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[hsl(var(--gold-soft))]/40 bg-secondary/10 hover:bg-secondary/20 hover:border-[hsl(var(--gold-soft))]/70 text-[hsl(var(--gold-soft))] transition-all duration-300 text-sm font-medium"
                aria-label="Toggle language"
              >
                <Languages className="w-4 h-4" />
                {lang === "en" ? "मराठी" : "ENG"}
              </button>
            </li>
          </ul>

          {/* Mobile: Language + Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              className="px-3 py-1.5 rounded-full border border-[hsl(var(--gold-soft))]/40 bg-secondary/10 text-[hsl(var(--gold-soft))] text-xs font-medium"
              aria-label="Toggle language"
            >
              {lang === "en" ? "मराठी" : "ENG"}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gold-leaf"
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-b border-[hsl(var(--gold-soft))]/20 overflow-hidden"
          >
            <ul className="section-container py-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-2.5 font-medium uppercase tracking-wider transition-colors ${
                      activeId === item.href
                        ? "text-secondary"
                        : "text-foreground/80 hover:text-secondary"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full transition-colors ${
                        activeId === item.href
                          ? "bg-secondary"
                          : "bg-[hsl(var(--gold-soft))]/40"
                      }`}
                    />
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
