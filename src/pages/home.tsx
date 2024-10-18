import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { Skeleton } from "../components/loader";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartItemReducer";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error(`${cartItem.name} is out of stock`);
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} is added to Cart`);
  };

  if (isError) toast.error("Cannot Fetch the products");

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading && <Skeleton />}
        {data?.data.map((i) => (
          <ProductCard
            key={i._id}
            productId={i._id}
            photo={i.photo}
            name={i.name}
            price={i.price}
            stock={i.stock}
            handler={addToCartHandler}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
