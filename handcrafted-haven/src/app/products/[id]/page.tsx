import Link from "next/link";
import { products } from "@/components/products";
import "../product.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="page">
        <header className="page__header">
          <h1 className="page__title">Product not found</h1>
          <p className="page__subtitle">We couldn’t find that product.</p>
        </header>

        <Link className="btn-link" href="/products">
          ← Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="page__header">
        <Link className="btn-link" href="/products">
          ← Back to products
        </Link>
        <h1 className="page__title">{product.name}</h1>
        <p className="page__subtitle">{product.category}</p>
      </header>

      <section className="product-detail">
        <div className="product-detail__media" aria-hidden="true">
          <img
  src={product.imageUrl}
  alt={product.name}
  className="detailImg"
/>

        </div>

        <div className="product-detail__info">
          <p className="product-detail__price">${product.price.toFixed(2)}</p>
          <p className="product-detail__desc">{product.description}</p>

          <div className="product-detail__actions">
            <button className="btn" type="button">
              Add to cart
            </button>
            <button className="btn btn--secondary" type="button">
              Save
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
