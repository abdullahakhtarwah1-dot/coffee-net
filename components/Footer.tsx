import Link from "next/link";
import { Emblem } from "./Emblem";
import { ActiveLink } from "./ActiveLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand footer-logo">
            <Emblem size={44} />
            <span className="brand-name">Coffee Craft</span>
          </div>
          <p className="footer-tagline">Small-batch coffee, roasted with care.</p>
          <p className="footer-note">Contact: <span className="todo">email to be confirmed</span></p>
        </div>

        <nav aria-label="Our menu">
          <h2 className="footer-heading">Our Menu</h2>
          <ul>
            <li><Link href="/shop">Full menu</Link></li>
            <li><Link href="/shop?category=espresso">Espresso</Link></li>
            <li><Link href="/shop?category=milk-coffee">Milk Coffee</Link></li>
            <li><Link href="/shop?category=specialty">Specialty</Link></li>
          </ul>
        </nav>

        <nav aria-label="Customer support">
          <h2 className="footer-heading">Support</h2>
          <ul>
            <li><Link href="/contact">Contact us</Link></li>
            <li><Link href="/account">My account</Link></li>
            <li><ActiveLink href="/policies/shipping">Shipping policy</ActiveLink></li>
            <li><ActiveLink href="/policies/returns">Returns policy</ActiveLink></li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="footer-heading">Legal</h2>
          <ul>
            <li><ActiveLink href="/policies/privacy">Privacy policy</ActiveLink></li>
            <li><ActiveLink href="/policies/terms">Terms of service</ActiveLink></li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p className="small">© {new Date().getFullYear()} Coffee Craft. All rights reserved.</p>
      </div>
    </footer>
  );
}
