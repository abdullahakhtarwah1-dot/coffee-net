import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

const VALUES = [
  {
    label: ["Premium", "Quality Beans"],
    icon: (
      <>
        <ellipse cx="16" cy="16" rx="6.5" ry="9" transform="rotate(30 16 16)" />
        <path d="M19 9c-3.5 3-1 7-3.5 10.5S12 22 12 24" />
      </>
    ),
  },
  {
    label: ["Expertly", "Crafted"],
    icon: (
      <>
        <path d="M8 14h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-4Z" />
        <path d="M21 15.5h1.5a2.5 2.5 0 0 1 0 5H21" />
        <path d="M6.5 26.5h17" />
        <path d="M12.5 7.5c-.8 1.5.8 2.5 0 4M16.5 7.5c-.8 1.5.8 2.5 0 4" />
      </>
    ),
  },
  {
    label: ["Customer", "First"],
    icon: <path d="M16 25s-9-5.4-9-11.2A4.8 4.8 0 0 1 16 11a4.8 4.8 0 0 1 9 2.8C25 19.6 16 25 16 25Z" />,
  },
  {
    label: ["Sustainable", "Choices"],
    icon: (
      <>
        <path d="M9 23c0-9 6-14 15-14 0 9-5 15-14 15" />
        <path d="M9 23c3-4 6-7 10-9" />
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Us</h1>
          <span className="about-rule" aria-hidden="true" />
          <p>
            More than just coffee —
            <br />
            it’s a craft, a culture, and a feeling.
          </p>
        </div>
      </section>

      <section className="container about-row">
        <div className="about-text">
          <h2>Our Story</h2>
          <span className="about-rule" aria-hidden="true" />
          <p>
            Coffee Craft was born from a simple idea — to bring people closer to the rich, authentic
            taste of coffee. What started as a small passion project has now grown into a brand that
            celebrates quality, flavor, and the joy of coffee in every cup.
          </p>
          <p>
            Our journey began with a love for great coffee and a dream to share it with the world. We
            carefully source the finest beans, perfect our brewing techniques, and craft a menu that
            suits every coffee lover — from the classic espresso to our signature creations.
          </p>
        </div>
        <figure className="about-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-story.jpg" alt="Warmly lit Coffee Craft café counter with an espresso machine and grinders" loading="lazy" />
        </figure>
      </section>

      <section className="container about-row about-row-reverse">
        <div className="about-text">
          <h2>Our Philosophy</h2>
          <span className="about-rule" aria-hidden="true" />
          <p>
            At Coffee Craft, we believe coffee is more than a drink — it’s a moment of peace, a boost
            of energy, and a reason to smile. Our philosophy is simple: deliver exceptional quality,
            create memorable experiences, and make every cup worth savoring.
          </p>
        </div>
        <figure className="about-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-philosophy.jpg" alt="Coffee beans spilling from a burlap sack beside a cup of coffee" loading="lazy" />
        </figure>
      </section>

      <section className="container" aria-label="What we stand for">
        <ul className="about-values">
          {VALUES.map((v) => (
            <li key={v.label.join(" ")}>
              <span className="about-value-icon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {v.icon}
                </svg>
              </span>
              <span>
                {v.label[0]}
                <br />
                {v.label[1]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container about-row">
        <div className="about-text">
          <h2>Our Promise</h2>
          <span className="about-rule" aria-hidden="true" />
          <p>
            We promise to always bring you the best — the finest coffee, the warmest service, and a
            cozy experience. Whether you’re starting your day, taking a break, or catching up with
            loved ones, Coffee Craft is here to make every moment better.
          </p>
          <blockquote className="about-quote">
            Because at Coffee Craft,
            <br />
            every cup tells a story.
          </blockquote>
        </div>
        <figure className="about-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-promise.jpg" alt="A glass cup of black coffee on a wooden bar" loading="lazy" />
        </figure>
      </section>
    </div>
  );
}
