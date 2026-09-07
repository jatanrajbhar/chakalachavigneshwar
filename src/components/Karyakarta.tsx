import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";

/** An eagerly globbed image asset — Vite exports the resolved URL as default. */
type ImageModule = { default: string };
type ImageModules = Record<string, ImageModule>;

// Load all karayakarta images from `src/assets/karayakarta`
const karayaModules = import.meta.glob('../assets/karayakarta/*.{jpg,jpeg,png,webp}', { eager: true }) as ImageModules;

// Load all Mahila Sabhasad images from `src/assets/mahila_sabhasad`
const mahilaModules = import.meta.glob('../assets/mahila_sabhasad/*.{jpg,jpeg,png,webp}', { eager: true }) as ImageModules;

const findImageForName = (name: string, modules: ImageModules) => {
  const first = name.split(/\s+/)[0].toLowerCase();
  const compact = name.replace(/\s+/g, "").toLowerCase();
  // Prefer compact (full name) match over first name match to avoid conflicts
  const key = Object.keys(modules).find((p) => {
    return p.toLowerCase().includes(compact);
  }) || Object.keys(modules).find((p) => {
    return p.toLowerCase().includes(first);
  });
  return key ? modules[key].default : null;
};

const teamMembers = [
  "Aryan Gupta",
  "Anirudh",
  "Prashant Mirekar",
  "Yagn Panchal",
  "Yaksh Panchal",
  "Kushal Gupta",
  "Rahul Gupta",
  "Sandeep Goud",
  "Aman Gupta",
  "Sahil Rajbhar",
  "Jay Mistry",
  "Ganesh Gupta",
  // Placing requested Sabhasad profiles at positions 13–20
  "Sahil Halwai",
  "Anish Gupta",
  "Akash Mukharji",
  "Pranay Pawar",
  "Anand Anpathe",
  "Arvind Prabhulkar",
  "Sahil Naik",
  "Piyush Ayaram",
  "Aniket Gupta",
  // Remaining original members (shifted after the inserted block)
  "Larry Dsilva",
  "Pratik Gawale",
  "Pritam Gupta",
  "Pankaj Gupta",
  "Raju Kandu",
  "Vicky Gupta",
  "Ganesh M",
  "Vikas Jaiswar",
  "Sagar Halwai",
  "Jitendra Gupta",
  "Ramesh Dasari",
  "Vishal Gupta",
  "Jatan Rajbhar",
  "Prasad pawar",
].map((name, i) => ({
  id: i + 1,
  name,
  image: findImageForName(name, karayaModules),
}));

// Mahila Sabhasad (explicit name -> filename map, since several photo
// filenames use different spellings than the requested names)
const mahilaMembersData: { name: string; file: string }[] = [
  { name: "Riya Rajbhar", file: "Riya.jpeg" },
  { name: "Mahima Rajbhar", file: "Mahima.jpeg" },
  { name: "Anushka Gupta", file: "Anushka gupta.jpeg" },
  { name: "Priyanka Rathod", file: "Priyanka Rathod.jpeg" },
  { name: "Heena Gupta", file: "Heena Gupta.jpeg" },
  { name: "Nandini Kandu", file: "Nandani Kandu.jpeg" },
  { name: "Kareena Gupta", file: "Kareena Gupta.jpeg" },
  { name: "Nandani Gupta", file: "Nadadini Gupta.jpeg" },
  { name: "Saumya Gupta", file: "soumiya gupta.jpeg" },
  { name: "Rishika Gupta", file: "Rishika GUpta.jpeg" },
];

const findImageByFile = (file: string, modules: ImageModules) => {
  const key = Object.keys(modules).find((p) =>
    p.toLowerCase().endsWith(file.toLowerCase())
  );
  return key ? modules[key].default : null;
};

const mahilaSabhasadMembers = mahilaMembersData.map((m, i) => ({
  id: i + 1,
  name: m.name,
  image: findImageByFile(m.file, mahilaModules),
}));

// Ensure `Sahil Naik` uses the exact provided photo if it's present in the assets
(() => {
  const target = Object.keys(karayaModules).find((p) =>
    p.toLowerCase().endsWith("sahil naik.jpeg")
  );
  if (target) {
    const img = karayaModules[target].default;
    const idx = teamMembers.findIndex((m) => m.name === "Sahil Naik");
    if (idx !== -1) teamMembers[idx].image = img;
  }
})();

// Ensure `Sahil Rajbhar` uses the exact provided photo
(() => {
  const target = Object.keys(karayaModules).find((p) =>
    p.toLowerCase().endsWith("sahil rajbhar.jpeg")
  );
  if (target) {
    const img = karayaModules[target].default;
    const idx = teamMembers.findIndex((m) => m.name === "Sahil Rajbhar");
    if (idx !== -1) teamMembers[idx].image = img;
  }
})();

/** Total people listed on the page, surfaced in the About stats strip. */
export const sabhasadCount = teamMembers.length + mahilaSabhasadMembers.length;

interface Member {
  id: number;
  name: string;
  image: string | null;
}

const MemberGrid = ({
  members,
  isInView,
}: {
  members: Member[];
  isInView: boolean;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
    {members.map((member, index) => (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.6) }}
        className="group"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted border border-[hsl(var(--gold-soft))]/15 transition-all duration-300 hover:border-[hsl(var(--gold-soft))]/50 hover:-translate-y-1 shadow-lg hover:shadow-crimson">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card">
              <User className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}

          {/* Scrim so the name stays readable over any photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

          {/* Gold wash on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Name */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-sm font-medium text-foreground text-center truncate">
              {member.name}
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const Karyakarta = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="karyakarta" className="relative py-20 md:py-28 overflow-hidden">
      {/* Rangoli dot wash */}
      <div className="absolute inset-0 bg-rangoli-dots opacity-[0.07] pointer-events-none" />

      <div ref={containerRef} className="section-container relative z-10">
        <SectionHeading
          kicker={t.kickerSabhasad}
          title={<span className="text-gold-leaf">{t.sabhasadTitle}</span>}
          subtitle={t.sabhasadSubtitle}
          className="mb-14"
        />

        <MemberGrid members={teamMembers} isInView={isInView} />

        <SectionHeading
          kicker={t.kickerMahila}
          title={<span className="text-gold-leaf">{t.mahilaSabhasadTitle}</span>}
          subtitle={t.mahilaSabhasadSubtitle}
          className="mt-24 mb-14"
        />

        <MemberGrid members={mahilaSabhasadMembers} isInView={isInView} />
      </div>
    </section>
  );
};

export default Karyakarta;
