import { Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/loader"
import { useAllReviewsOfProductQuery, useNewReviewMutation, useProductDetailsQuery } from "../redux/api/productApi"
import { useRef, useState } from "react";
import { CarouselButtonType, MyntraCarousel, Slider, useRating } from "6pp";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import RatingsComponent from "../components/ratings";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartItemReducer";
import { CartItem, Review } from "../types/types";
import { FiEdit } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RootState } from "../redux/store";
import { responseToast } from "../utils/features";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const {user} = useSelector((state: RootState) => state.userReducer);

  const {data, isLoading, isError} = useProductDetailsQuery(params.id!);
  const reviewsResponse = useAllReviewsOfProductQuery(params.id!);

  const [carouselOpen, setCarouselOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewComment, setReviewComment] = useState("");

  const reviewDialogRef = useRef<HTMLDialogElement>(null);

  const [createReview] = useNewReviewMutation();

  if(isError) return <Navigate to="/404" />

  const increment = () => {
    if (data?.product?.stock === quantity)
      return toast.error(`${data?.product?.stock} available only`);

    setQuantity((prev) => prev + 1);
  }

  const decrement = () => {
    setQuantity((prev) => prev - 1);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const showDialog = () => {
    reviewDialogRef.current?.showModal();
  }

  const {
    Ratings: RatingsEditable,
    rating,
    setRating,
  } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value: 0,
    selectable: true,
    styles: {
      fontSize: "1.75rem",
      color: "coral",
      justifyContent: "flex-start",
    },
  });

  const reviewCloseHandler = () =>  {
    reviewDialogRef.current?.close();
    setRating(0);
    setReviewComment("");
  }

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reviewCloseHandler();

    const res = await createReview({
      comment: reviewComment,
      rating,
      userId: user?._id,
      productId: params.id!
    });

    responseToast(res, null, "");
  }

  return (
    <div className="product-details">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main>
            <section>
              <Slider
                showThumbnails
                showNav={false}
                onClick={() => setCarouselOpen(true)}
                images={
                  data?.product?.photos.map((i: { url: string }) => i.url) || []
                }
              />
              {carouselOpen && (
                <MyntraCarousel
                  NextButton={NextButton}
                  PrevButton={PrevButton}
                  setIsOpen={setCarouselOpen}
                  images={
                    data?.product?.photos.map((i: { url: string }) => i.url) ||
                    []
                  }
                />
              )}
            </section>
            <section>
              <code>{data?.product?.category}</code>
              <h1> {data?.product?.name} </h1>
              <em
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <RatingsComponent value={data?.product?.ratings || 0} />(
                {data?.product?.numOfReviews} reviews)
              </em>
              <h3>Rs {data?.product?.price}</h3>
              <article>
                <div>
                  <button onClick={decrement}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increment}>+</button>
                </div>
                <button
                  onClick={() =>
                    addToCartHandler({
                      productId: data?.product?._id!,
                      name: data?.product?.name!,
                      price: data?.product?.price!,
                      stock: data?.product?.stock!,
                      quantity,
                      photo: data?.product?.photos[0].url || "",
                    })
                  }
                >
                  Add To Cart
                </button>
              </article>
              <p>{data?.product?.description}</p>
            </section>
          </main>
        </>
      )}

      <dialog ref={reviewDialogRef} className="review-dialog">
        <button onClick={reviewCloseHandler}>x</button>
        <h2>Write a review</h2>
        <form onSubmit={submitReview}>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Review..."
          ></textarea>
          <RatingsEditable />
          <button type="submit">Submit</button>
        </form>
      </dialog>

      <section>
        <article>
          <h2>Reviews</h2>
          <button onClick={showDialog}>
            <FiEdit />
          </button>
        </article>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            padding: "2rem",
            overflowX: "auto",
          }}
        >
          {reviewsResponse.isLoading ? (
            <Skeleton width="100%" length={5} />
          ) : (
            reviewsResponse?.data?.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

const ReviewCard = ({review}: {review: Review}) =>  
  <div className="review">
    <RatingsComponent value={review.rating} />
    <p>{review.comment}</p>
    <div>
      <img src={review.user.photo} alt="User" />
      <small>{review.user.name}</small>
    </div>
  </div>

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "1px solid #f1f1f1",
        height: "80vh",
      }}
    >
      <section style={{ width: "100%", height: "100%" }}>
        <Skeleton
          width="100%"
          height="100%"
          containerHeight="100%"
          length={1}
        />
      </section>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="40%" length={3} />
        <Skeleton width="50%" length={4} />
        <Skeleton width="100%" length={2} />
        <Skeleton width="100%" length={10} />
      </section>
    </div>
  );
}

const NextButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carousel-btn">
    <FaArrowRightLong />
  </button>
);
const PrevButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carousel-btn">
    <FaArrowLeftLong />
  </button>
);

export default ProductDetails