"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";


const baseNavItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className={`hamburger-icon ${isOpen ? "open" : ""}`}></span>
      </button>

      {/* Overlay to close menu when clicking outside */}
      {isOpen && <div className="nav-overlay" onClick={toggleMenu}></div>}

      {/* Navigation Sidebar */}
      <aside className={`navigation ${isOpen ? "nav-open" : ""}`}>
        <div>
          <Logo />
        </div>

        <nav aria-label="Main navigation">
          <ul>
            {(session
              ? [
                  baseNavItems[0], // Home
                  { href: "/seller/dashboard", label: "Dashboard" },
                  ...baseNavItems.slice(1),
                ]
              : baseNavItems
            ).map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}