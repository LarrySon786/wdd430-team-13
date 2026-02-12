"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        backgroundColor: "transparent",
        border: "2px solid var(--brown)",
        color: "var(--brown)",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background-color 0.2s, color 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "var(--brown)";
        e.currentTarget.style.color = "var(--cream)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "var(--brown)";
      }}
    >
      Sign Out
    </button>
  );
}