import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Instagram, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const contactInfo = [
    {
      icon: MapPin,
      label: t.contactLocation,
      value: "5, Dr Karanjia Marg, Tarun Bharat Society, Chakala, Andheri East, Mumbai, Maharashtra 400099",
      link: "https://maps.app.goo.gl/V5FaN12UAk3E1q9x8",
    },
    {
      icon: Instagram,
      label: t.contactInstagram,
      value: "@chakala_cha_vigneshwar_",
      link: "https://instagram.com/chakala_cha_vigneshwar_",
    },
    {
      icon: Mail,
      label: t.contactEmail,
      value: "chakalachavigneshwar99@gmail.com",
      link: "mailto:chakalachavigneshwar99@gmail.com",
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-gradient-dark">
      <div ref={containerRef} className="section-container overflow-hidden">
        <SectionHeading
          kicker={t.kickerContact}
          title={
            <>
              <span className="text-foreground">{t.contactTitle1}</span>{" "}
              <span className="text-gradient-saffron">{t.contactTitle2}</span>
            </>
          }
          subtitle={t.contactSubtitle}
          className="mb-14"
        />

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 pr-4 lg:pr-0">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-full rounded-2xl overflow-hidden border border-[hsl(var(--gold-soft))]/20 shadow-crimson aspect-square lg:aspect-auto lg:h-full lg:min-h-[400px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=19.108104819234075,72.86032781792542&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chakala Cha Vighneshwar Location"
              className="absolute inset-0"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-ornate group flex items-start gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-saffron flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-foreground font-medium group-hover:text-secondary transition-colors">
                    {item.value}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0" />
              </motion.a>
            ))}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mt-8 p-8 bg-gradient-crimson rounded-2xl text-center overflow-hidden border border-[hsl(var(--gold-soft))]/25"
            >
              {/* Rangoli wash */}
              <div className="absolute inset-0 bg-rangoli-dots opacity-[0.12] pointer-events-none" />

              <p className="relative font-devanagari text-2xl md:text-3xl text-[hsl(var(--gold-soft))] mb-3">
                गणपती बाप्पा मोरया!
              </p>
              <p className="relative text-sm text-foreground/85">
                {t.contactCta}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
