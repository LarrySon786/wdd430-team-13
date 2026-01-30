import "./product.css";
import ProductCard from "@/components/ProductCard";
import { products } from "@/components/products";

export default function ProductsPage() {
  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">Products</h1>
        <p className="page__subtitle">
          Browse handcrafted items from our artisans.
        </p>
      </header>

      <section className="products">
        <div className="products__grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
