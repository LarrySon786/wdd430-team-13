export default function AboutPage() {
  return (
    <main className="about-container">
      <header className="page__header">
        <h1 className="page__title">About Us</h1>
        <p className="page__subtitle">
          Learn more about Handcrafted Haven and our mission.
        </p>
      </header>

      <section style={{ padding: "1rem 0" }}>
        <p>
          Handcrafted Haven was created with a simple idea: to celebrate
          creativity and connect people through unique, handmade products.
        </p>

        <p style={{ marginTop: "1rem" }}>
          Our platform is designed to give artisans a welcoming space to
          showcase their craftsmanship, share their passion, and reach customers
          who value authenticity and quality. Every item tells a story — not
          just of materials, but of skill, patience, and dedication.
        </p>

        <p style={{ marginTop: "1rem" }}>
          For shoppers, Handcrafted Haven offers more than a marketplace. It is
          a place to discover distinctive products, support independent
          creators, and experience the charm of truly handcrafted work.
        </p>

        <p style={{ marginTop: "1rem" }}>
          We believe that handmade goods carry character, meaning, and a human
          touch that mass production can never replace.
        </p>
      </section>
    </main>
  );
}
