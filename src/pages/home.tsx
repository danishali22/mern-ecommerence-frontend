import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import Loader from "../components/loader";
import toast from "react-hot-toast";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const addToCartHandler = () => {};

  if(isError) toast.error("Cannot Fetch the products");

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
      {isLoading && <Loader />}
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
