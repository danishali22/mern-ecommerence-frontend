import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

const addToCartHandler = () => {}

const Home = () => {
  return (
    <div className="home">
      <section></section>
      <h1>Latest Products 
        <Link to="/search" className="findmore">More</Link>
      </h1>
      <main>
        <ProductCard 
          productId="edfd"
          photo = "https://m.media-amazon.com/images/I/619L9jf3-rL._AC_SX679_.jpg"
          name = "Macbook Air Pro"
          price = {450000}
          stock = {255}
          handler = {addToCartHandler}
        />
      </main>
    </div>
  )
}

export default Home