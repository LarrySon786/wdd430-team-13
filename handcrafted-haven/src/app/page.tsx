import Image from "next/image";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <main>
      <div className="hero-container">
        <Image
          src="/hero.webp"
          alt="Hero Image of webpage"
          width={1600}
          height={500}
          className="hero-image"
          priority
        />
        <h1>Handcrafted Haven</h1>
        <div>
          <AuthButton className="login-btn" />
        </div>
      </div>

      <div className="blank-text-area">
        <h2>About Us</h2>
        <p>
          Handcrafted Haven is here to help you discover new and unique
          handcrafted items from talented artisans. Handcrafed Haven is a 
          space for artisans to share their passion securely and for customers
          to find one-of-a-kind treasures.
        </p>
      </div>
    </main>
  );
}