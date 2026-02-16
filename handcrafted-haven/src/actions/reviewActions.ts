"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Type definitions
export type Review = {
  id: number;
  score: number;
  message: string;
  productid: number;
  reviewer_name: string;
  createdat?: Date;
  productname?: string;
};

export type ReviewFormState = {
  success: boolean;
  message: string;
};

// Fetch all products for the dropdown
export async function getProductsForReview(): Promise<{ id: number; name: string }[]> {
  try {
    const products = await sql<{ id: number; name: string }[]>`
      SELECT productid as id, name FROM products ORDER BY name ASC
    `;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Server action to create a new review (no auth required)
export async function createReview(
  prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  try {
    const productId = formData.get("productId") as string;
    const reviewerName = formData.get("reviewerName") as string;
    const score = formData.get("score") as string;
    const message = formData.get("message") as string;

    // Validation
    if (!productId || !reviewerName || !score || !message) {
      return { success: false, message: "All fields are required." };
    }

    const productIdNum = parseInt(productId, 10);
    const scoreNum = parseInt(score, 10);

    if (isNaN(productIdNum) || isNaN(scoreNum)) {
      return { success: false, message: "Invalid data provided." };
    }

    if (scoreNum < 1 || scoreNum > 5) {
      return { success: false, message: "Rating must be between 1 and 5." };
    }

    if (reviewerName.trim().length < 2) {
      return { success: false, message: "Please enter your name." };
    }

    if (message.trim().length < 10) {
      return { success: false, message: "Review must be at least 10 characters." };
    }

    // Insert review into database
    await sql`
      INSERT INTO reviews (score, message, productid, reviewer_name)
      VALUES (${scoreNum}, ${message.trim()}, ${productIdNum}, ${reviewerName.trim()})
    `;

    revalidatePath("/reviews");
    revalidatePath(`/products/${productIdNum}`);

    return { success: true, message: "Thank you for your review!" };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, message: "Failed to submit review. Please try again." };
  }
}

// Fetch all reviews with product info
export async function getReviews(): Promise<Review[]> {
  try {
    const reviews = await sql<Review[]>`
      SELECT 
        r.id,
        r.score,
        r.message,
        r.productid,
        r.reviewer_name,
        r.createdat,
        p.name as productname
      FROM reviews r
      LEFT JOIN products p ON r.productid = p.productid
      ORDER BY r.createdat DESC
    `;
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

// Fetch reviews for a specific product
export async function getReviewsByProduct(productId: number): Promise<Review[]> {
  try {
    const reviews = await sql<Review[]>`
      SELECT 
        r.id,
        r.score,
        r.message,
        r.productid,
        r.reviewer_name,
        r.createdat,
        p.name as productname
      FROM reviews r
      LEFT JOIN products p ON r.productid = p.productid
      WHERE r.productid = ${productId}
      ORDER BY r.createdat DESC
    `;
    return reviews;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return [];
  }
}

// Get average rating for a product
export async function getProductAverageRating(
  productId: number
): Promise<{ average: number; count: number }> {
  try {
    const result = await sql`
      SELECT 
        COALESCE(AVG(score), 0) as average,
        COUNT(*) as count
      FROM reviews
      WHERE productid = ${productId}
    `;
    return {
      average: parseFloat(result[0].average) || 0,
      count: parseInt(result[0].count) || 0,
    };
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return { average: 0, count: 0 };
  }
}