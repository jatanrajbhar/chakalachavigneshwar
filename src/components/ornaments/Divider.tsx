interface DividerProps {
  className?: string;
}

/**
 * Ornamental section rule: a lotus bud flanked by tapering gold hairlines
 * and beads. Replaces the plain bar under section titles.
 */
const Divider = ({ className = "" }: DividerProps) => (
  <svg
    viewBox="0 0 240 28"
    className={`text-[hsl(var(--gold-soft))] ${className}`}
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="ccv-divider-left" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="ccv-divider-right" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Tapering rules */}
    <path d="M6 14 H84" stroke="url(#ccv-divider-left)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M156 14 H234" stroke="url(#ccv-divider-right)" strokeWidth="1.4" strokeLinecap="round" />

    {/* Beads */}
    <circle cx="92" cy="14" r="2.4" fill="currentColor" opacity="0.85" />
    <circle cx="148" cy="14" r="2.4" fill="currentColor" opacity="0.85" />

    {/* Side leaves */}
    <path
      d="M100 14 C 106 8, 112 8, 116 14 C 112 20, 106 20, 100 14 Z"
      stroke="currentColor"
      strokeWidth="1.1"
      opacity="0.8"
    />
    <path
      d="M140 14 C 134 8, 128 8, 124 14 C 128 20, 134 20, 140 14 Z"
      stroke="currentColor"
      strokeWidth="1.1"
      opacity="0.8"
    />

    {/* Centre lotus bud */}
    <path
      d="M120 3 C 126 9, 128 15, 120 25 C 112 15, 114 9, 120 3 Z"
      fill="currentColor"
      opacity="0.95"
    />
  </svg>
);

export default Divider;
