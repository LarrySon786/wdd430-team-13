"use server";

import postgres from "postgres";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// ============================================
// REGISTRATION
// ============================================

export type RegisterState = {
  success: boolean;
  message: string;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return { success: false, message: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }

  try {
    // Checking for the user in the database
    const existingUsers = await sql`
      SELECT userid FROM users WHERE email = ${email}
    `;

    if (existingUsers.length > 0) {
      return { success: false, message: "An account with this email already exists." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await sql`
      INSERT INTO users (firstname, lastname, email, password, accounttype)
      VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, 'seller')
    `;

    return { success: true, message: "Account created successfully! Please log in." };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

// ============================================
// PRODUCTS
// ============================================

export type ProductState = {
  success: boolean;
  message: string;
};

export async function addProduct(
  prevState: ProductState,
  formData: FormData
): Promise<ProductState> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const imageUrl = (formData.get("imageUrl") as string) || "/favicon.ico";
  const userId = formData.get("userId") as string;

  // Validation
  if (!name || !description || !price || !userId) {
    return { success: false, message: "All fields are required." };
  }

  if (isNaN(price) || price <= 0) {
    return { success: false, message: "Please enter a valid price." };
  }

  try {
    await sql`
      INSERT INTO products (name, description, price, imageurl, userid)
      VALUES (${name}, ${description}, ${price}, ${imageUrl}, ${parseInt(userId)})
    `;

    revalidatePath("/seller/dashboard");
    revalidatePath("/products");

    return { success: true, message: "Product added successfully!" };
  } catch (error) {
    console.error("Add product error:", error);
    return { success: false, message: "Failed to add product. Please try again." };
  }
}

export async function deleteProduct(productId: number, userId: string): Promise<ProductState> {
  try {
    // Check if the product exists and belongs to the user
    const products = await sql`
      SELECT productid FROM products 
      WHERE productid = ${productId} AND userid = ${parseInt(userId)}
    `;

    if (products.length === 0) {
      return { success: false, message: "Product not found or you don't have permission to delete it." };
    }

    await sql`
      DELETE FROM products WHERE productid = ${productId}
    `;

    revalidatePath("/seller/dashboard");
    revalidatePath("/products");

    return { success: true, message: "Product deleted successfully!" };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, message: "Failed to delete product. Please try again." };
  }
}

// ============================================
// FETCH SELLER PRODUCTS
// ============================================

export async function getSellerProducts(userId: string) {
  try {
    const products = await sql`
      SELECT productid, name, description, price, imageurl
      FROM products
      WHERE userid = ${parseInt(userId)}
      ORDER BY productid DESC
    `;
    return products;
  } catch (error) {
    console.error("Fetch products error:", error);
    return [];
  }
}