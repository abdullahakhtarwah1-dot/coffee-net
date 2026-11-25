export function Emblem({ size = 40, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="24" cy="24" r="22" />
      <circle cx="24" cy="24" r="18" strokeDasharray="1.5 2.5" />
      <path d="M17 24c0-6 3.2-10 7-10s7 4 7 10-3.2 10-7 10-7-4-7-10Z" fill={color} fillOpacity="0.12" />
      <path d="M24 14c-2.5 3-2.5 6 0 10s2.5 7 0 10" />
    </svg>
  );
}
