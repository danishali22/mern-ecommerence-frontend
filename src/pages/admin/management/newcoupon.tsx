import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNewCouponMutation } from "../../../redux/api/couponApi";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewCoupon = () => {
 const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
 );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const navigate = useNavigate();
  const [newCoupon] = useNewCouponMutation();

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!code || !amount) return;

      const res = await newCoupon({
        id: user?._id || "",
        code,
        amount,
      });
      responseToast(res, navigate, "/admin/coupon");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="coupon-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Coupon</h2>
            <div>
              <label>Code</label>
              <input
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>

            <button disabled={isLoading} type="submit">
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewCoupon;
