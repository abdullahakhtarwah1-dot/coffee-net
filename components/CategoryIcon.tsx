/** Line icons for the home-page category strip. */
export function CategoryIcon({ slug }: { slug: string }) {
  const common = { width: 28, height: 28, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (slug) {
    case "milk-coffee":
      return (
        <svg {...common}>
          <path d="M6 12h17v6a8 8 0 0 1-8 8h-1a8 8 0 0 1-8-8v-6Z" />
          <path d="M23 14h2a3 3 0 0 1 0 6h-2.5" />
          <path d="M11 17c1.5-2 5.5-2 7 0-1.5 2-5.5 2-7 0Z" />
          <path d="M14.5 15v4" />
        </svg>
      );
    case "specialty":
      return (
        <svg {...common}>
          <path d="M8 15h16l-2 11H10L8 15Z" />
          <path d="M10 15a6 6 0 0 1 12 0" />
          <path d="M18 9c0-2 1-4 4-5" />
        </svg>
      );
    case "espresso":
      return (
        <svg {...common}>
          <path d="M7 13h15v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-7-7v-5Z" />
          <path d="M22 15h2a3 3 0 0 1 0 6h-2.5" />
          <path d="M5 28h21" />
          <path d="M12 4c-1 2 1 3 0 5M17 4c-1 2 1 3 0 5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" />
        </svg>
      );
  }
}
