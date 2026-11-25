/**
 * Illustrated hero scene (mug of coffee on a wooden slab with scattered beans).
 * Stand-in for hero photography — swap for a real <Image> once photos are supplied.
 */
type Bean = [number, number, number];

const BACK_BEANS: Bean[] = [
  [470, 120, 20], [510, 160, -30], [545, 110, 60], [580, 190, 10], [500, 80, 80],
  [560, 240, -50], [600, 140, 30], [430, 90, -20], [612, 262, 45], [455, 165, 70],
];
const SLAB_BEANS: Bean[] = [[175, 398, 30], [478, 412, -30], [505, 388, 60], [150, 418, -15]];
const FRONT_BEANS: Bean[] = [
  [120, 470, 15], [160, 500, -40], [205, 525, 70], [88, 520, 30], [540, 482, -20],
  [582, 510, 50], [612, 468, -70], [470, 532, 10], [252, 542, -25], [420, 546, 40],
  [56, 478, -60], [330, 552, 85], [600, 545, -10],
];

function BeanShape({ x, y, r, s = 1 }: { x: number; y: number; r: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse rx="13" ry="9" fill="#4a2a16" />
      <ellipse rx="9" ry="4" cy="-3" fill="#7a4a28" opacity="0.55" />
      <path d="M-11 0 C-4 -3 4 3 11 0" stroke="#22130a" strokeWidth="1.8" fill="none" />
    </g>
  );
}

export function HeroScene() {
  return (
    <svg className="hero-scene" viewBox="0 0 640 570" role="img" aria-label="A steaming mug of Coffee Craft latte on a wooden slab surrounded by coffee beans">
      <defs>
        <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c98a4f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c98a4f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hs-wood" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#9a6639" />
          <stop offset="70%" stopColor="#6b4022" />
          <stop offset="100%" stopColor="#4a2c18" />
        </radialGradient>
        <linearGradient id="hs-wood-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f2414" />
          <stop offset="100%" stopColor="#1f1209" />
        </linearGradient>
        <linearGradient id="hs-mug" x1="0" x2="1">
          <stop offset="0%" stopColor="#120d0a" />
          <stop offset="28%" stopColor="#3b2e26" />
          <stop offset="55%" stopColor="#1a1410" />
          <stop offset="100%" stopColor="#0a0706" />
        </linearGradient>
        <radialGradient id="hs-crema" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#e6b984" />
          <stop offset="55%" stopColor="#b97a44" />
          <stop offset="100%" stopColor="#6e3f1f" />
        </radialGradient>
        <filter id="hs-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <ellipse cx="330" cy="300" rx="310" ry="250" fill="url(#hs-glow)" />

      <g opacity="0.55">
        {BACK_BEANS.map(([x, y, r], i) => <BeanShape key={i} x={x} y={y} r={r} s={0.85} />)}
      </g>

      {/* wooden slab */}
      <ellipse cx="330" cy="440" rx="205" ry="52" fill="url(#hs-wood-side)" />
      <rect x="125" y="400" width="410" height="40" fill="url(#hs-wood-side)" />
      <ellipse cx="330" cy="400" rx="205" ry="52" fill="url(#hs-wood)" />
      {[165, 125, 85, 45].map((rx) => (
        <ellipse key={rx} cx="330" cy="400" rx={rx} ry={rx / 4} fill="none" stroke="#3a2213" strokeOpacity="0.35" strokeWidth="1.5" />
      ))}
      {SLAB_BEANS.map(([x, y, r], i) => <BeanShape key={i} x={x} y={y} r={r} />)}

      {/* mug */}
      <ellipse cx="322" cy="402" rx="122" ry="20" fill="#000" opacity="0.45" filter="url(#hs-blur)" />
      <path d="M440 262 C512 252 522 348 432 352" stroke="#15100c" strokeWidth="24" fill="none" strokeLinecap="round" />
      <path d="M446 268 C500 264 506 336 436 342" stroke="#3b2e26" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M195 230 C195 332 214 398 320 402 C426 398 445 332 445 230 Z" fill="url(#hs-mug)" />
      <path d="M222 250 C222 320 236 370 268 388" stroke="#fff" strokeOpacity="0.08" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="320" cy="230" rx="125" ry="34" fill="#0b0807" />
      <ellipse cx="320" cy="233" rx="112" ry="28" fill="url(#hs-crema)" />
      <ellipse cx="320" cy="233" rx="100" ry="23" fill="none" stroke="#f3dcc0" strokeOpacity="0.45" strokeWidth="3" />

      {/* latte art rosetta */}
      <g fill="#f7ecdc" opacity="0.94">
        <ellipse cx="292" cy="233" rx="34" ry="14" />
        <ellipse cx="324" cy="233" rx="26" ry="11" />
        <ellipse cx="350" cy="233" rx="18" ry="8" />
        <ellipse cx="370" cy="233" rx="11" ry="5" />
        <path d="M255 233 C262 220 276 218 284 226 C290 232 288 236 284 240 C276 248 262 246 255 233 Z" />
      </g>
      <path d="M258 233 L392 233" stroke="#b97a44" strokeWidth="2.4" strokeLinecap="round" />

      {/* brand mark on mug */}
      <g transform="translate(320 292) rotate(28)">
        <ellipse rx="11" ry="15" fill="#d9a066" />
        <path d="M0 -13 C-5 -4 5 4 0 13" stroke="#1a110b" strokeWidth="2" fill="none" />
      </g>
      <text x="320" y="338" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize="27" fill="#d9a066">
        Coffee Craft
      </text>

      {/* steam */}
      <g className="steam" stroke="#fff" fill="none" strokeLinecap="round" filter="url(#hs-blur)">
        <path d="M300 200 C285 170 315 150 300 120 C285 90 312 70 300 40" strokeWidth="7" strokeOpacity="0.28" />
        <path d="M335 205 C322 180 348 160 335 130 C322 104 345 86 336 62" strokeWidth="5" strokeOpacity="0.2" />
        <path d="M270 210 C262 190 280 176 272 156" strokeWidth="4" strokeOpacity="0.16" />
      </g>

      {FRONT_BEANS.map(([x, y, r], i) => <BeanShape key={i} x={x} y={y} r={r} />)}
    </svg>
  );
}
