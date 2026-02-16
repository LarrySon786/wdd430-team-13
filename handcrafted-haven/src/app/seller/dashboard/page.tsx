import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/lib/auth";
import { getSellerProducts } from "@/lib/actions";
import LogoutButton from "@/components/LogoutButton";
import DeleteProductButton from "@/components/DeleteProductButton";
import styles from "./dashboard.module.css";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  const products = await getSellerProducts(session.user.id);

  return (
    <main className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Seller Dashboard</h1>
          <p className={styles.welcomeText}>Welcome back, {session.user.name}!</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/seller/add-product" className={styles.addProductBtn}>
            + Add Product
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Account Type</h3>
          <p style={{ fontSize: "1.25rem", textTransform: "capitalize" }}>
            {session.user.accountType}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <section className={styles.section}>
        <h2>Your Products</h2>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No products yet</h3>
            <p>Start selling by adding your first handcrafted item!</p>
            <Link href="/seller/add-product" className={styles.addProductBtn}>
              + Add Your First Product
            </Link>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.productid} className={styles.productCard}>
                <Image
                  src={product.imageurl || "/favicon.ico"}
                  alt={product.name}
                  width={280}
                  height={160}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productActions}>
                    {/* <Link
                      href={`/seller/edit-product/${product.productid}`}
                      className={styles.editBtn}
                      style={{ textAlign: "center", textDecoration: "none" }}
                    >
                      Edit
                    </Link> */}
                    <DeleteProductButton
                      productId={product.productid}
                      userId={session.user.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}