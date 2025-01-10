/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
    useCouponDetailsQuery,
    useDeleteCouponMutation,
    useUpdateCouponMutation,
} from "../../../redux/api/couponApi";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Couponmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCouponDetailsQuery({
    userId: user?._id!,
    couponId: params.id!,
  });

  const { code, amount } =
    data?.data || {
      code: "",
      amount: 0,
    };

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [codeUpdate, setCodeUpdate] = useState<string>(code);
  const [amountUpdate, setAmountUpdate] = useState<number>(amount);

  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);
    try {

      const res = await updateCoupon({
        userId: user?._id!,
        couponId: params.id!,
        code: codeUpdate,
        amount: amountUpdate,
      });

      responseToast(res, navigate, "/admin/coupon");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };
 
  const deleteHandler = async () => {
    const res = await deleteCoupon({
      userId: user?._id!,
      couponId: params.id!,
    });

    responseToast(res, navigate, "/admin/coupon");
  };

  useEffect(() => {
    if (data) {
      setCodeUpdate(data.data.code);
      setAmountUpdate(data.data.amount);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="coupon-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <article>
              <button className="coupon-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Code</label>
                  <input
                    type="text"
                    placeholder="Code"
                    value={codeUpdate}
                    onChange={(e) => setCodeUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Amount</label>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amountUpdate}
                    onChange={(e) => setAmountUpdate(Number(e.target.value))}
                  />
                </div>

                <button disabled={btnLoading} type="submit">
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Couponmanagement;
