interface MandalaProps {
  className?: string;
  /** Number of petals in the outer ring */
  petals?: number;
}

/**
 * Concentric mandala ring drawn as vector art, used as a decorative
 * backdrop behind the logo and section corners. Purely ornamental, so it
 * is hidden from assistive tech.
 */
const Mandala = ({ className = "", petals = 24 }: MandalaProps) => {
  const petalAngles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  const dotAngles = Array.from({ length: petals * 2 }, (_, i) => (360 / (petals * 2)) * i);

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer hairlines */}
      <circle cx="200" cy="200" r="196" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="200" cy="200" r="188" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />

      {/* Beaded ring */}
      {dotAngles.map((angle) => (
        <circle
          key={`dot-${angle}`}
          cx="200"
          cy="18"
          r="2.2"
          fill="currentColor"
          opacity="0.75"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}

      {/* Lotus petal ring */}
      {petalAngles.map((angle) => (
        <path
          key={`petal-${angle}`}
          d="M200 44 C 214 74, 214 104, 200 130 C 186 104, 186 74, 200 44 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.65"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}

      {/* Inner rings */}
      <circle cx="200" cy="200" r="128" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />

      {/* Inner petal ring, offset by half a step */}
      {petalAngles.map((angle) => (
        <path
          key={`inner-${angle}`}
          d="M200 128 C 209 148, 209 166, 200 182 C 191 166, 191 148, 200 128 Z"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.4"
          transform={`rotate(${angle + 360 / petals / 2} 200 200)`}
        />
      ))}

      <circle cx="200" cy="200" r="74" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default Mandala;
