import { useParams } from "react-router-dom";
import { Skeleton } from "../components/loader"
import { useProductDetailsQuery } from "../redux/api/productApi"
import { useState } from "react";
import { CarouselButtonType, MyntraCarousel, Slider } from "6pp";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const ProductDetails = () => {
  const params = useParams();
  const {data, isLoading, isError, error} = useProductDetailsQuery(params.id!);
  console.log(data);

  const [carouselOpen, setCarouselOpen] = useState(false);


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
              <h1> {data?.product?.name} </h1>
              <p>{data?.product?.category}</p>
              <p>{data?.product?.ratings}</p>
              <p>{data?.product?.price}</p>
              <p>{data?.product?.description}</p>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

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