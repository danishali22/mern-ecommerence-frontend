/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/loader";
import { useLineQuery } from "../../../redux/api/dashboard";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getLatestMonths } from "../../../utils/features";




const {last12Months} = getLatestMonths();

const Linecharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError, error } = useLineQuery(user?._id!);

  const products = data?.data.products || [];
  const users = data?.data.users || [];
  const revenue = data?.data.revenue || [];
  const discount = data?.data.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {
          isLoading ? <Skeleton length={20} /> : (
            <>
              <section>
          <LineChart
            data={users}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            labels={last12Months}
            backgroundColor="rgba(53, 162, 255, 0.5)"
          />
          <h2>Active Users</h2>
        </section>

        <section>
          <LineChart
            data={products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            labels={last12Months}
            label="Products"
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={last12Months}
          />
          <h2>Total Revenue </h2>
        </section>

        <section>
          <LineChart
            data={discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={last12Months}
          />
          <h2>Discount Allotted </h2>
        </section>
            </>
          )
        }
      </main>
    </div>
  );
};

export default Linecharts;
