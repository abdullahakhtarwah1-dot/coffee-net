# Coffee Craft — Storefront (Slice 1)

Next.js storefront for Coffee Craft, built from `PRD.md`, `Architecture.md`, `AGENT.md`, `PLAN.md` and `ADR.md`.

## Run

```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
npm run typecheck
```

## Included in this slice
- Home (split hero, featured products, categories, about teaser)
- Shop with search, category, roast, max-price and stock filters, plus pagination
- Product page with Small / Medium / Large sizes, quantity, add to cart, related products
- Cart drawer + full cart page (saved in browser localStorage)
- About, Contact (validated form, delivery not wired up yet), My Account placeholder, policy placeholders
- Footer with dark background and gold accents, no newsletter or social sections

## Sample data / not live yet
- `lib/products.ts` holds **SAMPLE** products, prices and stock. Replace them with real data.
- Product artwork is an SVG illustration standing in for real photography.
- Shipping fee, contact email and policy text are shown as "to be confirmed".
- Checkout, accounts, reviews, coupons, admin and the database are left for later slices. ADR-0006 and ADR-0007 still need the owner's decisions (database, payment provider).
