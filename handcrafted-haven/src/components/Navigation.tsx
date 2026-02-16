"use client";

import { useState } from "react";
import Link from "next/link";
import LogoClient from "./LogoClient";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
          <LogoClient />
        </div>

        <nav aria-label="Main navigation">
          <ul>
            {navItems.map((item) => (
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