"use client";
import Link from "next/link";
import { useCart } from "@/lib/definitions/cart";
import CartItems from "@/components/CartItems";
import "./cart.css";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page">
      <div>
        <header className="page__header">
          <Link className="btn-link" href="/products">
              ← Continue Shopping
          </Link>
          <h1 className="page__title">Your Cart</h1>
          <p className="page__subtitle">Review your items before checkout</p>
        </header>
        <div className="center-cart-cards">
          {cart.length === 0 ? (
          <p>Your cart is empty.</p>
          ) : (
          <>
            <CartItems />
            <div className="check__out__container">
              <h3>Total: ${total.toFixed(2)}</h3>
              <div className="check__out__buttons__container">
                <button onClick={clearCart} className="clear__cart">Clear Cart </button>
                <Link className="checkout__link" href="/products/checkout">Proceed to Checkout</Link>
              </div>
            </div>
          </>
          )}
        </div>
      </div>
    </main>
    
  );
}