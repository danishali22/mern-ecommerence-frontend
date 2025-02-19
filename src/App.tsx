import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Loader, { Skeleton } from "./components/loader";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userApi";
import { userExists, userNotExists } from "./redux/reducer/userReducer";
import { UserReducerInitialState } from "./types/reducer-types";
import Footer from "./components/footer";

const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const ProductDetails = lazy(() => import("./pages/product-details"));
const Login = lazy(() => import("./pages/login"));
const Shipping = lazy(() => import("./pages/shipping"));
const Checkout = lazy(() => import("./pages/checkout"));
const Orders = lazy(() => import("./pages/orders"));
const OrderDetails = lazy(() => import("./pages/order-details"));
const NotFound = lazy(() => import("./pages/not-found"));

// Admin
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const CouponPage = lazy(() => import("./pages/admin/coupon"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const NewCoupon = lazy(() => import("./pages/admin/management/newcoupon"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const CouponManagement = lazy(
  () => import("./pages/admin/management/couponmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await getUser(user.uid);
        dispatch(userExists(res.data));
      } else {
        dispatch(userNotExists());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/* Header  */}
      <Header user={user} />
      <Suspense fallback={<Skeleton length={10} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Not Logged In User Route  */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* Logged In User Routes  */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/pay" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* Admin  */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/coupon" element={<CouponPage />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route path="/admin/coupon/new" element={<NewCoupon />} />
            <Route path="/admin/coupon/:id" element={<CouponManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
