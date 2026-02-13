"use client";

import { useActionState, useState } from "react";
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");


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

  async function uploadToCloudinary(file: File) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration missing.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error("Image upload failed.");
    }

    const data = await res.json();
    return data.secure_url as string;
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
          <div
            className={
              state.success ? styles.successMessage : styles.errorMessage
            }
          >
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
          <form
            action={formAction}
            className={styles.authForm}
            encType="multipart/form-data"
            onSubmit={async (e) => {
              const form = e.currentTarget;
              const fileInput = form.querySelector<HTMLInputElement>("#image");
              const hiddenImageUrl = form.querySelector<HTMLInputElement>(
                'input[name="imageUrl"]',
              );

              if (!fileInput || !hiddenImageUrl) return;

              const file = fileInput.files?.[0];

              if (!file) return; // pas d’image → comportement normal

              e.preventDefault();

              try {
                setUploading(true);
                setUploadError("");

                const url = await uploadToCloudinary(file);
                hiddenImageUrl.value = url;

                setUploading(false);

                fileInput.value = "";
                form.requestSubmit(); // relance submit avec imageUrl rempli
              } catch (err) {
                setUploading(false);
                setUploadError("Image upload failed. Please try again.");
              }
            }}
          >
            {/* Hidden field for user ID */}
            <input
              type="hidden"
              name="userId"
              value={session?.user?.id || ""}
            />

            <input type="hidden" name="imageUrl" value="" />

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
              <label htmlFor="image">Product Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={() => setUploadError("")}
              />
              <small style={{ color: "var(--brown)", opacity: 0.6 }}>
                Select an image to upload
              </small>
            </div>

            {uploadError && (
              <div className={styles.errorMessage}>{uploadError}</div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={pending || uploading}
            >
              {uploading
                ? "Uploading Image..."
                : pending
                  ? "Adding Product..."
                  : "Add Product"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}