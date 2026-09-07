interface ToranProps {
  className?: string;
  /** Hang the festoon upward, for use as a bottom border */
  flipped?: boolean;
  /** Opacity of the whole festoon */
  opacity?: number;
}

const GOLD = "#e4cc8b";

/** One 120x46 tile of the festoon, repeated horizontally by CSS. */
const tile = `
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="46" viewBox="0 0 120 46" fill="none">
  <path d="M0 5 H120" stroke="${GOLD}" stroke-width="1.2" opacity="0.75"/>
  <path d="M0 5 Q30 28 60 5" stroke="${GOLD}" stroke-width="1.1" opacity="0.6"/>
  <path d="M60 5 Q90 28 120 5" stroke="${GOLD}" stroke-width="1.1" opacity="0.6"/>
  <circle cx="0" cy="5" r="2.2" fill="${GOLD}" opacity="0.85"/>
  <circle cx="60" cy="5" r="2.2" fill="${GOLD}" opacity="0.85"/>
  <circle cx="120" cy="5" r="2.2" fill="${GOLD}" opacity="0.85"/>
  <path d="M30 24 C 23.5 30, 23.5 39, 30 44 C 36.5 39, 36.5 30, 30 24 Z" fill="${GOLD}" opacity="0.5"/>
  <path d="M90 24 V32" stroke="${GOLD}" stroke-width="1" opacity="0.7"/>
  <circle cx="90" cy="36" r="4" fill="${GOLD}" opacity="0.55"/>
</svg>`;

const toranUrl = `url("data:image/svg+xml,${encodeURIComponent(tile.trim())}")`;

/**
 * Toran — the mango-leaf festoon strung across a doorway during Ganesh
 * Utsav. Repeats horizontally at a fixed tile size, so the motif keeps its
 * proportions on any screen width.
 */
const Toran = ({ className = "", flipped = false, opacity = 1 }: ToranProps) => (
  <div
    aria-hidden="true"
    className={`h-[46px] w-full pointer-events-none ${className}`}
    style={{
      backgroundImage: toranUrl,
      backgroundRepeat: "repeat-x",
      backgroundSize: "120px 46px",
      transform: flipped ? "scaleY(-1)" : undefined,
      opacity,
    }}
  />
);

export default Toran;
