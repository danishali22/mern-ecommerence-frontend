import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, removeCartItem } from "../redux/reducer/cartItemReducer";

const Cart = () => {
  const { cartItems, subTotal, tax, discount, shippingCharges, total } =
    useSelector(
      (state: { cartItem: CartReducerInitialState }) => state.cartItem
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if(cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  
  const decrementHandler = (cartItem: CartItem) => {
    if(cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])
  

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, index) => (
            <CartItemCard
              key={index}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
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
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              Rs {discount} is off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />{" "}
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}> Checkout </Link>}
      </aside>
    </div>
  );
};

export default Cart;
