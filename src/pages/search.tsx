import { useState } from "react";
import ProductCard from "../components/product-card";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import {
  useCategroriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartItemReducer";


const Search = () => {
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error(`${cartItem.name} is out of stock`);
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} is added to Cart`);
  };

  

  const { data, isError, isLoading, error } = useCategroriesQuery("");

  const err = error as CustomError;
  if (isError) {
    toast.error(err.data.message);
  }

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);

  const {
    data: searchedProducts,
    isLoading: productsLoading,
    isError: productsIsError,
    error: productsError,
  } = useSearchProductsQuery({ search, category, sort, page, price: maxPrice });

  const producterr = productsError as CustomError;
  if(productsIsError){
    toast.error(producterr.data.message);
  }

  const isPrevPage = page > 1;
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const isNextPage = page < searchedProducts?.total_pages!;

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">ALL</option>
            {!isLoading &&
              data?.data.map((i) => (
                <option value={i} key={i}>
                  {i.toLocaleUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-product-list">
          {productsLoading ? (
            <Skeleton length={10} />
          ) : (
            searchedProducts?.data.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                photos={i.photos}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
              />
            ))
          )}
        </div>
        {
          searchedProducts && searchedProducts.total_pages > 1 && (
            <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            {page} of {searchedProducts.total_pages}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((next) => next + 1)}
          >
            Next
          </button>
        </article>
          )
        }
      </main>
    </div>
  );
};

export default Search;
