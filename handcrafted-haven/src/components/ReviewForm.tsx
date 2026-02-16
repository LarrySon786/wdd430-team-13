"use client";

import { useActionState } from "react";
import { createReview, type ReviewFormState } from "@/actions/reviewActions";
import styles from "@/app/reviews/reviews.module.css";

type Product = {
  id: number;
  name: string;
};

type Props = {
  products: Product[];
};

const initialState: ReviewFormState = {
  success: false,
  message: "",
};

export default function ReviewForm({ products }: Props) {
  const [state, formAction, pending] = useActionState(createReview, initialState);

  return (
    <form action={formAction} className={styles.reviewForm}>
      <h2>Leave a Review</h2>

      {state.message && (
        <div className={state.success ? styles.successMessage : styles.errorMessage}>
          {state.message}
        </div>
      )}

      {!state.success && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="productId">Product</label>
            <select id="productId" name="productId" required>
              <option value="">Select a product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reviewerName">Your Name</label>
            <input
              type="text"
              id="reviewerName"
              name="reviewerName"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="score">Rating</label>
            <select id="score" name="score" defaultValue="5" required>
              <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
              <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
              <option value="3">⭐⭐⭐ (3 - Good)</option>
              <option value="2">⭐⭐ (2 - Fair)</option>
              <option value="1">⭐ (1 - Poor)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Review</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your experience with this product..."
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={pending}>
            {pending ? "Submitting..." : "Submit Review"}
          </button>
        </>
      )}
    </form>
  );
}