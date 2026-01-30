import Link from "next/link";
import type { Product } from "./products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image" aria-hidden="true">
          <img
  src={product.imageUrl}
  alt={product.name}
  className="productImg"
/>

        </div>

        <div className="product-card__body">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__meta">
            <span className="product-card__category">{product.category}</span>
            <span className="product-card__price">${product.price.toFixed(2)}</span>
          </p>
          <p className="product-card__desc">{product.description}</p>
          <span className="product-card__cta">View details →</span>
        </div>
      </Link>
    </article>
  );
}
