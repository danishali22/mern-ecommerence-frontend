import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "edfd",
    photo: "https://m.media-amazon.com/images/I/619L9jf3-rL._AC_SX679_.jpg",
    name: "Macbook Air Pro",
    price: 450000,
    quantity: 5,
  }
]
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 500;
const discount = 400;
const total = subTotal + tax + shippingCharges - discount;


const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);
  
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    }
  }, [couponCode])
  

  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? 
          cartItems.map((i, index) => (
            <CartItem key={index} cartItem={i} />
          )) : <h1>No Items Added</h1>
        }
      </main>
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

        { cartItems.length > 0 && <Link to={"/shipping"}> Checkout </Link> }
      </aside>
    </div>
  );
};

export default Cart;
