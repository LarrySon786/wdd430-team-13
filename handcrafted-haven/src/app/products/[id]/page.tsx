import Link from "next/link";
import "../product.css";
import { getUiProductById } from "@/database/products";
import ShoppingCart from "@/components/ShoppingCart";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getUiProductById(id);
  


  if (!product) {
    return (
      <main className="page">
        <header className="page__header">
          <h1 className="page__title">Product not found</h1>
          <p className="page__subtitle">We couldn’t find that product.</p>
          <ShoppingCart />
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
        <ShoppingCart />
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
            <AddToCartButton product={product} />
            {/* <button className="btn btn--secondary" type="button">
              Save
            </button> */}
          </div>
        </div>
      </section>
    </main>
  );
}
