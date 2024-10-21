/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboard";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getLatestMonths } from "../../../utils/features";
import { Skeleton } from "../../../components/loader";

const {last6Months, last12Months} = getLatestMonths();

const Barcharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError, error } = useBarQuery(user?._id!);

  const orders = data?.data.orders || [];
  const products = data?.data.products || [];
  const users = data?.data.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {
          isLoading ? <Skeleton length={20} /> : (
            <>
              <section>
          <BarChart
            data_1={products}
            data_2={users}
            labels={last6Months}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={orders}
            data_2={[]}
            labels={last12Months}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
          />
          <h2>Orders throughout the year</h2>
        </section>
            </>
          )
        }
      </main>
    </div>
  );
};

export default Barcharts;
