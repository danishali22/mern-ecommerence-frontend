import { useState } from "react";
import { VscError } from "react-icons/vsc";

const cartItem = [];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 500;
const discount = 400;
const total = subTotal + tax + shippingCharges - discount;


const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  return (
    <div className="cart">
      <main></main>
      <aside>
        <p>Subtotal: Rs {subTotal}</p>
        <p>Shipping: Rs {shippingCharges}</p>
        <p>Tax: Rs {tax}</p>
        <p>
          Discount: <em>- Rs {discount}</em>
        </p>
        <p>Total: Rs {total}</p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />
        {
          couponCode && (isValidCouponCode ? (
            <span className="green">Rs {discount} is off using the <code>{couponCode}</code></span>
          ) : (
            <span className="red">Invalid Coupon <VscError /> </span>
          ))
        }
      </aside>
    </div>
  );
};

export default Cart;
