import Link from "next/link";
import Logo from "./Logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  //{ href: "/sellers", label: "Sellers" },
  //{ href: "/seller/profile", label: "Seller Profile" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  //{ href: "/login", label: "Login" },
];

export default function Navigation() {
  return (
    <aside className="navigation">
      <div>
        <Logo />
      </div>

      <nav aria-label="Main navigation">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
