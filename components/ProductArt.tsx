/**
 * Illustrated stand-in for product photography (PRD §4 asks for real photos —
 * replace with <Image> once product photography is supplied).
 */
export function ProductArt({ name, tone, roast, large = false, image }: { name: string; tone: [string, string]; roast?: string | null; large?: boolean; image?: string }) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="product-art product-photo" src={image} alt={`${name} coffee`} loading={large ? "eager" : "lazy"} />
    );
  }
  const [light, dark] = tone;
  const id = name.replace(/\W+/g, "");
  return (
    <svg
      className="product-art"
      viewBox="0 0 400 400"
      role="img"
      aria-label={`${name} coffee bag illustration`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor={light} stopOpacity="0.55" />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
        <linearGradient id={`bag-${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#EADBC4" />
          <stop offset="55%" stopColor="#F5EBDC" />
          <stop offset="100%" stopColor="#D9C4A6" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#bg-${id})`} />
      {/* scattered beans */}
      {[
        [60, 320, 20], [330, 300, -30], [90, 80, 45], [320, 90, 10], [40, 200, -60], [360, 210, 70],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`} opacity="0.85">
          <ellipse rx="16" ry="11" fill={dark} />
          <path d="M-13 0 Q0 -5 13 0" stroke={light} strokeWidth="2" fill="none" opacity="0.6" />
        </g>
      ))}
      {/* bag */}
      <g transform="translate(200 215)">
        <ellipse cx="0" cy="118" rx="98" ry="12" fill="#000" opacity="0.25" />
        <path d="M-88 -120 L88 -120 L96 112 Q0 124 -96 112 Z" fill={`url(#bag-${id})`} />
        <path d="M-88 -120 L88 -120 L84 -100 L-84 -100 Z" fill={dark} opacity="0.9" />
        <rect x="-62" y="-60" width="124" height="120" rx="4" fill="none" stroke={dark} strokeWidth="2" />
        <circle cx="0" cy="-22" r="18" fill="none" stroke={dark} strokeWidth="2" />
        <path d="M-7 -22 Q0 -34 7 -22 Q0 -10 -7 -22" fill={dark} />
        <text x="0" y="18" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill={dark} letterSpacing="1">
          {name.length > 16 ? name.split(" ").slice(0, 2).join(" ") : name}
        </text>
        <text x="0" y="40" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fill={dark} letterSpacing="3">
          {(roast ?? "COFFEE").toUpperCase()}
        </text>
        {large && (
          <text x="0" y="88" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill={dark} letterSpacing="4" opacity="0.7">
            COFFEE CRAFT
          </text>
        )}
      </g>
    </svg>
  );
}
