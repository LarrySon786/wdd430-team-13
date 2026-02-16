import { useCart } from "@/lib/definitions/cart";

export default function CartItems() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return null;
  }

  return (
    <ul className="cart__container">
      {cart.map((item) => (
        <li key={item.id} className="cart__item">
          <div>
            <h3>{ item.quantity } - {item.name} </h3>
            <p>Product Price: ${item.price.toFixed(2)}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button className="remove__cart" onClick={() => removeFromCart(item.id)}>X</button>
          {/* ❌ */}
        </li>
      ))}
    </ul>
  );
}