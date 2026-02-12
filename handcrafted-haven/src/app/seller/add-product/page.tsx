"use client";

import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addProduct, ProductState } from "@/lib/actions";
import styles from "../../(auth)/auth.module.css";
import dashStyles from "../dashboard/dashboard.module.css";

const initialState: ProductState = {
  success: false,
  message: "",
};

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(addProduct, initialState);

  // Redirect if not logged in
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (status === "loading") {
    return (
      <main className={styles.authPage}>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className={styles.authPage}>
      <div className={styles.authContainer} style={{ maxWidth: "500px" }}>
        <Link
          href="/seller/dashboard"
          style={{
            display: "inline-block",
            marginBottom: "1rem",
            color: "var(--terracotta)",
          }}
        >
          ← Back to Dashboard
        </Link>

        <h1>Add New Product</h1>
        <p className={styles.subtitle}>List a new handcrafted item for sale</p>

        {state.message && (
          <div className={state.success ? styles.successMessage : styles.errorMessage}>
            {state.message}
          </div>
        )}

        {state.success ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link href="/seller/dashboard" className={dashStyles.addProductBtn}>
              View Dashboard
            </Link>
          </div>
        ) : (
          <form action={formAction} className={styles.authForm}>
            {/* Hidden field for user ID */}
            <input type="hidden" name="userId" value={session?.user?.id || ""} />

            <div className={styles.formGroup}>
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g., Handwoven Basket"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your handcrafted item..."
                rows={4}
                required
                style={{
                  padding: "0.875rem",
                  border: "2px solid var(--sage)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  color: "var(--brown)",
                  backgroundColor: "var(--cream)",
                  resize: "vertical",
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="29.99"
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">Image URL (optional)</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="/images/my-product.jpg"
              />
              <small style={{ color: "var(--brown)", opacity: 0.6 }}>
                Leave blank to use default image
              </small>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={pending}>
              {pending ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}