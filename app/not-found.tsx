import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page prose">
      <h1>Page not found</h1>
      <p>We couldn&apos;t find that page.</p>
      <Link href="/shop" className="btn btn-primary">Go to the shop</Link>
    </div>
  );
}
