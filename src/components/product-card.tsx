import { FaExpandAlt, FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

type ProductProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => void;
};

const ProductCard = ({
  productId,
  photos,
  name,
  price,
  stock,
  handler,
}: ProductProps) => {
  return (
    <div className="product-card">
      <img src={`${photos?.[0]?.url}`} alt={name} />
      <p>{name}</p>
      <span>Rs {price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, name, photo: photos[0].url, price, stock, quantity: 1 })
          }
        >
          <FaPlus />
        </button>
        <Link to={`/product/${productId}`}>
          <FaExpandAlt />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
