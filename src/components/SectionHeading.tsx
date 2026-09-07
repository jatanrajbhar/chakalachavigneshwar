import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/ornaments/Divider";
import { labelClasses } from "@/lib/script";

interface SectionHeadingProps {
  /** Small Devanagari label above the title */
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

/**
 * Shared section header: Devanagari kicker, display title, lotus rule and
 * an optional subtitle. Keeps every section on the same vertical rhythm.
 */
const SectionHeading = ({
  kicker,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6 }}
    className={`text-center ${className}`}
  >
    {kicker && (
      <p className={`section-kicker font-devanagari mb-3 ${labelClasses(kicker)}`}>
        <span className="h-px w-6 bg-[hsl(var(--gold-soft))]/50" />
        {kicker}
        <span className="h-px w-6 bg-[hsl(var(--gold-soft))]/50" />
      </p>
    )}

    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
      {title}
    </h2>

    <Divider className="mx-auto mt-5 h-6 w-52 md:w-60" />

    {subtitle && (
      <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-4">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
