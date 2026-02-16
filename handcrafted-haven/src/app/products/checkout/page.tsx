"use client";
import Link from "next/link";
import { useCart } from "@/lib/definitions/cart";
import CartItems from "@/components/CartItems";
import "../cart/cart.css";



export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return <>
        <main className="page">
            <header className="page__header">
                <Link className="btn-link" href="/products/cart">← View Cart</Link>
                <h1 className="page__title">Checkout</h1>
                <p className="page__subtitle">Complete your purchase</p>
            </header>

            {/* Checkout Page Grid Display */}
            <div className="checkout-container">
                <div className="check-out-page">
                    {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                    ) : (
                    <CartItems /> 
                    )}
                </div>

                <div>
                    <form className="check-out-form" action="/products/checkout/thank-you">
                        <fieldset>
                            <legend>Customer Information</legend>
                            <label htmlFor="customerName">*Customer Name
                                <input type="text" id="customerName" name="customerName" required ></input>
                            </label>
                            <label htmlFor="street">*Street Address
                                <input type="text" id="street" name="street" required ></input>
                            </label>
                            <label htmlFor="city">*City
                                <input type="text" id="city" name="city" required ></input>
                            </label>
                            <label htmlFor="state">*State
                                <input type="text" id="state" name="state" required ></input>
                            </label>

                            <label htmlFor="country">*Country
                                <input type="text" id="country" name="country" required ></input>
                            </label>

                            <label htmlFor="zip">*Zip
                                <input type="text" id="zip" name="zip" required ></input>
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Payment Information</legend>
                            <label htmlFor="creditCart">*Card Numbers
                                <input type="text" id="creditCart" name="creditCart" placeholder="1234 5678 9012 3456" maxLength={19} required ></input>
                            </label>

                            <label htmlFor="expirationDate">*Expiration Date
                                <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YY" maxLength={5} required ></input>
                            </label>

                            <label htmlFor="csvCode">*CVV Code
                                <input type="text" id="csvCode" name="csvCode" maxLength={4} placeholder="123" required ></input>
                            </label>
                        </fieldset>

                        <div className="complete-transaction-container">
                            <h3>Total: ${total.toFixed(2)}</h3>
                            <div className="check__out__buttons__container">
                                <button className="checkout__button" type="submit">Complete Checkout</button>
                            </div>
                        </div>
                    </form>
                </div>
      </div>
    </main>
    </>
}

