import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type CartItemProps = {
    cartItem: CartItem;
    incrementHandler: (cartItem: CartItem) => void,
    decrementHandler: (cartItem: CartItem) => void,
    removeHandler: (productId: string) => void,
}

const CartItemComponent = ({cartItem, incrementHandler, decrementHandler, removeHandler}: CartItemProps) => {

  const {productId, photo, name, price, quantity} = cartItem;

  return (
    <div className="cart-item">
      <img src={transformImage(photo)} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>Rs {price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}> - </button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}> + </button>
      </div>
      <button onClick={() => removeHandler(productId)}>
        {" "}
        <FaTrash />{" "}
      </button>
    </div>
  );
}

export default CartItemComponent