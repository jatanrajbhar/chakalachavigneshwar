import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoIcon from "@/assets/logo-icon.png";
import Toran from "@/components/ornaments/Toran";

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t.navAbout, href: "#about" },
    { label: t.navGaneshUtsav, href: "#ganesh-utsav" },
    { label: t.navSabhasad, href: "#karyakarta" },
    { label: t.navContact, href: "#contact" },
    { label: t.navDonation, href: "#donation" },
  ];

  return (
    <footer className="relative pt-20 pb-16 bg-card border-t border-[hsl(var(--gold-soft))]/20 overflow-hidden">
      {/* Festoon hanging into the footer */}
      <div className="absolute inset-x-0 top-0">
        <Toran opacity={0.4} />
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src={logoIcon}
          alt=""
          className="absolute -right-20 -bottom-20 w-80 h-80 object-contain"
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={logoIcon}
              alt="Chakala Cha Vighneshwar"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-display font-bold text-gradient-saffron mb-2">
              Chakala Cha Vighneshwar
            </h3>
            <p className="font-devanagari text-sm text-muted-foreground">
              चकाला सार्वजनिक गणेश उत्सव मंडळ
            </p>
            <p className="font-devanagari text-sm text-[hsl(var(--gold-soft))]/80 mt-4">
              {t.heroInvocation}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t.footerGetInTouch}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/chakala_cha_vigneshwar_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  @chakala_cha_vigneshwar_
                </a>
              </li>
              <li>
                <a
                  href="mailto:chakalachavigneshwar99@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  chakalachavigneshwar99@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/V5FaN12UAk3E1q9x8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-secondary transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Chakala, Andheri East, Mumbai</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold-soft))]/35 to-transparent mb-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <p>
            © {currentYear} Chakala Cha Vighneshwar. {t.footerRights}
          </p>
          <p className="flex items-center gap-1">
            {t.footerMadeWith} <Heart className="w-4 h-4 text-secondary fill-secondary" /> {t.footerBy}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
