/**
 * SAMPLE CATALOGUE — placeholder data only.
 * Real product names, descriptions, prices and stock are an open decision (PRD §15).
 * Replace this file with API/database data in the backend slice.
 */

export type SizeLabel = "Small" | "Medium" | "Large";
export type Roast = "Light" | "Medium" | "Dark";

export interface Variant {
  size: SizeLabel;
  pricePKR: number; // whole rupees
  stock: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  roast: Roast | null;
  shortDescription: string;
  description: string;
  notes: string[];
  tone: [string, string]; // artwork colours (stand-in for photography)
  image?: string; // product photo in /public; falls back to illustrated art when absent
  variants: Variant[];
}

export const SIZES: SizeLabel[] = ["Small", "Medium", "Large"];

export const categories: Category[] = [
  { slug: "espresso", name: "Espresso", description: "Short, intense coffees built on a shot of espresso." },
  { slug: "milk-coffee", name: "Milk Coffee", description: "Espresso softened with steamed, silky milk." },
  { slug: "specialty", name: "Specialty", description: "House favourites with a little something extra." },
];

const v = (p250: number, s250: number, p500: number, s500: number, p1k: number, s1k: number): Variant[] => [
  { size: "Small", pricePKR: p250, stock: s250 },
  { size: "Medium", pricePKR: p500, stock: s500 },
  { size: "Large", pricePKR: p1k, stock: s1k },
];

export const products: Product[] = [
  {
    slug: "espresso",
    name: "Espresso",
    categorySlug: "espresso",
    roast: "Light",
    shortDescription: "Bold. Pure. Classic.",
    description: "A light roast with a delicate body. Sample description — replace with the real product copy.",
    notes: ["Jasmine", "Lemon", "Honey"],
    tone: ["#C9A27A", "#8A5A35"],
    image: "/images/highland-morning.png",
    variants: v(1800, 12, 3400, 8, 6500, 4),
  },
  {
    slug: "americano",
    name: "Americano",
    categorySlug: "espresso",
    roast: "Medium",
    shortDescription: "Simple. Strong. Refreshing.",
    description: "Our sample everyday blend, balanced for pour-over, French press and drip.",
    notes: ["Caramel", "Almond", "Cocoa"],
    tone: ["#B07A4C", "#5E3A22"],
    image: "/images/americano.png",
    variants: v(1500, 20, 2800, 15, 5300, 6),
  },
  {
    slug: "ristretto",
    name: "Ristretto",
    categorySlug: "espresso",
    roast: "Dark",
    shortDescription: "Short. Intense. Powerful.",
    description: "A dark roast designed for espresso and milk drinks. Sample description.",
    notes: ["Dark chocolate", "Molasses", "Smoke"],
    tone: ["#6E4529", "#2B1A10"],
    image: "/images/ristretto.png",
    variants: v(1700, 10, 3200, 0, 6100, 3),
  },
  {
    slug: "latte",
    name: "Latte",
    categorySlug: "milk-coffee",
    roast: "Medium",
    shortDescription: "Smooth. Creamy. Perfect.",
    description: "A medium roast single origin with a juicy, rounded cup. Sample description.",
    notes: ["Apricot", "Cardamom", "Brown sugar"],
    tone: ["#C58B4F", "#7A4A28"],
    image: "/images/latte.png",
    variants: v(2100, 6, 3900, 5, 7400, 2),
  },
  {
    slug: "affogato",
    name: "Affogato",
    categorySlug: "specialty",
    roast: "Medium",
    shortDescription: "Coffee. Ice Cream. Bliss.",
    description: "A medium espresso roast with a thick crema. Sample description.",
    notes: ["Toffee", "Hazelnut", "Cherry"],
    tone: ["#9C6640", "#4A2C18"],
    image: "/images/affogato.png",
    variants: v(1650, 14, 3100, 9, 5900, 5),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function minPrice(p: Product): number {
  return Math.min(...p.variants.map((x) => x.pricePKR));
}

export function inStock(p: Product): boolean {
  return p.variants.some((x) => x.stock > 0);
}

export function relatedProducts(p: Product, limit = 3): Product[] {
  const same = products.filter((x) => x.slug !== p.slug && x.categorySlug === p.categorySlug);
  const rest = products.filter((x) => x.slug !== p.slug && x.categorySlug !== p.categorySlug);
  return [...same, ...rest].slice(0, limit);
}
