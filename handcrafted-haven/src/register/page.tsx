"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser, RegisterState } from "@/lib/actions";
import styles from "../(auth)/auth.module.css";

const initialState: RegisterState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, initialState);

  return (
    <main className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Join our artisan marketplace</p>

        {state.message && (
          <div className={state.success ? styles.successMessage : styles.errorMessage}>
            {state.message}
          </div>
        )}

        {state.success ? (
          <div className={styles.authFooter} style={{ marginTop: "1rem" }}>
            <p>
              <Link href="/login">Click here to sign in</Link>
            </p>
          </div>
        ) : (
          <form action={formAction} className={styles.authForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={pending}>
              {pending ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        {!state.success && (
          <div className={styles.authFooter}>
            <p>
              Already have an account?{" "}
              <Link href="/login">Sign in</Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}