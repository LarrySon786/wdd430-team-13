import ReviewForm from "@/components/ReviewForm";
import { getReviews, getProductsForReview } from "@/actions/reviewActions";
import styles from "./reviews.module.css";

export default async function ReviewsPage() {
  // Fetch real data from database
  const [reviews, products] = await Promise.all([
    getReviews(),
    getProductsForReview(),
  ]);

  // Format date helper
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className={styles.reviewsPage}>
      <h1>Product Reviews</h1>
      <p className={styles.pageDescription}>
        See what our customers are saying about our handcrafted products.
      </p>

      <section className={styles.reviewFormSection}>
        <ReviewForm products={products} />
      </section>

      <section className={styles.reviewsListSection}>
        <h2>Recent Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.productName}>
                    {review.productname || "Unknown Product"}
                  </span>
                  <span className={styles.rating}>
                    {"⭐".repeat(review.score)}
                  </span>
                </div>
                <p className={styles.reviewText}>{review.message}</p>
                <div className={styles.reviewFooter}>
                  <span>— {review.reviewer_name}</span>
                  <span>{formatDate(review.createdat)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}