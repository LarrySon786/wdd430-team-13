"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function AuthButton({ className }: Props) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className={className} style={{ opacity: 0.5 }}>
        Loading...
      </span>
    );
  }

  if (session?.user) {
    return (
      <Link href="/seller/dashboard" className={className}>
        Dashboard
      </Link>
    );
  }

  return (
    <Link href="/login" className={className}>
      Login
    </Link>
  );
}