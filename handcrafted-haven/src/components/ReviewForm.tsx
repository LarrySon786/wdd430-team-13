"use client";

import { useState } from "react";
import styles from "@/app/reviews/reviews.module.css";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    productName: "",
    reviewerName: "",
    rating: 5,
    reviewText: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        productName: "",
        reviewerName: "",
        rating: 5,
        reviewText: "",
      });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h2>Leave a Review</h2>

      {submitted && (
        <div className={styles.successMessage}>
          Thank you for your review!
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="reviewerName">Your Name</label>
        <input
          type="text"
          id="reviewerName"
          name="reviewerName"
          value={formData.reviewerName}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
          <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
          <option value={3}>⭐⭐⭐ (3 - Good)</option>
          <option value={2}>⭐⭐ (2 - Fair)</option>
          <option value={1}>⭐ (1 - Poor)</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="reviewText">Your Review</label>
        <textarea
          id="reviewText"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Tell us about your experience with this product..."
          rows={5}
          required
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Submit Review
      </button>
    </form>
  );
}