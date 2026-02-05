import ReviewForm from "@/components/ReviewForm";
import styles from "./reviews.module.css";

export default function ReviewsPage() {
  const sampleReviews = [
    {
      id: 1,
      productName: "Ceramic Vase",
      reviewerName: "Sarah M.",
      rating: 5,
      reviewText: "Absolutely beautiful craftsmanship! The vase arrived perfectly packaged and looks even better in person.",
      date: "January 25, 2026",
    },
    {
      id: 2,
      productName: "Handwoven Basket",
      reviewerName: "John D.",
      rating: 4,
      reviewText: "Great quality basket. Sturdy and well-made. Only giving 4 stars because shipping took a bit longer than expected.",
      date: "January 20, 2026",
    },
    {
      id: 3,
      productName: "Wooden Cutting Board",
      reviewerName: "Emily R.",
      rating: 5,
      reviewText: "This cutting board is a work of art! The wood grain is gorgeous and it's very functional.",
      date: "January 15, 2026",
    },
  ];

  return (
    <main className={styles.reviewsPage}>
      <h1>Product Reviews</h1>
      <p className={styles.pageDescription}>
        See what our customers are saying about our handcrafted products.
      </p>

      <section className={styles.reviewFormSection}>
        <ReviewForm />
      </section>

      <section className={styles.reviewsListSection}>
        <h2>Recent Reviews</h2>
        <div className={styles.reviewsList}>
          {sampleReviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.productName}>{review.productName}</span>
                <span className={styles.rating}>
                  {"⭐".repeat(review.rating)}
                </span>
              </div>
              <p className={styles.reviewText}>{review.reviewText}</p>
              <div className={styles.reviewFooter}>
                <span>— {review.reviewerName}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}